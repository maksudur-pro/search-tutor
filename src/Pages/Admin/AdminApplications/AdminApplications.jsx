import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/applications");
      setApplications(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await axiosInstance.patch(`/applications/${id}/status`, {
        status: newStatus,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      setError(null);
    } catch {
      setError("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Group applications by jobId
  const groupedApplications = applications.reduce((acc, app) => {
    const job = app.jobDetails || app.job || {};
    const jobId = job.jobId || "unknown";

    if (!acc[jobId]) {
      acc[jobId] = {
        jobTitle: job.title || "Untitled Job",
        applications: [],
      };
    }

    acc[jobId].applications.push(app);
    return acc;
  }, {});

  // Apply search filter
  const filteredGroups = Object.entries(groupedApplications).filter(
    ([jobId, group]) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        jobId.toLowerCase().includes(lowerSearch) ||
        group.jobTitle.toLowerCase().includes(lowerSearch)
      );
    }
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by job title or job ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Applications display */}
      {filteredGroups.length === 0 ? (
        <p>No matching applications found.</p>
      ) : (
        filteredGroups.map(([jobId, group]) => (
          <div
            key={jobId}
            className="mb-8 border border-gray-300 p-4 rounded-md shadow">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              {group.jobTitle}{" "}
              <span className="text-sm text-gray-600">
                ({group.applications.length})
              </span>
            </h2>

            <div className="space-y-4">
              {group.applications.map((app) => {
                const user = app.userDetails || app.user;
                return (
                  <div
                    key={app._id}
                    className="border rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-sm text-gray-600 font-semibold">
                        {user?.name || "Unknown Name"}
                      </p>

                      <p className="text-sm text-gray-600">
                        {user?.email || "No Email"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user?.phone || "No Phone"}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-600">Job ID: {jobId}</p>
                        <p className="text-sm text-gray-500">
                          Applied:{" "}
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="btn my-2"
                        onClick={() => navigate(`/tutor/${user.uid}`)}>
                        see tutor info
                      </button>
                    </div>

                    <div>
                      <label
                        htmlFor={`status-${app._id}`}
                        className="block mb-1 font-medium">
                        Status:
                      </label>
                      <select
                        id={`status-${app._id}`}
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app._id, e.target.value)
                        }
                        disabled={updatingId === app._id}
                        className={`border rounded px-3 py-1 transition-colors duration-300
                          ${
                            app.status === "pending"
                              ? "border-yellow-500 bg-yellow-100 text-yellow-800"
                              : app.status === "reviewed"
                              ? "border-blue-500 bg-blue-100 text-blue-800"
                              : app.status === "selected"
                              ? "border-green-500 bg-green-100 text-green-800"
                              : app.status === "rejected"
                              ? "border-red-500 bg-red-100 text-red-800"
                              : "border-gray-300"
                          }
                        `}
                        aria-label={`Update status for application ${app._id}`}>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminApplications;

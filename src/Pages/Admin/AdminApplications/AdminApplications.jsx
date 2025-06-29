import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // track updating status

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://search-tutor-server.vercel.app/applications"
      );
      setApplications(res.data);
      setError(null);
    } catch (err) {
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
      await axios.patch(
        `https://search-tutor-server.vercel.app/applications/${id}/status`,
        { status: newStatus }
      );
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const job = app.jobDetails || app.job; // adjust according to your data
            const user = app.userDetails || app.user; // adjust accordingly

            return (
              <div
                key={app._id}
                className="border rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg font-semibold">
                    {job?.title || "No Title"}
                  </h3>
                  <p className="text-xs text-gray-600">Job ID: {job.jobId}</p>
                  <p className="text-sm text-gray-600">
                    {user?.email || "No Email"}
                  </p>
                  <p className="text-sm text-gray-600">{user?.name}</p>
                  <p className="text-sm text-gray-500">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
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
      )}
    </div>
  );
};

export default AdminApplications;

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TuitionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTuitionRequests = () => {
    fetch("https://search-tutor-server.vercel.app/tuition-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch requests:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTuitionRequests();
  }, []);

  const handleMarkAsCalled = async (id) => {
    try {
      const response = await fetch(
        `https://search-tutor-server.vercel.app/tuition-requests/${id}/call-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isCalled: true }),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Marked as called successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchTuitionRequests();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update called status.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No tuition requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <div
              key={index}
              className="rounded-2xl border border-indigo-100 p-5 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-between">
                <p>
                  <strong>Class:</strong> {req.class}
                </p>
                <p>
                  {req.isCalled ? (
                    <span className="text-green-600 font-semibold">Called</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Not Called
                    </span>
                  )}
                </p>
              </div>

              <p>
                <strong>Subject:</strong> {req.subjects}
              </p>
              <p>
                <strong>Phone:</strong> {req.phoneNumber}
              </p>
              <p>
                <strong>City:</strong> {req.city}
              </p>
              <p>
                <strong>Location:</strong> {req.location}
              </p>
              <p>
                <strong>Category:</strong> {req.category}
              </p>
              <p>
                <strong>Type:</strong> {req.tuitionType}
              </p>
              <p>
                <strong>Student Gender:</strong> {req.studentGender}
              </p>
              <p>
                <strong>Tutor Gender Preference:</strong>{" "}
                {req.tutorGenderPreference}
              </p>
              <p>
                <strong>Salary:</strong> {req.salary} BDT
              </p>
              <p>
                <strong>Days/Week:</strong> {req.daysPerWeek}
              </p>
              {req.additionalRequirements && (
                <p className="text-gray-600 mt-2">
                  <strong>Requirements:</strong> {req.additionalRequirements}
                </p>
              )}

              {/* Button to mark as called */}
              {!req.isCalled && (
                <button
                  onClick={() => handleMarkAsCalled(req._id)}
                  className="mt-2 rounded bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
                  Mark as Called
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TuitionRequests;

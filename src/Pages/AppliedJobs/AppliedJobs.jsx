import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext); // your auth context providing logged-in user
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://search-tutor-server.vercel.app/applications/user/${user.uid}`
        );
        setJobs(res.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  if (!user) {
    return <p>Please log in to see your applied jobs.</p>;
  }

  if (loading) return <p>Loading applied jobs...</p>;
  if (error)
    return (
      <p className="text-red-500">
        {error.response?.data?.message ||
          error.message ||
          "Something went wrong."}
      </p>
    );

  if (jobs.length === 0) return <p>You have not applied for any jobs yet.</p>;

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] ">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 px-4 py-4 lg:py-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="relative rounded-xl border border-[rgba(6,53,85,0.16)] bg-white p-4 lg:p-6 shadow transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg max-w-xl mb-6">
            <div className="text-[#8c8484]">
              <h3 className="mb-3 text-xl font-semibold text-[#2b2b2c]">
                {job.title}{" "}
                <span className="badge badge-primary text-white">Applied</span>
              </h3>

              <p className="text-[12px] mb-3">
                Applied Date :{" "}
                <span className="font-semibold">{job.date || "N/A"}</span>
              </p>

              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-sm">
                {/* Tuition Type */}
                <div className="flex items-start gap-2">
                  {/* icon omitted for brevity, add as needed */}
                  <div>
                    <p>Tuition Type</p>
                    <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                      {job.type}
                    </p>
                  </div>
                </div>

                {/* Repeat your other fields similarly */}
                <div className="flex items-start gap-2">
                  <div>
                    <p>Student Gender</p>
                    <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                      {job.studentGender}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Category</p>
                    <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                      {job.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Class</p>
                    <p className="text-nowrap font-medium text-[#5c5c5c]">
                      {job.classLevel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Salary</p>
                    <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                      {job.salary} BDT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Preferred Tutor</p>
                    <p className="text-nowrap font-medium text-[#5c5c5c]">
                      {job.tutorGenderPreference}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Tutoring Time</p>
                    <p className="text-nowrap font-medium text-[#5c5c5c]">
                      {job.tutoringTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Tutoring Days</p>
                    <p className="text-nowrap font-medium text-[#5c5c5c]">
                      {job.daysPerWeek}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>Location</p>
                    <p className="font-medium text-[#5c5c5c]">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <p>No. of Students</p>
                    <p className="text-nowrap font-medium text-[#5c5c5c]">
                      {job.studentsNumber || 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div>
                    <p>Subjects</p>
                    <p className="font-medium text-[#5c5c5c]">
                      {Array.isArray(job.subjects)
                        ? job.subjects.join(", ")
                        : job.subjects}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;

import React, { useEffect, useState } from "react";
import TutorJobCard from "../../Component/TutorJobCard/TutorJobCard";
import axiosInstance from "../../utils/axiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Select from "react-dropdown-select";
import cityOptions from "../../assets/cityOptions.json";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    axiosInstance
      .get("/jobs")
      .then((res) => {
        if (res.data.success) {
          setJobs(res.data.data);
        } else {
          setError("Failed to load jobs");
        }
      })
      .catch(() => setError("Error fetching jobs"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity]);

  const filteredJobs =
    selectedCity.length > 0
      ? jobs.filter((job) => job.city === selectedCity[0].value)
      : jobs;

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center p-4">No jobs found.</p>;
  }

  return (
    <div className="bg-[#F2F5FC]">
      <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem]">
        <div
          className="px-4 lg:px-8 py-4"
          style={{ boxShadow: "0 8px 6px -6px #0675c140" }}>
          <div className="flex items-center justify-between py-1 md:py-0">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-indigo-500"
                height="1em"
                width="1em"
                xmlns="https://www.w3.org/2000/svg">
                <path d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path>
              </svg>
              <p className="text-[#888]">
                {" "}
                <span className="font-semibold">
                  {filteredJobs.length}
                </span>{" "}
                jobs found
              </p>
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Filter by City:
              </label>
              <Select
                options={cityOptions}
                placeholder="Select city"
                values={selectedCity}
                onChange={(values) => setSelectedCity(values)}
                clearable
              />
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="px-4 py-4 lg:py-8">
          {currentJobs.length === 0 ? (
            <div>
              <p className="text-center text-gray-500 text-lg">
                No jobs found for selected City.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
              {currentJobs.map((job, index) => (
                <TutorJobCard key={index} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap pb-8">
            {currentPage > 1 && (
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white transition">
                <ChevronLeft size={20} />
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={`page-${page}`}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
                } transition`}>
                {page}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white transition">
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;

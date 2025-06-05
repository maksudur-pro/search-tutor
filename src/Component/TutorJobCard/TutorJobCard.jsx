// components/TutorJobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const TutorJobCard = ({ job }) => {
  return (
    <>
      <div className="relative  rounded-xl border border-[rgba(6,53,85,0.16)] bg-white p-7 pb-2 shadow transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg  max-w-xl">
        <div className="text-[#8c8484]">
          <Link>
            <h3
              className="mb-3 
             cursor-pointer text-xl font-semibold text-[#2b2b2c] transition-all duration-300 hover:text-primary ">
              {job.title}
            </h3>
          </Link>

          <div className="mb-6 flex items-center gap-8 ">
            <p className="text-[12px] lg:text-sm">
              Job ID : <span className="font-semibold">{job.id}</span>
            </p>

            <p className="text-[12px] lg:text-sm">
              Posted Date : <span className="font-semibold">{job.date}</span>
            </p>
          </div>

          <div className="mb-6 flex items-center gap-16 text-sm">
            {/* Tuition Type */}
            <div className="flex items-start gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="text-[#0675c1]"
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path>
              </svg>
              <div>
                <p>Tuition Type</p>
                <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                  {job.type}
                </p>
              </div>
            </div>

            {/* Salary */}
            <div className="flex gap-2 align-baseline">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="text-[#0675c1]"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M156.8 126.8c37.6 60.6 64.2 113.1 84.3 162.5-8.3 33.8-18.8 66.5-31.3 98.3-13.2-52.3-26.5-101.3-56-148.5 6.5-36.4 2.3-73.6 3-112.3zM109.3 200H16.1c-6.5 0-10.5 7.5-6.5 12.7C51.8 267 81.3 330.5 101.3 400h103.5c-16.2-69.7-38.7-133.7-82.5-193.5-3-4-8-6.5-13-6.5zm47.8-88c68.5 108 130 234.5 138.2 368H409c-12-138-68.4-265-143.2-368H157.1zm251.8-68.5c-1.8-6.8-8.2-11.5-15.2-11.5h-88.3c-5.3 0-9 5-7.8 10.3 13.2 46.5 22.3 95.5 26.5 146 48.2 86.2 79.7 178.3 90.6 270.8 15.8-60.5 25.3-133.5 25.3-203 0-73.6-12.1-145.1-31.1-212.6z"></path>
              </svg>
              <div>
                <p>Salary</p>
                <p className="whitespace-nowrap font-medium text-[#5c5c5c]">
                  {job.salary} BDT
                </p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-6 flex flex-wrap items-baseline gap-6">
            <div className="flex items-baseline gap-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="mt-1 text-[#0675c1]"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path>
              </svg>
              <div>
                <p>Subjects</p>
                <p className="font-medium text-[#5c5c5c]">
                  {job.subjects.join(", ")}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="min-w-1/2 flex items-baseline gap-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="mt-1 text-[#0675c1]"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64z"></path>
              </svg>
              <div>
                <p>Location</p>
                <p className="font-medium text-[#5c5c5c]">{job.location}</p>
              </div>
            </div>
          </div>

          {/* Tutor Preferred */}
          <div className="relative z-10 flex items-start gap-1 pe-4 xl2:pe-0">
            <p className="flex items-center text-sm font-semibold text-[#0675C1]">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 384 512"
                className="me-2 mt-0.5 h-4 w-4 text-[#0675C1]"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M192 256c70.7 0 128-57.3 128-128S262.7 0 192 0 64 57.3 64 128s57.3 128 128 128zm-96 32h17.8c22.2 10.2 47 16 73.7 16s51.5-5.8 73.7-16H288c44.2 0 80 35.8 80 80v48c0 26.5-21.5 48-48 48H56c-26.5 0-48-21.5-48-48v-48c0-44.2 35.8-80 80-80z"></path>
              </svg>
              {job.gender}
            </p>
            <span className="text-sm font-medium text-[#5c5c5c]">
              tutor preferred
            </span>
          </div>
          <div className="py-2">
            <Link>
              <button className="text-sm text-[#0675C1] border border-[#0675C1] rounded px-4 py-1 hover:bg-blue-50 transition">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="relative rounded-xl border bg-white p-7 pb-2 shadow hover:-translate-y-1 hover:shadow-lg transition duration-300">
      <div className="text-[#8c8484]">
        <Link>
          <h3 className="mb-3 text-xl font-semibold text-[#2b2b2c] hover:text-indigo-500 transition h-14 overflow-hidden">
            {job.title}
          </h3>
        </Link>

        <div className="mb-4 flex items-center gap-6 text-sm">
          <p>
            Job ID: <span className="font-semibold">{job.id}</span>
          </p>
          <div className="h-4 w-[2px] bg-[#8c8484]"></div>
          <p>
            Posted: <span className="font-semibold">{job.date}</span>
          </p>
        </div>

        <div className="mb-4 flex gap-8 text-sm">
          <div>
            <p className="text-gray-500">Tuition Type</p>
            <p className="font-medium text-[#5c5c5c]">{job.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Salary</p>
            <p className="font-medium text-[#5c5c5c]">{job.salary} BDT</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Subjects</p>
          <p className="font-medium text-[#5c5c5c]">
            {job.subjects.join(", ")}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium text-[#5c5c5c]">{job.location}</p>
        </div>

        <p className="text-sm font-semibold text-pink-600">
          {job.gender} tutor preferred
        </p>

        <div className="mt-4">
          <Link>
            <button className="text-sm text-blue-600 border border-blue-600 rounded px-4 py-1 hover:bg-blue-50 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default TutorJobCard;

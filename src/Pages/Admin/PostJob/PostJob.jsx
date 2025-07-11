import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-dropdown-select";
import classOptions from "../../../assets/classOptions.json";
import daysPerWeekOptions from "../../../assets/daysPerWeekOptions.json";
import tuitionTypeOptions from "../../../assets/tuitionTypeOptions.json";
import categoryOptions from "../../../assets/categoryOptions.json";
import cityOptions from "../../../assets/cityOptions.json";
import locationOptionsByCity from "../../../assets/locationOptionsByCity.json";

import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";

const PostJob = () => {
  const { loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);

  const handleCityChange = (val) => {
    setCity(val);
    setLocation([]);
    setValue("city", val[0]?.value || "");
    setValue("location", ""); // clear location value when city changes
  };

  const handleLocationChange = (val) => {
    setLocation(val);
    setValue("location", val[0]?.value || "");
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/job-requests", data);
      const result = res.data;
      console.log(result);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Job posted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Failed to post job",
        });
      }
    } catch (error) {
      console.error("Error posting job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error posting job",
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
            {/* Tuition Type */}
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Tuition Type <span className="text-red-500">*</span>
                </label>
                <Select
                  options={tuitionTypeOptions}
                  placeholder="Select Tuition Type"
                  onChange={(val) => setValue("tuitionType", val[0]?.value)}
                />
                <input
                  type="hidden"
                  {...register("tuitionType", { required: true })}
                />
                {errors.tuitionType && (
                  <p className="text-red-500 text-xs">
                    Tuition Type is required
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="md:w-1/2">
                <label className="text-sm">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  options={categoryOptions}
                  placeholder="Select Category"
                  onChange={(val) => setValue("category", val[0]?.value)}
                />
                <input
                  type="hidden"
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">Category is required</p>
                )}
              </div>
            </div>

            {/* Phone Number and Student Gender */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Job Title"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  {...register("jobTitle", { required: true })}
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-xs">Job Title is required</p>
                )}
              </div>
              <div className="md:w-1/2">
                <p className="text-sm">
                  Student Gender <span className="text-red-500">*</span>
                </p>
                <div className="mt-3 flex gap-7">
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      value="male"
                      {...register("studentGender", { required: true })}
                    />
                    Male
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      value="female"
                      {...register("studentGender")}
                    />
                    Female
                  </label>
                </div>
                {errors.studentGender && (
                  <p className="text-red-500 text-xs">
                    Student Gender is required
                  </p>
                )}
              </div>
            </div>

            {/* City and Location */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  City <span className="text-red-500">*</span>
                </label>
                <Select
                  options={cityOptions}
                  values={city}
                  onChange={handleCityChange}
                  placeholder="Select City"
                  dropdownPosition="auto"
                />
                <input
                  type="hidden"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">City is required</p>
                )}
              </div>

              <div className="md:w-1/2">
                <label className="text-sm">
                  Location <span className="text-red-500">*</span>
                </label>
                <Select
                  options={
                    city.length > 0
                      ? locationOptionsByCity[city[0].value] || []
                      : []
                  }
                  values={location}
                  onChange={handleLocationChange}
                  placeholder={
                    city.length > 0
                      ? "Select Location"
                      : "Please select City first"
                  }
                  dropdownPosition="auto"
                  disabled={city.length === 0}
                />
                <input
                  type="hidden"
                  {...register("location", { required: true })}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs">Location is required</p>
                )}
              </div>
            </div>

            {/* Class and Subjects */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2 relative">
                <label className="text-sm">
                  Class <span className="text-red-500">*</span>
                </label>
                <Select
                  options={classOptions}
                  placeholder="Select Class"
                  onChange={(val) => setValue("class", val[0]?.value)}
                />
                <input
                  type="hidden"
                  {...register("class", { required: true })}
                />
                {errors.class && (
                  <p className="text-red-500 text-xs">Class is required</p>
                )}
              </div>

              <div className="md:w-1/2">
                <label className="text-sm">
                  Subjects <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="subjects"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  {...register("subjects", { required: true })}
                />

                {errors.subjects && (
                  <p className="text-red-500 text-xs">Subjects are required</p>
                )}
              </div>
            </div>

            {/* Days/Week and Tutor Gender Preference */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2 relative">
                <label className="text-sm">
                  Days/Week <span className="text-red-500">*</span>
                </label>
                <Select
                  options={daysPerWeekOptions}
                  placeholder="Select Days/Week"
                  onChange={(val) => setValue("daysPerWeek", val[0]?.value)}
                />
                <input
                  type="hidden"
                  {...register("daysPerWeek", { required: true })}
                />
                {errors.daysPerWeek && (
                  <p className="text-red-500 text-xs">Days/Week is required</p>
                )}
              </div>

              <div className="md:w-1/2">
                <p className="text-sm">
                  Tutor Gender Preference{" "}
                  <span className="text-red-500">*</span>
                </p>
                <div className="mt-3 flex gap-7">
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      value="male"
                      {...register("tutorGenderPreference", { required: true })}
                    />
                    Male
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      value="female"
                      {...register("tutorGenderPreference")}
                    />
                    Female
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      value="any"
                      {...register("tutorGenderPreference")}
                    />
                    Any
                  </label>
                </div>
                {errors.tutorGenderPreference && (
                  <p className="text-red-500 text-xs">
                    Tutor Gender Preference is required
                  </p>
                )}
              </div>
            </div>

            {/* Salary and Additional Requirements */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Salary (BDT) <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="salary"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  {...register("salary", { required: true })}
                />
                {errors.salary && (
                  <p className="text-red-500 text-xs">Salary is required</p>
                )}
              </div>
              <div className="md:w-1/2">
                <label className="text-sm">
                  No. of Students <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="No. of Students"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  {...register("studentsNumber", { required: true })}
                />
                {errors.studentsNumber && (
                  <p className="text-red-500 text-xs">
                    Students Number is required
                  </p>
                )}
              </div>
            </div>
            {/* Tutoring Time */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Tutoring Time <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Tutoring Time"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  {...register("tutoringTime", { required: true })}
                />
                {errors.tutoringTime && (
                  <p className="text-red-500 text-xs">
                    Tutoring Time is required
                  </p>
                )}
              </div>
              <div className="md:w-1/2"></div>
            </div>

            {/* Submit button */}
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <button
                type="submit"
                className="group mt-8 flex w-fit items-center justify-between gap-5 whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-indigo-500 hover:bg-white hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Submit
                <svg
                  className="transition-all duration-500 ease-out group-hover:translate-x-1"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="https://www.w3.org/2000/svg">
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostJob;

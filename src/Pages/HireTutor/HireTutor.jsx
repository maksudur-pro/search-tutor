import React, { useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import Select from "react-dropdown-select";
const HireTutor = () => {
  const { loading } = useContext(AuthContext);

  const options = [
    {
      value: 1,
      label: "Leanne Graham",
    },
    {
      value: 2,
      label: "Ervin Howell",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
          <form className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Tuition Type <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>
              <div className="md:w-1/2">
                <label className="text-sm">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="01701478568"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  name="phoneNumber"
                  required
                />
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
                      name="gender"
                      value="male"
                      required
                    />
                    Male
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  City <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>
              <div className="md:w-1/2">
                <label className="text-sm">
                  Location <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2 relative">
                <label className="text-sm">
                  Class <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>

              <div className="md:w-1/2">
                <label className="text-sm">
                  Subjects <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2 relative">
                <label className="text-sm">
                  Days/Week <span className="text-red-500">*</span>
                </label>
                <Select options={options} placeholder="Select Tuition Type" />
              </div>

              <div className="md:w-1/2">
                <p className="text-sm">
                  Tutor Gender Preference<span className="text-red-500">*</span>
                </p>
                <div className="mt-3 flex gap-7">
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      name="gender"
                      value="male"
                      required
                    />
                    Male
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    Female
                  </label>
                  <label className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="radio"
                      name="gender"
                      value="any"
                    />
                    Any
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-sm">
                  Salary (BDT) <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="salary"
                  className="w-full border px-2 border-black/30 py-2  focus:outline-none"
                  type="text"
                  name="salary"
                  required
                />
              </div>

              <div className="md:w-1/2">
                <p className="text-sm mb-2">
                  More about your requirements
                  <span className="text-red-500">*</span>
                </p>
                <textarea
                  placeholder="other requirements (if any)"
                  className="textarea textarea-xs"></textarea>
              </div>
            </div>

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
                  xmlns="http://www.w3.org/2000/svg">
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

export default HireTutor;

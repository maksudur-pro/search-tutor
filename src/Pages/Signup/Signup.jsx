const Signup = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     gender: "",
  //     phoneNumber: "",
  //     email: "",
  //     city: "",
  //     location: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      <form
        onSubmit={handleSubmit}
        className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <label className="text-lg">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Rafi Chowdhury"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg">
              Gender <span className="text-red-500">*</span>
            </p>
            <div className="mt-3 flex gap-7">
              <label className="cursor-pointer">
                <input
                  className="mr-2"
                  type="radio"
                  name="gender"
                  value="male"
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
            <label className="text-lg">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="01701478568"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="text"
              name="phoneNumber"
            />
          </div>
          <div className="md:w-1/2">
            <label className="text-lg">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="name@example.com"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="email"
              name="email"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <label className="text-lg">
              City <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Dhaka"
              name="city"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="text"
            />
          </div>
          <div className="md:w-1/2">
            <label className="text-lg">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Mirpur"
              name="location"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="text"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <label className="text-lg">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="********"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="password"
              name="password"
            />
          </div>
          <div className="md:w-1/2">
            <label className="text-lg">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="********"
              className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
              type="password"
              name="confirmPassword"
            />
          </div>
        </div>

        {/* <div className="mt-8">
          <label className="flex items-center">
            <input
              className="mr-2 focus:outline-none"
              type="checkbox"
              name="terms"
              checked={formData.terms}
              
            />
            <span className="text-[#4d4d4d]">
              I agree to the{" "}
              <a className="text-primary underline" href="/terms-condition">
                Terms of Use and Privacy Policy
              </a>
            </span>
          </label>
        </div> */}

        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <button
            type="submit"
            className="group mt-8 flex w-fit items-center justify-between gap-5 whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-indigo-500 hover:bg-white hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Sign Up
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
          <p className="mt-2 text-xs text-[#2b2b2c] md:text-sm">
            Already have an account?{" "}
            <a
              className="ms-1 text-sm font-semibold text-indigo-500"
              href="/signin">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

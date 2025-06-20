import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, loading, setLoading, setUserData } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const gender = form.gender.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const city = form.city.value;
    const location = form.location.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const accountType = form.accountType.value;
    const imageFile = form.image.files[0];

    // Basic validations
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    if (!imageFile) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please select a profile image.",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload image to cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "user_profile_img");

      const imageRes = await fetch(
        "https://api.cloudinary.com/v1_1/dvrn8ytwm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await imageRes.json();
      if (!imageData.secure_url) throw new Error("Image upload failed");

      const imageUrl = imageData.secure_url;

      // Create Firebase User
      const result = await createUser(email, password);
      const uid = result.user.uid;

      // Prepare userData
      const userData = {
        uid,
        name,
        gender,
        phone: phoneNumber,
        email,
        city,
        location,
        accountType,
        image: imageUrl,
      };

      // Save to MongoDB
      const dbRes = await fetch(
        "https://search-tutor-server.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!dbRes.ok) throw new Error("Failed to save user to database");

      const dbData = await dbRes.json();
      console.log("User saved to MongoDB:", dbData);

      setUserData(dbData);
      Swal.fire({
        icon: "success",
        title: "Sign up successful!",
        text: "Welcome aboard!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email in use",
          text: "This email is already registered. Please try logging in.",
        });
        return;
      }

      Swal.fire({ icon: "error", title: "Error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // const handleRegister = (event) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const name = form.name.value;
  //   const gender = form.gender.value;
  //   const phoneNumber = form.phoneNumber.value;
  //   const email = form.email.value;
  //   const city = form.city.value;
  //   const location = form.location.value;
  //   const password = form.password.value;
  //   const confirmPassword = form.confirmPassword.value;
  //   const accountType = form.accountType.value;

  //   if (password !== confirmPassword) {
  //     setLoading(false);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Passwords do not match!",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   createUser(email, password)
  //     .then((result) => {
  //       const loggedUser = result.user;
  //       const uid = loggedUser.uid;

  //       const userData = {
  //         uid,
  //         name,
  //         gender,
  //         phone: phoneNumber,
  //         email,
  //         city,
  //         location,
  //         accountType,
  //       };

  //       setUserData(userData);
  //       navigate("/");
  //       fetch("https://search-tutor-server.vercel.app/users", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(userData),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log("User saved to MongoDB:", data);
  //           setUserData(userData);
  //           setLoading(false);
  //           Swal.fire({
  //             icon: "success",
  //             title: "Sign up successful!",
  //             text: "Welcome aboard!",
  //             timer: 2000,
  //             showConfirmButton: false,
  //           });
  //           navigate("/");
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           Swal.fire({
  //             icon: "error",
  //             title: "Database Error",
  //             text: error.message || "Failed to save user data.",
  //           });
  //         });
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Signup Failed",
  //         text: error.message,
  //       });
  //     });
  // };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
          <form
            onSubmit={handleRegister}
            className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
            <div className="my-8 flex flex-col-reverse items-center gap-6 text-black md:flex-row md:gap-4">
              {/* Guardian Option */}
              <div className="w-full md:w-1/2">
                <label htmlFor="guardian">
                  <input
                    required
                    id="guardian"
                    className="peer sr-only"
                    type="radio"
                    value="guardian"
                    name="accountType"
                  />
                  <div className="relative flex cursor-pointer items-center gap-4 rounded-full border-2 p-3 transition-all duration-500 ease-out md:gap-3 md:p-2 border-white bg-white peer-checked:border-indigo-500 peer-checked:shadow-lg">
                    <img
                      alt="guardian avatar"
                      className="size-[100px] rounded-full md:size-[67px]"
                      src="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Guardian-01.png"
                    />
                    <div>
                      <p className="text-xl font-bold md:text-base">
                        Guardian or Student
                      </p>
                      <p className="text-lg leading-6 md:text-xs">
                        Select, If you're looking for a tutor
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute -top-2 right-4 hidden h-[24px] w-[24px] rounded-full bg-indigo-500 text-white peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points="6 13 10.2 16.6 18 7"
                      />
                    </svg>
                  </div>
                </label>
              </div>

              {/* Tutor Option */}
              <div className="w-full md:w-1/2">
                <label htmlFor="tutor">
                  <input
                    id="tutor"
                    className="peer sr-only"
                    type="radio"
                    value="tutor"
                    name="accountType"
                  />
                  <div className="relative flex cursor-pointer items-center gap-4 rounded-full border-2 p-3 transition-all duration-500 ease-out md:gap-3 md:p-2 border-white bg-white peer-checked:border-indigo-500 peer-checked:shadow-lg">
                    <img
                      alt="tutor avatar"
                      className="size-[100px] rounded-full md:size-[67px]"
                      src="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Tutor-01.png"
                    />
                    <div>
                      <p className="text-xl font-bold md:text-base">Tutor</p>
                      <p className="text-lg leading-6 md:text-xs">
                        Select, If you're looking for tuition job
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute -top-2 right-4 hidden h-[24px] w-[24px] rounded-full bg-indigo-500 text-white peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points="6 13 10.2 16.6 18 7"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">upload profile</legend>
              <input
                type="file"
                name="image"
                className="file-input"
                accept="image/*"
                required
              />
              <label className="label">Max size 2MB</label>
            </fieldset>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-lg">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
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
                <label className="text-lg">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="01701478568"
                  className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                  type="text"
                  name="phoneNumber"
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2 relative">
                <label className="text-lg">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="********"
                  className="w-full border-b border-black/50 py-2 pr-10 focus:border-b-2 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
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
                  required
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
      )}
    </>
  );
};

export default Signup;

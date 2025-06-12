import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
  const { signIn, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    // console.log(email, password);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full p-6 m-auto bg-white rounded-2xl border border-[rgba(6,53,85,0.16)] lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-indigo-500 uppercase">
              Sign In to Continue
            </h1>
            <form onSubmit={handleLogin} className="mt-6">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="email"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-500 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2 relative">
                <label className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="password"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-500 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <a href="#" className="text-xs text-indigo-500 hover:underline">
                Forget Password?
              </a>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-intext-indigo-500 focus:outline-none focus:bg-intext-indigo-500">
                  Login
                </button>
              </div>
            </form>
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-white">Or</div>
            </div>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                href="#"
                className="font-medium text-indigo-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;

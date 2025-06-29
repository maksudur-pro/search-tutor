import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import {
  UserCheck,
  User,
  Mars,
  Phone,
  Home,
  MapPin,
  HashIcon,
  Mail,
} from "lucide-react";

const Profile = () => {
  const { userInfo, loading } = useContext(AuthContext);
  console.log(userInfo);
  if (loading || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      <div className="flex flex-col md:flex-row lg:flex-row ">
        <div className="w-full md:w-[40%] lg:w-[40%]">
          <div className="">
            <div className="bg-white p-6 rounded-sm shadow-sm text-center space-y-3 mb-4">
              <div className="image overflow-hidden">
                <img
                  className="h-28 w-28 mx-auto rounded-full object-cover border-2 border-green-500 shadow-sm"
                  src={userInfo.image}
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="flex justify-center items-center text-gray-900 font-bold text-xl gap-2">
                  <User size={18} />
                  {userInfo.name || "No data found"}
                </h1>
                <h3 className="flex justify-center items-center text-gray-600 font-medium text-base gap-2">
                  <Mail size={16} />
                  {userInfo.email || "No data found"}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] lg:w-[60%]">
          <div className=" mx-2">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-indigo-500">
                  <User className="h-5 w-5" />
                </span>
                <span className="tracking-wide">About</span>
              </div>

              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <HashIcon size={16} />
                      Tutor Id
                    </div>
                    <div className="px-4 py-2">1254</div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <UserCheck size={16} />
                      Account Type
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.accountType || "No data found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <User size={16} />
                      Full Name
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.name || "No data found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <Mars size={16} />
                      Gender
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.gender || "No data found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <Phone size={16} />
                      Contact No.
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.phone || "No data found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <Home size={16} />
                      City
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.city || "No data found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <div className="px-4 py-2 font-semibold flex items-center gap-1">
                      <MapPin size={16} />
                      District
                    </div>
                    <div className="px-4 py-2">
                      {userInfo.location || "No data found"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <form className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-lg">Name</label>
                <input
                  readOnly
                  value={userInfo.name || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  name="name"
                />
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">Account Type</label>
                <input
                  readOnly
                  value={userInfo.accountType || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  name="accountType"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <p className="text-lg">Gender</p>
                <div className="mt-3 flex gap-7">
                  <input
                    readOnly
                    value={userInfo.gender || ""}
                    className="w-full border-b border-black/50 py-2 focus:outline-none"
                    type="text"
                    name="gender"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">Phone Number</label>
                <input
                  value={userInfo.phone || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  name="phoneNumber"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-lg">Email</label>
                <input
                  value={userInfo.email || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="email"
                  name="email"
                  readOnly
                />
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">City</label>
                <input
                  value={userInfo.city || ""}
                  name="city"
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-lg">Location</label>
                <input
                  value={userInfo.location || ""}
                  name="location"
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  readOnly
                />
              </div>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
          <form className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/2">
                <label className="text-lg">Name</label>
                <input
                  readOnly
                  value={user.name || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  name="name"
                />
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">Account Type</label>
                <input
                  readOnly
                  value={user.accountType || ""}
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
                    value={user.gender || ""}
                    className="w-full border-b border-black/50 py-2 focus:outline-none"
                    type="text"
                    name="gender"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">Phone Number</label>
                <input
                  value={user.phone || ""}
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
                  value={user.email || ""}
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="email"
                  name="email"
                  readOnly
                />
              </div>
              <div className="md:w-1/2">
                <label className="text-lg">City</label>
                <input
                  value={user.city || ""}
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
                  value={user.location || ""}
                  name="location"
                  className="w-full border-b border-black/50 py-2 focus:outline-none"
                  type="text"
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;

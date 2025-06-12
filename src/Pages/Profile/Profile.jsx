import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      fetch(`http://localhost:5000/users/${currentUser.uid}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <>
      <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
        <form className="mt-0 w-full gap-4 rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white px-5 py-8 text-black md:mt-5 md:px-7">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2">
              <label className="text-lg">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                readOnly
                placeholder={user.name}
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
                <input
                  readOnly
                  placeholder={user.gender}
                  className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                  type="text"
                  name="name"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2">
              <label className="text-lg">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={user.phone}
                className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                type="text"
                name="phoneNumber"
                readOnly
              />
            </div>
            <div className="md:w-1/2">
              <label className="text-lg">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={user.email}
                className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                type="email"
                name="email"
                readOnly
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2">
              <label className="text-lg">
                City <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={user.city}
                name="city"
                className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                type="text"
                readOnly
              />
            </div>
            <div className="md:w-1/2">
              <label className="text-lg">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={user.location}
                name="location"
                className="w-full border-b border-black/50 py-2 focus:border-b-2 focus:outline-none"
                type="text"
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

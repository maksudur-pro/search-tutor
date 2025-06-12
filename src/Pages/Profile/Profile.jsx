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
    <div className="max-w-md mx-auto p-4 shadow-lg mt-10 rounded-xl border">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile Section</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>City:</strong> {user.city}
      </p>
      <p>
        <strong>Location:</strong> {user.location}
      </p>
    </div>
  );
};

export default Profile;

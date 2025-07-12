import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";

const ManageUsers = () => {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = (uid, newRole) => {
    axiosInstance
      .patch(`/users/${uid}/accountType`, { accountType: newRole })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${newRole}`,
          timer: 2000,
          showConfirmButton: false,
        });

        fetchUsers(); // Refresh list after update
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to update role",
        })
      );
  };

  // const handleDeleteUser = (uid) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This action cannot be undone.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete user!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`https://search-tutor-server.vercel.app/users/${uid}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => {
  //           if (!res.ok) throw new Error("Failed to delete user");
  //           return res.json();
  //         })
  //         .then(() => {
  //           Swal.fire("Deleted!", "User has been deleted.", "success");
  //           fetchUsers(); // Refresh the user list
  //         })
  //         .catch(() => {
  //           Swal.fire(
  //             "Error!",
  //             "Failed to delete user. Please try again.",
  //             "error"
  //           );
  //         });
  //     }
  //   });
  // };

  if (loading || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (userInfo.accountType !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10">
        Access denied. Only admins can manage users.
      </p>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 gap-6">
        {users.map((user) => (
          <div key={user.uid} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={
                  user?.image ||
                  "	https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                }
                alt="user-image"
                className="h-80 w-full object-cover object-top"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.name}
                <div className="badge badge-primary">{user.accountType}</div>
              </h2>
              <p>{user.email}</p>
              <div className="card-actions justify-start">
                {user.uid !== userInfo.uid && (
                  <>
                    <button
                      onClick={() => updateRole(user.uid, "admin")}
                      disabled={user.accountType === "admin"}
                      className={`badge badge-outline bg-indigo-500 text-white cursor-pointer mr-2 px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                        user.accountType === "admin"
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-indigo-600"
                      }`}>
                      Make Admin
                    </button>
                    <button
                      onClick={() => updateRole(user.uid, "tutor")}
                      disabled={user.accountType === "tutor"}
                      className={`badge badge-outline bg-indigo-500 text-white cursor-pointer mr-2 px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                        user.accountType === "tutor"
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-indigo-600"
                      }`}>
                      Make Tutor
                    </button>
                    <button
                      onClick={() => updateRole(user.uid, "guardian")}
                      disabled={user.accountType === "guardian"}
                      className={`badge badge-outline bg-indigo-500 text-white cursor-pointer mr-2 px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                        user.accountType === "guardian"
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-indigo-600"
                      }`}>
                      Make Guardian
                    </button>

                    {/* Delete Button
                    <button
                      onClick={() => handleDeleteUser(user.uid)}
                      className="badge badge-outline border border-red-500 text-red-500 cursor-pointer px-3 py-1 rounded-md font-medium flex items-center gap-1 hover:bg-red-100 transition-colors duration-200">
                      <Trash2 size={16} />
                      Delete
                    </button> */}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;

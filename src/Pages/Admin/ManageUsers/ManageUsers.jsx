import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import {
  BadgeCheck,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;
  const navigate = useNavigate();

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

  // const makeVerified = (uid) => {
  //   axiosInstance
  //     .patch(`/users/${uid}/verify`, { isVerified: true })
  //     .then(() => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "User Verified",
  //         text: `User has been marked as verified.`,
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //       fetchUsers();
  //     })
  //     .catch(() =>
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed",
  //         text: "Could not verify user.",
  //       })
  //     );
  // };

  const handleVerifyToggle = async (uid, isVerified) => {
    try {
      const { data } = await axiosInstance.patch(`/users/${uid}/verify`, {
        isVerified,
      });
      Swal.fire("Success", data.message, "success");
      fetchUsers();
    } catch (error) {
      console.error("Verification toggle failed:", error);
      Swal.fire(
        "Error",
        "Something went wrong while updating verification",
        "error"
      );
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
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

  // Filter + search users
  const filteredUsers = users.filter(
    (user) =>
      (filterRole === "all" || user.accountType === filterRole) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const userCounts = {
    all: users.length,
    admin: users.filter((u) => u.accountType === "admin").length,
    tutor: users.filter((u) => u.accountType === "tutor").length,
    guardian: users.filter((u) => u.accountType === "guardian").length,
  };

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10">
      {/* Filter Buttons & Counts */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["all", "admin", "tutor", "guardian"].map((role) => (
          <button
            key={role}
            onClick={() => {
              setFilterRole(role);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-md font-medium border ${
              filterRole === role
                ? "bg-indigo-500 text-white"
                : "bg-white text-indigo-500 border-indigo-500"
            } hover:bg-indigo-600 hover:text-white transition-colors duration-200`}>
            {role === "all"
              ? `All (${userCounts.all})`
              : `${role.charAt(0).toUpperCase() + role.slice(1)}s (${
                  userCounts[role]
                })`}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 gap-6">
        {paginatedUsers.map((user) => (
          <div key={user.uid} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={
                  user?.image ||
                  "https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                }
                alt="user-image"
                className="h-80 w-full object-cover object-top"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.name}
                <div className="badge badge-primary text-white">
                  {user.accountType}
                </div>
                {user.isVerified && (
                  <div className=" ">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                      alt="verified"
                      className="w-7 h-7 object-cover"
                    />
                  </div>
                )}
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

                    <button
                      onClick={() => navigate(`/tutor/${user.uid}`)}
                      className="badge badge-outline bg-green-500 text-white px-3 py-1 rounded-md font-medium transition-colors duration-200 hover:bg-green-600">
                      Show Tutor Profile
                    </button>
                    {user?.accountType === "tutor" &&
                      (user?.isVerified ? (
                        <button
                          onClick={() => handleVerifyToggle(user.uid, false)}
                          className="badge badge-outline bg-red-500 text-white px-3 py-1 rounded-md font-medium transition-colors duration-200 hover:bg-red-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Unverify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerifyToggle(user.uid, true)}
                          className="badge badge-outline bg-purple-500 text-white px-3 py-1 rounded-md font-medium transition-colors duration-200 hover:bg-purple-600 flex items-center gap-1">
                          <BadgeCheck size={16} />
                          Make Verified
                        </button>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          {/* Prev Button */}
          {currentPage > 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white transition">
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Page Numbers */}
          {(() => {
            const visiblePages = [];

            // Always show first page
            if (currentPage > 2) {
              visiblePages.push(1);
              if (currentPage > 3) visiblePages.push("ellipsis-1");
            }

            // Show current -1, current, current +1
            for (
              let i = Math.max(1, currentPage - 1);
              i <= Math.min(totalPages, currentPage + 1);
              i++
            ) {
              visiblePages.push(i);
            }

            // Always show last page
            if (currentPage < totalPages - 1) {
              if (currentPage < totalPages - 2) visiblePages.push("ellipsis-2");
              visiblePages.push(totalPages);
            }

            return visiblePages.map((page) =>
              typeof page === "string" && page.startsWith("ellipsis") ? (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
                  } transition`}>
                  {page}
                </button>
              )
            );
          })()}

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white transition">
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

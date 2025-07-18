import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  AlertCircle,
  GraduationCap,
  Pencil,
  Camera,
  CloudUpload,
} from "lucide-react";
import Swal from "sweetalert2";
import UploadBox from "../../Component/UploadBox/UploadBox";
import UploadingPreview from "../../Component/UploadingPreview/UploadingPreview";
import ImagePreview from "../../Component/ImagePreview/ImagePreview";
import axiosInstance from "../../utils/axiosInstance";

const Profile = () => {
  const { userInfo, loading, setUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [nidUploading, setNidUploading] = useState(false);
  const [idCardUploading, setIdCardUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    city: "",
    location: "",
    fbLink: "",
    institute: "",
    idNo: "",
    department: "",
    degree: "",
    passingYear: "",
    image: "",
    nid: "",
    idCard: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        gender: userInfo.gender || "",
        city: userInfo.city || "",
        location: userInfo.location || "",
        fbLink: userInfo.fbLink || "",
        institute: userInfo.institute || "",
        idNo: userInfo.idNo || "",
        department: userInfo.department || "",
        degree: userInfo.degree || "",
        passingYear: userInfo.passingYear || "",
        image: userInfo.image || "",
        nid: userInfo.nid || "",
        idCard: userInfo.idCard || "",
        isVerified: userInfo.isVerified || "",
      });
    }
  }, [userInfo]);

  if (loading || !userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Upload image to Cloudinary, update formData with the URL
  const uploadImage = async (file, fieldName) => {
    if (!file) return;

    // Uploading স্টেট সেট করা
    if (fieldName === "nid") setNidUploading(true);
    else if (fieldName === "idCard") setIdCardUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_profile_img");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvrn8ytwm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await res.json();
      if (fileData.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: fileData.secure_url,
        }));
        // Swal.fire({
        //   icon: "success",
        //   title: `${fieldName === "image" ? "Profile" : "NID"} image uploaded!`,
        //   timer: 1500,
        //   showConfirmButton: false,
        // });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Please try again.",
      });
    } finally {
      if (fieldName === "nid") setNidUploading(false);
      else if (fieldName === "idCard") setIdCardUploading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "image");
  };

  const handleNidImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "nid");
  };

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file, "idCard");
  };

  // Save all changes to backend
  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(
        `/users/${userInfo.uid}`,
        formData
      );

      const updatedUser = response.data;

      // Update global userInfo in context
      setUserData(updatedUser);

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message || "Failed to update profile",
      });
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] my-10 p-4">
      <div className="flex items-start flex-col md:flex-row lg:flex-row gap-4 w-full">
        {/* Sidebar */}
        <div className="rounded-xl bg-white border border-indigo-100 shadow-md p-4 pb-8 text-center mb-4 w-full lg:w-[40%]">
          <div className="flex justify-center">
            <div className=" relative size-fit min-w-[100px]">
              <img
                alt={formData?.name}
                className="w-36 h-36 object-cover shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                src={
                  formData.image ||
                  "	https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/avataaar/Profile-Picture.png"
                }
              />

              {isEditing && (
                <>
                  {/* Hidden File Input */}
                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />

                  {/* Edit Icon */}
                  <label
                    htmlFor="profileImageUpload"
                    className="absolute bottom-0 right-0 cursor-pointer"
                    title="Change Profile Picture">
                    <div className="flex size-[2.1rem] items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition">
                      <Camera size={18} />
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 text-center">
            <h2 className="flex gap-2 text-xl font-bold items-center justify-center lg:text-2xl">
              <span className="w-full md:w-fit flex items-center justify-center gap-2">
                {formData?.name || (
                  <span className="text-red-600">Not Given</span>
                )}{" "}
                {formData.isVerified && (
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                      alt="verified"
                      className="w-7 h-7 object-cover"
                    />
                  </div>
                )}
              </span>
            </h2>
            {/* <p className="my-1 font-bold text-[rgba(34,34,34,0.5)] text-xs lg:my-2">
              Guardian / Student ID: 405284
            </p> */}
            <button onClick={handleEditToggle} className="btn w-full my-4">
              {isEditing ? "Cancel" : "Edit Information"}
            </button>
            {isEditing && (
              <button onClick={handleSave} className="btn w-full ">
                Save Changes
              </button>
            )}
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Mail size={16} />
              Email
            </p>
            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {formData.email || "No data found"}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Phone size={16} />
              Phone Number
            </p>

            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {formData.phone || "No data found"}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <MapPin size={16} />
              Address
            </p>
            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {formData.location || "No data found"},{" "}
              {formData.city || "No data found"}
            </p>
          </div>
        </div>
        {/* Sidebar end */}
        <div className="rounded-2xl bg-white border border-indigo-100 shadow-md p-4 pb-8 md:p-6 w-full lg:w-[60%]">
          <div className="md:px-3">
            {/* Personal Information */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="mt-3 space-y-1 text-sm text-[rgba(34,34,34,0.5)] md:ms-9">
                <div className="space-y-1">
                  <p className="flex border-y border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Name
                    </strong>

                    {formData.name || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>

                    {formData.phone || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  {/* <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Email
                    </strong>

                    <span className="break-words text-[12px]">
                      {formData.email || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p> */}
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Gender
                    </strong>

                    <span className="capitalize">
                      {formData.gender || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Facebook Profile Link
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.fbLink}
                        onChange={handleChange}
                        className="w-full border-b border-black/50 focus:border-b-2 focus:outline-none"
                        type="text"
                        name="fbLink"
                        placeholder="Enter Facebook URL"
                      />
                    ) : (
                      <>
                        {formData.fbLink ? (
                          <a
                            href={formData.fbLink}
                            className="text-blue-500 font-medium"
                            target="_blank"
                            rel="noopener noreferrer">
                            Link
                          </a>
                        ) : (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      City
                    </strong>

                    {formData.city || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>

                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>

                    {formData.location || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Eduction */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <GraduationCap className="w-6 h-6" />
                Educational Information
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-[rgba(34,34,34,0.5)] md:ms-9 ">
                <div className="space-y-1 ">
                  <p className="flex border-y border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Current Institute
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.institute}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="institute"
                        placeholder="Enter your current institute"
                      />
                    ) : (
                      <>
                        {formData.institute || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      ID Card No
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.idNo}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="idNo"
                        placeholder="Enter your ID card number"
                      />
                    ) : (
                      <>
                        {formData?.idNo || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Department
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="department"
                        placeholder="Enter your department or class"
                      />
                    ) : (
                      <>
                        {formData?.department || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Session
                    </strong>
                    {isEditing ? (
                      <input
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="degree"
                        placeholder="Enter your previous exam or degree"
                      />
                    ) : (
                      <>
                        {formData.degree || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Year
                    </strong>

                    {isEditing ? (
                      <input
                        value={formData.passingYear}
                        onChange={handleChange}
                        className="w-full border-b border-black/50  focus:border-b-2 focus:outline-none"
                        type="text"
                        name="passingYear"
                        placeholder="Enter your year of passing"
                      />
                    ) : (
                      <>
                        {formData.passingYear || (
                          <span className="text-red-600">Not Given</span>
                        )}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <ShieldCheck className="w-5 h-5" />
                Verification & Security
              </h2>
            </div>

            <div className="mt-4 flex flex-col md:flex-row lg:flex-row gap-4  items-center ">
              {/* NID Upload */}
              {isEditing && !formData.nid && !nidUploading && (
                <UploadBox
                  id="nidImageUpload"
                  label="NID"
                  onChange={handleNidImageChange}
                />
              )}
              {nidUploading ? (
                <UploadingPreview label="NID" />
              ) : formData.nid ? (
                <ImagePreview src={formData.nid} label="NID" />
              ) : null}

              {/* ID Card Upload */}
              {isEditing && !formData.idCard && !idCardUploading && (
                <UploadBox
                  id="studentIdImageUpload"
                  label="Student ID CARD"
                  onChange={handleIdCardChange}
                />
              )}
              {idCardUploading ? (
                <UploadingPreview label="Student ID CARD" />
              ) : formData.idCard ? (
                <ImagePreview src={formData.idCard} label="Student ID CARD" />
              ) : null}
            </div>

            {!formData.nid &&
              !formData.idCard &&
              !nidUploading &&
              !idCardUploading && (
                <p className="text-red-600 text-sm mt-4 md:ms-8">
                  You have not uploaded any credentials yet.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

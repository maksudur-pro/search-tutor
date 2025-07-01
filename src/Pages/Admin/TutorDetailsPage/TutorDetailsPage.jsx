import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
} from "lucide-react";

const TutorDetailsPage = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://search-tutor-server.vercel.app/users/${uid}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch tutor data");
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500">Tutor not found</div>
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
                alt={
                  user?.name || <span className="text-red-600">Not Given</span>
                }
                className="w-36 h-36 object-cover shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                src={user?.image || "https://i.pravatar.cc/300"}
              />
            </div>
          </div>
          <div className="mt-2 text-center">
            <h2 className="flex gap-2 text-xl font-bold items-center justify-center lg:text-2xl">
              <span className="w-full md:w-fit">
                {user?.name || <span className="text-red-600">Not Given</span>}
              </span>
            </h2>
            {/* <p className="my-1 font-bold text-[rgba(34,34,34,0.5)] text-xs lg:my-2">
              Guardian / Student ID: 405284
            </p> */}
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Mail size={16} />
              Email
            </p>
            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {user?.email || <span className="text-red-600">Not Given</span>}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Phone size={16} />
              Phone Number
            </p>

            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {user?.phone || <span className="text-red-600">Not Given</span>}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <MapPin size={16} />
              Address
            </p>
            <p className="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {user?.city || <span className="text-red-600">Not Given</span>},{" "}
              {user?.location || (
                <span className="text-red-600">Not Given</span>
              )}
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

                    {user?.name || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>

                    {user?.phone || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Email
                    </strong>

                    <span className="break-words text-[12px]">
                      {user?.email || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Gender
                    </strong>

                    <span className="capitalize">
                      {user?.gender || (
                        <span className="text-red-600">Not Given</span>
                      )}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Facebook
                    </strong>
                    {user?.fbLink ? (
                      <a
                        href={user?.fbLink}
                        className="text-blue-500 font-medium">
                        Link
                      </a>
                    ) : (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      City
                    </strong>

                    {user?.location || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Location
                    </strong>

                    {user?.city || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>
                    {user?.city || (
                      <span className="text-red-600">Not Given</span>
                    )}
                    ,{" "}
                    {user?.location || (
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

                    {user?.institute || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      ID Card No
                    </strong>

                    {user?.idNo || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Department / Class
                    </strong>

                    {user?.department || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Previous Exam / Degree
                    </strong>

                    {user?.degree || (
                      <span className="text-red-600">Not Given</span>
                    )}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Year of Passing
                    </strong>

                    {user?.passingYear || (
                      <span className="text-red-600">Not Given</span>
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

            <div className="mt-4 flex items-center justify-center md:justify-start md:gap-6">
              {user?.nid ? (
                <div className="md:ms-8">
                  <div className="relative h-44 overflow-hidden rounded-sm bg-[#ddd] p-3 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                    <img
                      alt="NID"
                      width="220"
                      height="100"
                      className="mx-auto max-h-[9.5rem] object-cover"
                      src={user?.nid}
                    />
                    <p className="absolute bottom-3 left-3 w-[calc(100%-24px)] bg-[#9b9b9ba6] p-2 text-center text-xs font-bold text-white">
                      NID
                    </p>
                  </div>
                </div>
              ) : (
                <p className="ms-0 text-red-600 md:ms-8">
                  User not uploaded any credential yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;

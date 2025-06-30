import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  AlertCircle,
} from "lucide-react";

const Profile = () => {
  const { userInfo, loading } = useContext(AuthContext);

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
            <div className="size-fit min-w-[100px]">
              <img
                alt={userInfo?.name}
                width="100"
                height="100"
                className="object-cover shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                src={userInfo?.image}
              />
            </div>
          </div>
          <div className="mt-2 text-center">
            <h2 className="flex gap-2 text-xl font-bold items-center justify-center lg:text-2xl">
              <span className="w-full md:w-fit">{userInfo?.name}</span>
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
            <p class="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {userInfo.email || "No data found"}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <Phone size={16} />
              Phone Number
            </p>
            <p class="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {userInfo.phone || "No data found"}
            </p>
          </div>
          <div className="mb-2 mt-4 text-left block">
            <p className="flex items-center gap-2 font-bold">
              <MapPin size={16} />
              Address
            </p>
            <p class="ms-6 mt-1 text-sm  font-semibold text-[rgba(34,34,34,0.5)]">
              {userInfo.city || "No data found"},{" "}
              {userInfo.location || "No data found"}
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
                    <span className="me-1 font-semibold text-black">:</span>
                    {userInfo?.name}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    {userInfo.phone || "No data found"}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Email
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="break-words">
                      {userInfo.email || "No data found"}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Gender
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="capitalize">
                      {userInfo.gender || "No data found"}
                    </span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Facebook / LinkedIn
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="text-red-600">Not Given</span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      City
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    {userInfo.location || "No data found"}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Location
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    {userInfo.city || "No data found"}
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    {/* <span className="text-red-600">Not Given</span> */}
                    {userInfo.city || "No data found"},{" "}
                    {userInfo.location || "No data found"}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="mt-4">
              <h2 className="flex items-center justify-center gap-3 text-lg font-semibold md:justify-start md:text-xl">
                <AlertCircle className="w-5 h-5" />
                Emergency Information
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-[rgba(34,34,34,0.5)] md:ms-9 xl:flex-row xl:gap-4">
                <div className="space-y-1 ">
                  <p className="flex border-y border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Name
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="text-red-600">Not Given</span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Relation
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="text-red-600">Not Given</span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Contact Number
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="text-red-600">Not Given</span>
                  </p>
                  <p className="flex border-b border-gray-100 py-0.5 md:border-0">
                    <strong className="block w-[8.4rem] shrink-0 text-gray-700 md:w-[13.5rem]">
                      Address
                    </strong>
                    <span className="me-1 font-semibold text-black">:</span>
                    <span className="text-red-600">Not Given</span>
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
              <p class=" ms-0 text-red-600 md:ms-8">
                You have not uploaded any credential yet
              </p>
              {/* <div className="md:ms-8">
                  <div className="relative h-44 overflow-hidden rounded-sm bg-[#ddd] p-3 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                    <img
                      alt="NID"
                      width="220"
                      height="100"
                      className="mx-auto max-h-[9.5rem] object-cover"
                      src="https://caretutor-space-file.nyc3.digitaloceanspaces.com/assets/upload/guardian/credential/405284_434a9f5679ce43ea9526b7480955f755.png"
                    />
                    <p className="absolute bottom-3 left-3 w-[calc(100%-24px)] bg-[#9b9b9ba6] p-2 text-center text-xs font-bold text-white">
                      NID
                    </p>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

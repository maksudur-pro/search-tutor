import React, { useContext } from "react";
import TuitionType from "../../Component/TuitionType/TuitionType";
import ReviewGuardian from "../../Component/ReviewGuardian/ReviewGuardian";
import ReviewTeacher from "../../Component/ReviewTeacher/ReviewTeacher";
import HowToWork from "../../Component/HowToWork/HowToWork";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <>
          <div className="mx-auto px-4 lg:max-w-[60rem] xl:max-w-[71.25rem]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 ">
              <div className="my-4 text-black md:mt-8 lg:mt-0 lg:w-1/2">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold lg:text-4xl">
                    Hire the Right Tutor Today
                  </h1>
                </div>
                <div className="mb-7">
                  <h2 className=" text-xl font-bold text-left text-[rgb(0, 0, 0)]">
                    Book one-on-one lessons with verified tutors in your area
                  </h2>
                </div>
                <a className="hero_button rounded-xl border border-indigo-500 bg-indigo-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-indigo-500">
                  Hire a Tutor (It’s Free!)
                </a>
                <div className="m-0 mt-4 flex gap-1 text-gray-500">
                  <p className="text-justify text-[rgb(136, 136, 136)]">
                    Want to become a Tutor?
                  </p>
                  <a className="font-bold text-indigo-500" href="/signup/tutor">
                    Sign Up
                  </a>{" "}
                  <p className="text-justify text-[rgb(136, 136, 136)]">now</p>
                </div>
              </div>

              <div className="hero-images w-full p-0 lg:p-9 md:w-[33rem] lg:w-1/2">
                <div className="flex items-end gap-3">
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="201"
                    height="208"
                    decoding="async"
                    className="img-shadow floating max-w-[9.5rem] rounded-tl-[8rem] sm:max-w-full"
                    src="/img1.jpg"
                  />
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="160"
                    height="160"
                    decoding="async"
                    className="floating2 img-shadow max-w-[8.6rem] rounded sm:max-w-full"
                    src="/img2.jpg"
                  />
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="160"
                    height="160"
                    decoding="async"
                    className="floating2 img-shadow max-w-[8.6rem] rounded sm:max-w-full"
                    src="img3.jpg"
                  />
                  <img
                    alt="Home Tutors & Tuitions"
                    loading="lazy"
                    width="201"
                    height="208"
                    decoding="async"
                    className="floating img-shadow max-w-[9.5rem] rounded-br-[8rem] sm:max-w-full"
                    src="/img1.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
          <TuitionType></TuitionType>
          <ReviewTeacher></ReviewTeacher>
          <HowToWork></HowToWork>
          <ReviewGuardian></ReviewGuardian>
        </>
      )}
    </>
  );
};

export default Home;

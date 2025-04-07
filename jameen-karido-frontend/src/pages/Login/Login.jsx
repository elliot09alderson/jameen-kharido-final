import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customer_login, customer_logout } from "../../rtk/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import home from "/image/home.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "/image/oyo-logo1.png";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );

  console.log(userInfo);

  return (
    <div
      className=" w-full  h-fit lg:h-screen bg-cover bg-center relative  flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0) 70%), url(${home})`,
      }}
    >
      <div className="absolute bottom-24 left-24 text-4xl text-white gap-12  w-full hidden lg:flex  ">
        <h1 className="lg:w-[600px]">
          Hundereds of Users of Chhattisgarh used Jameen Kharido to buy their
          first Dream Home.
        </h1>
        <div className="flex gap-5 items-center lg:w-[400px] justify-between font-semibold w-full text-lg mt-8 self-end">
          <div>1000+ Active and Trusted Ads</div>
          <div>Easy Purchase</div>
          <div>Powerful Dashboard</div>
        </div>
      </div>
      <div className="bg-white lg:absolute   h-full lg:h-[96vh] lg:w-[27vw] top-4 right-4 items-center  lg:rounded-lg p-10 flex flex-col gap-4 z-10 lg:px-16 px-8">
        <div className="py-4 mt-20">
          <div className="flex flex-col gap-4">
            <img src={logo} alt="" className="h-8 w-20 mb-2" />

            <h1 className="text-gray-400 text-sm pb-2">
              Welcome to <span className="font-semibold">jameen kharido</span>
            </h1>
            <h1 className="text-black  text-2xl lg:text-3xl font-bold pb-8">
              Get started with your email or phone number
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log("Form Data:", values);
              const res = dispatch(customer_login(values)).then(() =>
                navigate("/")
              );

              console.log("rerer", res.error);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8 ">
                <div>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-4 bg-white focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    className="text-sm pl-1 pt-1"
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    id="password"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    className="text-sm pl-1 pt-1"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loader}
                  className="w-full px-8 h-12 lg:h-10 rounded-md border tracking-wide text-lg border-gray-300 bg-blue-600 text-white"
                >
                  {loader ? "loading..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-between gap-8 mt-8 text-sm">
            <Link to="/forgetPassword ">
              <h1 className="capitalize cursor-pointer text-blue-600 underline">
                forgot password
              </h1>
            </Link>
            <Link to="/register">
              <h1 className="capitalize cursor-pointer text-blue-600 underline">
                Register
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex pl-0 lg:absolute bottom-8 lg:bottom-4 lg:left-10 px-8   lg:px-5 text-xs lg:text-lg  bg-white mb-8 ">
          <h1 className="text-sm text-gray-400 tracking-wide">
            By continuing you agree to our{" "}
            <Link to="/">
              <span className="text-blue-700 cursor-pointer">
                privacy policy
              </span>
            </Link>{" "}
            and{" "}
            <Link to="/">
              <span className="text-blue-700 cursor-pointer">terms of use</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

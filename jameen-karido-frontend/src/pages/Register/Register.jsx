import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { customer_register } from "../../rtk/slices/authSlice";
import { toast } from "react-toastify";
import home from "/image/home.jpg";
import logo from "/image/user.webp";
import { ArrowLeft } from "lucide-react";
const Register = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage } = useSelector((slice) => slice.auth);

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className=" w-full  h-fit lg:h-screen bg-cover bg-center relative  flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 70%), url(${home})`,
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
      <div className="bg-white lg:absolute  h-full lg:h-[96vh] lg:w-[27vw] top-4 right-4 items-center  lg:rounded-lg p-10 flex flex-col gap-4 z-10 px-16">
        <div className=" pb-0 lg:py-4 ">
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-400 text-sm pb-2">
              Welcome to <span className="font-semibold">jameen kharido</span>
            </h1>
            <h1 className="text-black text-2xl  lg:text-3xl font-bold pb-4">
              Get started with your email or phone number
            </h1>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("email", values.email);
              formData.append("password", values.password);
              formData.append("confirmPassword", values.confirmPassword);
              formData.append("phoneNumber", values.phoneNumber);
              formData.append("image", values.image);

              const result = Dispatch(customer_register(formData)).then(() => {
                navigate("/login");
              });
              console.log(result.success);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4 lg:gap-8">
                {/* Image Upload */}
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden "
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="image"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="relative flex items-center justify-center">
                  <label
                    htmlFor="image"
                    className="absolute bg-gray-500 top-20 border p-1 rounded-full"
                  >
                    <FaUserPlus />
                  </label>
                  <img
                    src={previewImage ? previewImage : logo}
                    alt="Preview"
                    className="rounded-full ring-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Name Field */}
                <div>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="name"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="confirmPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full pl-4  focus:ring-fuchsia-600 focus:ring-2 h-12 lg:h-10  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    className={"lg:text-sm text-xs pl-2 pt-1"}
                    name="phoneNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-8 h-12 lg:h-10  rounded-md bg-blue-600 text-lg text-white w-full"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <div>
            <Link to="/login">
              <h1 className="capitalize cursor-pointer flex gap-2 text-blue-500  mt-8 underline">
                <ArrowLeft /> Login{" "}
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

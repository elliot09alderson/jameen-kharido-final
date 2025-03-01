import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AirVent,
  BatteryCharging,
  CarTaxiFront,
  Cctv,
  Heart,
  Wifi,
  Tv,
} from "lucide-react";
import {
  messageClear,
  upload_home_Ad,
  upload_land_Ad,
} from "../../../rtk/slices/adSlice.js";
import { toast } from "react-toastify";

const PostLand = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { loader, errorMessage, successMessage } = useSelector(
    (slice) => slice.ad
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  const dispatch = useDispatch();
  const amenitiesData = [
    { name: "inverter", label: "Inverter", Icon: BatteryCharging },
    { name: "tv", label: "TV", Icon: Tv },
    { name: "wifi", label: "Wifi", Icon: Wifi },
    { name: "decor", label: "Decor", Icon: Heart },

    { name: "visit", label: "Visit", Icon: CarTaxiFront },
    { name: "cctv", label: "CCTV", Icon: Cctv },
    { name: "ventillator", label: "Ventillator", Icon: AirVent },
  ];
  const handleIconClick = (itemName) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemName)) {
        return prevSelectedItems.filter((item) => item !== itemName);
      } else {
        return [...prevSelectedItems, itemName];
      }
    });
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const getIconColor = (itemName) => {
    return selectedItems.includes(itemName) ? "text-blue-500" : "text-gray-500";
  };
  useEffect(() => {
    console.log(ErrorMessage);
  }, [ErrorMessage]);

  const initialValues = {
    title: "",
    description: "",
    pincode: "",
    type: "Land",
    location: "",
    nearby: "",

    price: "",
    area: "",
    roadAccess: false,

    isApproved: false,
  };

  const [images, setImages] = useState([]);
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    pincode: Yup.number().typeError("Pincode must be a number"),
    location: Yup.string().required("Location is required"),
    nearby: Yup.string().required("NearBy is required"),

    price: Yup.number()
      .required("Price is required")
      .typeError("Price must be a number"),
    area: Yup.number()
      .required("Area is required")
      .typeError("Area must be a number"),
    zoneType: Yup.string()
      .required("Zone type is required")
      .oneOf(
        ["Residential", "Commercial", "Agricultural"],
        "Zone type must be 'Residential', 'Commercial', or 'Agricultural'"
      ),

    roadAccess: Yup.boolean().default(false),

    nearby: Yup.string(),
  });

  const [previewImages, setPreviewImages] = useState([]);
  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    images.forEach((image) => {
      formData.append("landsAdImages", image);
    });
    selectedItems.forEach((ameniti) => {
      formData.append("amenities", ameniti);
    });
    dispatch(upload_land_Ad(formData)).then(() => {
      resetForm(); // Reset Formik form
      setImages([]); // Clear uploaded images state
      setSelectedItems([]);
      setPreviewImages([]);
    });
    // console.log(formData, "this s is land data");

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previewImages.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...filePreviews]);

    setImages([...images, ...files]);
  };
  const removeImage = (index) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);

    const updatedImages = values.images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors }) => (
        <Form className="max-w-4xl mx-auto p-6 bg-white shadow-md outline:none focus:outline-none rounded-md">
          <h2 className="lg:text-4xl font-bold my-8">
            Post Land Advertisement
          </h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Field
              name="title"
              type="text"
              placeholder="2000 sqft commercial land "
              className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Field
              name="description"
              placeholder="3 km away from highway. 2km away from city center"
              as="textarea"
              className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <Field
              name="location"
              placeholder="State, City, Area, Landmark"
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nearby"
              className="block text-sm font-medium text-gray-700"
            >
              Near By
            </label>
            <Field
              name="nearby"
              type="text"
              placeholder="1 km from durg railway station"
              className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
            />
            <ErrorMessage
              name="nearby"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="flex items-center gap-5 ">
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Field
                name="price"
                type="text"
                placeholder="10,00000"
                className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <Field
                name="pincode"
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="pincode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700"
              >
                Area (sq ft)
              </label>
              <Field
                name="area"
                type="text"
                placeholder="total carpet area in sqft"
                className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="area"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 py-4">
            <div className="mb-4 flex items-center">
              <Field name="roadAccess" type="checkbox" className="mr-2" />
              <label
                htmlFor="roadAccess"
                className="text-sm font-medium text-gray-700"
              >
                Road Access
              </label>
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label
                htmlFor="zoneType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Zone Type
              </label>
              <Field
                as="select"
                name="zoneType"
                id="zoneType"
                className="block  w-64 rounded-md border border-gray-300 p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Zone Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Agricultural">Agricultural</option>
              </Field>
              <ErrorMessage
                name="zoneType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <h3 className="font-semibold">Select Amenities</h3>
          <div className="p-4 pt-2">
            <div className="flex space-x-4 py-2 items-center  flex-wrap gap-4">
              {amenitiesData.map(({ name, label, Icon }) => (
                <div
                  key={name}
                  className="flex items-center flex-col justify-center"
                  onClick={() => handleIconClick(name)}
                >
                  <Icon className={`cursor-pointer ${getIconColor(name)}`} />
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e)}
              className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
            />
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 mr-4 mb-4">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 px-2 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            {console.log(errors)}
            <ErrorMessage
              name="images"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={loader}
            className={`w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 `}
          >
            {loader ? "uploading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostLand;

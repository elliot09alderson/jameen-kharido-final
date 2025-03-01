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
  Check,
  CircleCheck,
  CreditCard,
  DoorClosed,
  Heart,
  Heater,
  Hotel,
  Images,
  MonitorStop,
  Pencil,
  Percent,
  QrCode,
  ShieldAlert,
  Star,
  Wifi,
  Tv,
} from "lucide-react";
import {
  messageClear,
  upload_home_Ad,
  upload_shop_Ad,
} from "../../../rtk/slices/adSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const amenitiesData = [
  { name: "inverter", label: "Inverter", Icon: BatteryCharging },
  { name: "tv", label: "TV", Icon: Tv },
  { name: "wifi", label: "Wifi", Icon: Wifi },
  { name: "decor", label: "Decor", Icon: Heart },

  { name: "visit", label: "Visit", Icon: CarTaxiFront },
  { name: "cctv", label: "CCTV", Icon: Cctv },
  { name: "ventillator", label: "Ventillator", Icon: AirVent },
];

const PostShop = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { loader, errorMessage, successMessage } = useSelector(
    (slice) => slice.ad
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
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
    type: "Shop",
    location: "",
    nearby: "",

    price: "",
    area: "",
    floor: "",
    furnished: "",
    parking: false,
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
    floor: Yup.number()
      .required("floor are required")
      .typeError("floor must be a number"),
    furnished: Yup.string()
      .oneOf(
        ["Furnished", "Unfurnished", "Semi-Furnished"],
        "Invalid furnished option"
      )
      .required("Furnishing status is required"),

    nearby: Yup.string(),
  });
  const navigate = useNavigate();

  const [previewImages, setPreviewImages] = useState([]);
  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    images.forEach((image) => {
      formData.append("shopsAdImages", image);
    });
    selectedItems.forEach((ameniti) => {
      formData.append("amenities", ameniti);
    });
    dispatch(upload_shop_Ad(formData)).then(() => {
      resetForm(); // Reset Formik form
      setImages([]); // Clear uploaded images state
      setSelectedItems([]);
      setPreviewImages([]);
    });

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
          <h2 className="lg:text-4xl text-3xl font-bold mt-2  py-8 pt-4">
            Enter Shop Details
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
              placeholder="Fun top Bakery"
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
              placeholder="full furnished cake shop with regular 100+ cutomers in well known area  "
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
              className="w-full outline:none focus:outline-none mt-1 p-2 border border-gray-300 outline:none rounded-md focus:ring focus:ring-blue-500"
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

          <div className="flex items-start gap-5 flex-col">
            <div className="mb-4">
              <label
                htmlFor="floor"
                className="block text-sm font-medium text-gray-700"
              >
                Floor
              </label>
              <Field
                name="floor"
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 outline:none focus:outline-none rounded-md focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="floor"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4 flex items-center gap-4">
              <label
                htmlFor="furnished"
                className="block text-sm font-medium text-gray-700"
              >
                Furnished Status
              </label>
              <Field
                as="select"
                name="furnished"
                id="furnished"
                className="py-2 block w-64 border focus:outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Status</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </Field>
              <ErrorMessage
                name="furnished"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-12 py-4">
            <div className="mb-4 flex items-center">
              <Field name="parking" type="checkbox" className="mr-2" />
              <label
                htmlFor="parking"
                className="text-sm font-medium text-gray-700"
              >
                Parking Available
              </label>
            </div>
          </div>

          <h3 className="font-semibold">Select Amenities</h3>
          <div className="p-4 pt-2">
            <div className="flex space-x-0 py-2 items-center  flex-wrap lg:gap-10 gap-5">
              {amenitiesData.map(({ name, label, Icon }) => (
                <div
                  key={name}
                  className="flex items-center flex-col justify-center"
                  onClick={() => handleIconClick(name)}
                >
                  <Icon
                    className={`cursor-pointer size-5 lg:size-8 ${getIconColor(
                      name
                    )}`}
                  />
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
            {previewImages?.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {previewImages?.map((image, index) => (
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

export default PostShop;

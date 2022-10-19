import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 20) {
//     errors.firstName = "Must be 20 characters or less";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Required";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Must be 20 characters or less";
//   }

//   return errors;
// };

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-10 w-full max-w-[500px] mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firstName" className="cursor-pointer">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="rounded-md border border-gray-100 p-2"
          {...formik.getFieldProps("firstName")}
        />
      </div>
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="text-sm text-red-500 mb-2">
          {formik.errors.firstName}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName" className="cursor-pointer">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          className="rounded-md border border-gray-100 p-2"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-sm text-red-500 mb-2">
            {formik.errors.lastName}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full p-4 bg-blue-600 font-semibold text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;

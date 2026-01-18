import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { StepProps } from "../types";

const validationSchema = Yup.object({
  name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),
  phone: Yup.string().required("This field is required"),
});

const Step1PersonalInfo: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const initialValues = formData.personalInfo;

  const handleSubmit = (values: typeof initialValues) => {
    updateFormData({
      personalInfo: values,
    });
    nextStep();
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
        Personal info
      </h1>
      <p className="text-grey-500 mt-2 mb-8">
        Please provide your name, email address, and phone number.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="name"
                  className="block text-sm text-blue-950 font-medium"
                >
                  Name
                </label>
                <ErrorMessage name="name">
                  {(msg) => (
                    <span className="text-sm text-red-500 font-medium">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Stephen King"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-purple-200"
                }`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="email"
                  className="block text-sm text-blue-950 font-medium"
                >
                  Email Address
                </label>
                <ErrorMessage name="email">
                  {(msg) => (
                    <span className="text-sm text-red-500 font-medium">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-purple-200"
                }`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="phone"
                  className="block text-sm text-blue-950 font-medium"
                >
                  Phone Number
                </label>
                <ErrorMessage name="phone">
                  {(msg) => (
                    <span className="text-sm text-red-500 font-medium">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  errors.phone && touched.phone
                    ? "border-red-500"
                    : "border-purple-200"
                }`}
              />
            </div>

            <div className="flex justify-end mt-12">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Next Step
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1PersonalInfo;

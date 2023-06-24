import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";

const passwordRequirements = [
  { id: 1, text: "At least 8 characters", regex: /.{8,}/ },
  { id: 2, text: "At least 1 uppercase letter", regex: /[A-Z]/ },
  {
    id: 3,
    text: "At least 2 numbers",
    regex: /^(?=(?:\D*\d){2})[a-zA-Z0-9]*$/,
  },
];

const registerSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/)
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function RegisterForm({ onFormSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirements, setRequirements] = useState(passwordRequirements);

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      onFormSubmit(values.email, values.password);
    },
  });

  useEffect(() => {
    setRequirements(
      requirements.map((req) => ({
        ...req,
        met: req.regex.test(formikRegister.values.password),
      }))
    );
  }, [formikRegister.values.password]);

  return (
    <form onSubmit={formikRegister.handleSubmit}>
      <section>
        <label
          htmlFor='email'
          className='block text-sm font-semibold text-gray-600'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.email}
          className='block w-full mt-[0.25rem] rounded-lg border-[1px] p-[.5rem] font-medium leading-6'
        />
        {formikRegister.touched.email && formikRegister.errors.email ? (
          <div className={"text-red-500"}>{formikRegister.errors.email}</div>
        ) : null}
      </section>
      <section>
        <label
          htmlFor='password'
          className='block text-sm font-semibold text-gray-600'
        >
          Password
        </label>
        <div className='relative'>
          <input
            id='password'
            name='password'
            type={showPassword ? "text" : "password"}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            value={formikRegister.values.password}
            className='block w-full mt-[0.25rem] rounded-lg border-[1px] p-[.5rem] font-medium leading-6'
          />
          <div
            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className='h-[1.25rem] w-[1.25rem]' />
            ) : (
              <EyeIcon className='h-[1.25rem] w-[1.25rem]' />
            )}
          </div>
        </div>

        <ul>
          {requirements.map((req) => (
            <li
              key={req.id}
              className={`text-sm 
                 ${req.met ? "line-through text-blue-700" : "text-gray-500"}`}
            >
              {req.text}
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-2'>
        <label
          htmlFor='confirmPassword'
          className='block text-sm font-semibold text-gray-600'
        >
          Confirm Password
        </label>
        <div className='relative'>
          <input
            id='confirmPassword'
            type={showConfirmPassword ? "text" : "password"}
            {...formikRegister.getFieldProps("confirmPassword")}
            className='block w-full mt-[0.25rem] rounded-lg border-[1px] p-[.5rem] font-medium leading-6'
          />
          <div
            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className='h-[1.25rem] w-[1.25rem]' />
            ) : (
              <EyeIcon className='h-[1.25rem] w-[1.25rem] ' />
            )}
          </div>
        </div>
        {formikRegister.touched.confirmPassword &&
        formikRegister.errors.confirmPassword ? (
          <div className='text-red-500 font-sm'>
            {formikRegister.errors.confirmPassword}
          </div>
        ) : null}
      </section>

      <button
        type='submit'
        className='my-2 w-full px-[1rem] py-[0.5rem] border-0 rounded-lg text-lg text-white bg-blue-700 hover:bg-blue-900 transition duration-300 '
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;

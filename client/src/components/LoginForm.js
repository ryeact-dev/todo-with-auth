import React, { useState } from "react";
import { useFormik } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm({ onFormSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onFormSubmit(values.email, values.password);
    },
  });

  return (
    <form onSubmit={formikLogin.handleSubmit}>
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
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          value={formikLogin.values.email}
          className='block w-full mt-[0.25rem] rounded-lg border-[1px] p-[.5rem] font-medium leading-6'
        />
        {formikLogin.touched.email && formikLogin.errors.email ? (
          <div className='text-red-500'>{formikLogin.errors.email}</div>
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
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            value={formikLogin.values.password}
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
        {formikLogin.touched.password && formikLogin.errors.password ? (
          <div className={"text-red-500"}>{formikLogin.errors.password}</div>
        ) : null}
      </section>
      <button
        type='submit'
        className='my-2 w-full px-[1rem] py-[0.5rem] border-0 rounded-lg text-lg text-white bg-blue-700 hover:bg-blue-900 transition duration-300 '
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;

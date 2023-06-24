import { useState } from "react";
import { useCookies } from "react-cookie";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const setCookie = useCookies(null)[1];
  const [isLogIn, setIsLogin] = useState(true);

  const viewLogin = (status) => {
    setIsLogin(status);
  };

  const submitData = async (emailValue, passwordValue) => {
    try {
      const userData = {
        emailValue,
        passwordValue,
      };

      const endpoint = isLogIn ? "login" : "signup";

      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setCookie("Email", data.emailValue);
      setCookie("AuthToken", data.token);

      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const btnSwitch = !isLogIn ? "bg-white" : "bg-gray-400";
  const btnSwitch1 = isLogIn ? "bg-white" : "bg-gray-400";

  return (
    <div className='w-[500px] rounded-lg overflow-hidden shadow-md bg-gray-50'>
      <div className={isLogIn ? "h-[320px] px-4 py-2" : "px-4 py-2"}>
        <h1 className='my-2 text-center font-semibold text-2xl'>
          {isLogIn ? "Log in" : "Register"}
        </h1>
        {isLogIn ? (
          <LoginForm isLogIn={isLogIn} onFormSubmit={submitData} />
        ) : (
          <RegisterForm isLogIn={isLogIn} onFormSubmit={submitData} />
        )}
      </div>
      <div className='flex text-gray-700'>
        <button
          onClick={() => viewLogin(false)}
          className={`w-1/2 border-none p-2 ${btnSwitch}`}
        >
          Register
        </button>
        <button
          onClick={() => viewLogin(true)}
          className={`w-1/2 border-none p-2 ${btnSwitch1}`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;

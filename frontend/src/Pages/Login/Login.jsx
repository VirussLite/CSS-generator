import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const cart = useContext(UserContext);

  const handlelogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/login", {
        data: {
          email: email,
          password: password,
        },
      });

      cart.setUserEmail(email);

      const cartinstance = await axios.get(
        "http://localhost:8000/api/user/getcart",
        {
          data: {
            email: email,
          },
        }
      );
      cart.setUserCart(cartinstance.data.message);
      cart.setIsCart(cartinstance.data.cartArray);
      toast(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="max-w-[600px] flex flex-col gap-4 absolute top-1/2 left-[10%] -translate-y-1/2 z-20">
      <h2 className="text-7xl text-white">
        Let's be{" "}
        <span
          style={{
            background:
              "-webkit-linear-gradient(90deg, rgba(220,245,251,1) 12%, rgba(97,238,232,1) 76%, rgba(27,240,231,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "white",
          }}
        >
          fast!
        </span>
      </h2>
      <p className="text-[#dcdcdc] text-xl">
        Log in to Website to start getting faster
      </p>
      <input
        type="text"
        className="outline-none focus:border-[#a7d2b9] border-2  bg-[#1A1D22] w-full mt-4 p-3 rounded-md text-white hover:border-[#358E5C]"
        placeholder="User Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="outline-none focus:border-[#8cfaba] border-2 bg-[#1A1D22] w-full p-3 rounded-md text-white hover:border-[#358E5C]"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p
        style={{
          background:
            "-webkit-linear-gradient(90deg, rgba(220,245,251,1) 12%, rgba(97,238,232,1) 76%, rgba(27,240,231,1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        forget password?
      </p>
      <button
        onClick={() => handlelogin()}
        className="w-full rounded-md bg-[#8ADEE9] text-black text-center px-3 py-2 font-semibold"
      >
        Log in
      </button>
      <p className="text-[#dcdcdc]">
        Dont have an account?
        <Link to="/user/signup" className="font-medium text-white pl-2">
          Sign up
        </Link>
      </p>
      <ToastContainer style={{ zIndex: "20" }} />
    </section>
  );
};

export default Login;

import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data,
        { withCredentials: true }
      );

      console.log(response);
      setIsLogin(true);
      // router.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="signIn">
      <form action="" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="se connecter" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

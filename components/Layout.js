import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginSate } from "../features/login.slice";

const Layout = (props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const loginSate = useSelector((state) => state.login.loginReducer);
  const dispatch = useDispatch();

  const logout = () => {
    // await axios.post("http://localhost:8000/api/logout", {
    //   withCredentials: true,
    // });

    // setIsLogin(false);
    dispatch(setLoginSate(false));
    router.push("/");
  };
  let menu;
  //   console.log(props.isLogin);

  if (!loginSate) {
    menu = (
      <ul>
        <li className="login">
          <Link
            href="/login"
            className={router.pathname == "/login" ? "nav-active" : ""}
          >
            Connexion
          </Link>
        </li>
        <li className="register">
          <Link
            href="/register"
            className={router.pathname == "/register" ? "nav-active" : ""}
          >
            Inscription
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul>
        <li className="login">
          <a
            onClick={logout}
            className={router.pathname == "/" ? "nav-active" : ""}
          >
            {" "}
            Deconnexion
          </a>
        </li>
        <li className="register">
          <Link
            href="/profil"
            className={router.pathname == "/profil" ? "nav-active" : ""}
          >
            Profile
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <>
      <Head></Head>
      <nav className="navbar">
        <ul className="logo">
          <Link href="/" style={{ fontWeight: "500" }}>
            BOOKSTORE
          </Link>
        </ul>
        <div className="search">
          <input
            type="text"
            placeholder="rechercher par livre , categorie ou auteur"
          />
        </div>
        <div className="menu">{menu}</div>
      </nav>

      <main>{props.children}</main>
    </>
  );
};

export default Layout;

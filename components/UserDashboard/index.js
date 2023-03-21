import React, { useEffect, useState } from "react";
import MyBooks from "./MyBooks";
import AddBook from "./AddBook";
import Layout from "../Layout";

const index = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState([]);

  const Nav = ["Ajouter un livre", "Mes livres"];

  useEffect(() => {
    async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        const content = res.json();
        console.log(content);
        setIsLogin(true);
      } catch (error) {
        console.log(error.response);
        setIsLogin(false);
      }
    };
  }, []);

  return (
    <div className="user-dashboard">
      <div className="content">
        <div className="header">
          <div className="pic">
            <span>
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
          <div className="username">{/* <span>user</span> */}</div>
        </div>
        <ul>
          {/* {Nav.map((el, index) => (
            <li key={index} id={el}>
              {el}
            </li>
          ))} */}
        </ul>
        <AddBook />
      </div>
    </div>
  );
};

export default index;

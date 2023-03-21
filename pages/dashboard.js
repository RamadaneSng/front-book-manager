import React, { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import AddBooks from "../components/dashboard/AddBook";
import MyBooks from "../components/dashboard/myBooks";
import Stats from "../components/dashboard/Stats";

const dashboard = () => {
  const [content, setContent] = useState("addBook");

  return (
    <div className="dashboard">
      <main>
        <div className="sidebar">
          <div className="logo">BibloLand</div>
          <div className="user">
            <div className="user-pic"></div>
            <span>Pseudo</span>
          </div>
          <div className="nav">
            <ul>
              <li
                onClick={() => setContent("addBook")}
                className={content === "addBook" ? "active" : ""}
              >
                <span>
                  <BiBookAdd />
                </span>
                Ajouter un livre
              </li>
              <li
                onClick={() => setContent("myBooks")}
                className={content === "myBooks" ? "active" : ""}
              >
                <span>
                  <FaBook />
                </span>
                Mes livres
              </li>
              <li
                onClick={() => setContent("stats")}
                className={content === "stats" ? "active" : ""}
              >
                <span>
                  <IoStatsChart />
                </span>
                Statistiques
              </li>
            </ul>
          </div>
          <div className="logout">
            <BiLogOut />
          </div>
        </div>
        <div className="content">
          {content === "addBook" && <AddBooks />}
          {content === "myBooks" && <MyBooks />}
          {content === "stats" && <Stats />}
        </div>
      </main>
    </div>
  );
};

export default dashboard;

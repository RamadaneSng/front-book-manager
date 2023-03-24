import React, { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import AddBooks from "../components/dashboard/AddBook";
import MyBooks from "../components/dashboard/myBooks";
import Stats from "../components/dashboard/Stats";
import useAuth from "../hooks/useAuth";
import { BsArrow90DegLeft } from "react-icons/bs";
import Link from "next/link";

const dashboard = () => {
  const [content, setContent] = useState("addBook");

  const { isLoading, user, logout } = useAuth({ middleware: "auth" });

  // const { data, error } = useSWR(
  //   "http://localhost:8000/api/book/getBooks",
  //   fetcher
  // );
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  if (isLoading) {
    return <>loading ...</>;
  }

  return (
    <div className="dashboard">
      <main>
        <div className="sidebar">
          <div className="back">
            <Link href="/">
              <BsArrow90DegLeft />
            </Link>
          </div>
          <div className="logo">
            <div className="logo">
              <div className="logo">
                B<span>i</span>blioLand
              </div>
            </div>
          </div>
          <div className="user">
            <div className="user-pic">{user.user.name[0]}</div>
            <span>{user.user.name}</span>
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
          <div className="logout" onClick={logout}>
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

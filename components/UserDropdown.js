import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

const userDropdown = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();
  return (
    <div className="user-dropdwon">
      <div className="item" onClick={() => setShowMenu(!showMenu)}>
        <span>{user.user.name[0]}</span>
        <Link href={""}>{user.user.name}</Link>
        <BsChevronDown />
      </div>

      {showMenu && (
        <div className="menu">
          <ul>
            <li>
              <RxDashboard />
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <BiLogOut />
              <Link href="" onClick={logout}>
                Deconnexion
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default userDropdown;

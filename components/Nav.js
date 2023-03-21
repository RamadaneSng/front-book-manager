import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" className={router.pathname == "/" ? "nav-active" : ""}>
            Acceuil
          </Link>
        </li>
        <li>
          <Link
            href="/profil"
            className={router.pathname == "/profil" ? "nav-active" : ""}
          >
            Profil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

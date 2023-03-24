import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
// import userMenu from "../components/UserMenu";
import UserDropdown from "../components/UserDropdown";

const index = ({ books }) => {
  const [data, setData] = useState([]);
  const dispach = useDispatch();
  const router = useRouter();

  //user menu

  const { user, logout } = useAuth();

  return (
    <div className="home">
      <div className="shape"></div>
      <header>
        <nav className="navbar">
          <div className="left">
            <div className="logo">
              B<span>i</span>blioLand
            </div>

            <div className="menu">
              <ul>
                <li>
                  <Link
                    href="/"
                    className={router.pathname == "/" ? "nav-active" : ""}
                  >
                    Acceuil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/books"
                    className={router.pathname == "/books" ? "nav-active" : ""}
                  >
                    Livres
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="right">
            {!user ? (
              <div className="sign">
                <ul>
                  <li>
                    <Link href="/login">Connexion</Link>
                  </li>

                  <li className="bar">|</li>

                  <li>
                    <Link href="/register" style={{ color: "gray" }}>
                      Inscription
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <UserDropdown user={user} />
            )}
          </div>
        </nav>
        <div className="welcome">
          <div className="left">
            <h1>
              Avec <span>BiblioLand</span> vivez plainement votre passion pour
              les livres
            </h1>
            <div className="button">
              <button>Decouvrez</button>
            </div>
          </div>
          <div className="right">
            <div className="content"></div>
          </div>
        </div>
      </header>
      <div className="infos">
        <div className="content">
          <div className="left"></div>
          <div className="right">
            <h3>Découvrez de nouveaux livres</h3>
            <p>
              Les utilisateurs pourront découvrir des livres qu'ils n'auraient
              peut-être jamais connus autrement en explorant les ajouts des
              autres utilisateurs.
            </p>
          </div>
        </div>
      </div>
      <div className="infos infos-2">
        <div className="content">
          <div className="right">
            <h3>Ayez une expérience de lecture plus riche</h3>
            <p>
              En lisant les commentaires et les critiques des autres
              utilisateurs, les lecteurs pourront avoir une expérience de
              lecture plus riche et plus éclairée.
            </p>
          </div>
          <div className="left"></div>
        </div>
      </div>
      <div className="new">
        <h3>Recemment Ajouté</h3>
        <div className="new-container"></div>
      </div>
    </div>
  );
};

export default index;

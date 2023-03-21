import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

import { FaSistrix } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Comments from "../components/Comments";

const books = () => {
  const [categorieFilter, setCategorieFilter] = useState("Tout");
  // const [showComment, setShowComment] = useState(true);
  const showComment = useSelector((state) => state.comment.commentReducer);

  const Categories = [
    "Tout",
    "Technologie",
    "Finance",
    "Histoire",
    "Sports",
    "Roman",
    "Cuisine",
    "Manga",
    "Science",
    "Entrepreneuriat",
    "Developpement personnel",
  ];

  return (
    <div className="books" id={showComment ? "ok" : ""}>
      <header>
        <nav className="navbar">
          <div className="logo">Logo</div>

          <div className="search">
            <span>
              <FaSistrix />
            </span>
            <input
              type="text"
              placeholder="Rechercher un livre ou un auteur "
            />
          </div>
          <div className="user">
            <ul>
              <Link href="/register">
                <li>inscription</li>
              </Link>
              <Link href="/login">
                <li>connexion</li>
              </Link>
            </ul>
          </div>
        </nav>
        <div className="categorie-filter">
          {Categories.map((el) => (
            <li key={el}>
              <input
                type="radio"
                name="filte-el"
                id={el}
                defaultChecked={el === categorieFilter}
              />

              <label
                htmlFor={el}
                onClick={() => {
                  setCategorieFilter(el);
                }}
              >
                {el}
              </label>
            </li>
          ))}
        </div>
      </header>
      <div className="main">
        {/* <div className="sidebar">
          <ul>
            <li>Acceuil</li>
            <li>Favoris</li>
          </ul>
          <div className="logout">deconnexion</div>
        </div> */}
        <div className="books-container">
          <div className="content">
            {showComment && <Comments showComment={showComment} />}
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default books;

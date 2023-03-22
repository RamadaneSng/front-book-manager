import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { FaSistrix } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Comments from "../components/Comments";
import useData from "../hooks/useData";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const books = () => {
  const [categorieFilter, setCategorieFilter] = useState("Tout");
  const showComment = useSelector((state) => state.comment.commentReducer);

  const Categories = [
    "Tout",
    "Technologie",
    "Informatique",
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
  const { books, isLoading } = useData();
  console.log(books);

  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:8000/api/book/getBooks",
  //   fetcher
  // );
  // if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
          <ul className="content">
            {showComment && <Comments />}
            {books.books.map((book) => (
              <Card key={book.id} book={book}></Card>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default books;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { BiCommentDetail } from "react-icons/bi";
import { setCommentSate } from "../features/comment.slice";
import { useDispatch } from "react-redux";
import { setBookId } from "../features/books.slice";
import useAuth from "../hooks/useAuth";
import axios from "../lib/axios";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Card = ({ book }) => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const handleClick = () => {
    dispatch(setCommentSate(true));
    dispatch(setBookId(book.id));
  };
  return (
    <li className="card">
      <div className="image">
        <Image
          loader={() => `http://localhost:8000/${book.pic}`}
          src={`http://localhost:8000/${book.pic}`}
          width={220}
          height={300}
          alt={"image de " + book.title}
        />
      </div>
      <div className="btn-container">
        {user && (
          <div className="btn">
            <BiCommentDetail onClick={() => handleClick()} />
          </div>
        )}
      </div>
      <div className="infos">
        <h3>{book.title}</h3>
        <span>({book.category})</span>
        <p>
          <span>{book.author}</span>
        </p>
      </div>
    </li>
  );
};

export default Card;

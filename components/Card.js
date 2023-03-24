import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { BiCommentDetail } from "react-icons/bi";
import { setCommentSate } from "../features/comment.slice";
import { useDispatch } from "react-redux";
import { setBookId } from "../features/books.slice";
import useAuth from "../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import axios from "../lib/axios";
import { useRouter } from "next/router";
import EditBook from "./dashboard/EditBook";
import { TextInput, Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import Delete from "./dashboard/Delete";

const Card = ({ book }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const titleInput = useRef();
  const categorieInput = useRef();
  const authorInput = useRef();

  const router = useRouter();
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
        <div className="left">
          <h3>{book.title}</h3>
          <span>({book.category})</span>
          <p>
            <span>{book.author}</span>
          </p>
        </div>
        {router.pathname == "/dashboard" && (
          <div className="edit-btn-container">
            <div className="edit-icon" onClick={() => setEdit(!edit)}>
              <FaRegEdit
                onClick={() => {
                  dispatch(setBookId(book.id));
                  modals.open({
                    children: (
                      <>
                        <EditBook />
                        <Button
                          className="edit-btn"
                          onClick={modals.closeAll}
                          mt="md"
                          style={{
                            background: "none",
                            width: "200px",
                            marginTop: "-20px",
                            display: "none",
                          }}
                        >
                          Editer
                        </Button>
                      </>
                    ),
                  });
                }}
              />
            </div>
            <Delete id={book.id} />
          </div>
        )}
      </div>
      {edit && <Group position="center" className="box"></Group>}
    </li>
  );
};

export default Card;

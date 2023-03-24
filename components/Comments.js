import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  bookFetch,
  setCommentData,
  setCommentSate,
} from "../features/comment.slice";
import { Rating, TextInput } from "@mantine/core";
import axios from "../lib/axios";
import useAuth from "../hooks/useAuth";
import { setBookId } from "../features/books.slice";
import Image from "next/image";
import EvalCard from "./EvalCard";

const Comments = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  // const [currentBook, setCurrentBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const bookId = useSelector((state) => state.book.bookId);
  const currentBook = useSelector((state) => state.comment.currentBook);
  console.log(currentBook);
  const comments = useSelector((state) => state.comment.comments);
  // console.log(comments[1].currentBook);
  // console.log(comments[1].data);

  let imgPic;
  // let currentBookUser;

  const { user } = useAuth();
  async function fetchBook() {
    await axios
      .get(`/api/book/getBook/${bookId}`)
      .then((res) => dispatch(setCommentData(res.data)));
    setIsLoading(false);
  }

  const totalRatings = () => {
    let som = 0;
    for (let i = 0; i < currentBook?.Evaluation?.length; i++) {
      som = som + currentBook.Evaluation[i].evaluation;
    }
    return som;
  };

  const ratingsSom = totalRatings();

  let totalRates = Math.ceil(ratingsSom / currentBook?.Evaluation?.length);

  useEffect(() => {
    // dispatch(bookFetch());
    fetchBook();
  }, [bookId, dispatch]);

  if (typeof currentBook !== "undefined" && currentBook.length > 0) {
    imgPic = currentBook.Book[0].pic;

    console.log(imgPic);
  }

  const data = {
    comment: comment,
    evaluation: value,
    user_id: user.user.id,
    book_id: bookId,
  };

  const postComment = async (e) => {
    e.preventDefault();
    dispatch(setBookId);

    try {
      const response = await axios
        .post("/api/add/comment", data)
        .then(() => dispatch(addComment({ data, currentBook })));

      setValue(0);
      setComment("");
      // await fetchBook();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="comment-box">
            <div className="header">
              <div className="left">
                Publié par <span>{currentBook.Book[0].user.name}</span>
              </div>
              <span
                className="btn"
                onClick={() => dispatch(setCommentSate(false))}
              >
                <RxCross1 />
              </span>
            </div>
            <div className="scroll">
              <div className="book-infos">
                <div className="pic">
                  <Image
                    loader={() =>
                      `http://localhost:8000/${currentBook.Book[0].pic}`
                    }
                    src={`http://localhost:8000/${currentBook.Book[0].pic}`}
                    width={500}
                    height={400}
                    alt={"image de "}
                  />
                </div>
                <div className="infos">
                  <div>
                    <h3>{currentBook.Book[0].title}</h3>
                    <h4>
                      categorie: <span>{currentBook.Book[0].category}</span>
                    </h4>
                    <h5>
                      Auteur: <span>{currentBook.Book[0].author}</span>{" "}
                    </h5>
                    <div className="note">
                      <Rating value={totalRates} fractions={2} readOnly />
                      <p>({currentBook?.Evaluation?.length}) notes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="users-comment">
                <ul>
                  {currentBook.Evaluation.map((userEval) => (
                    <EvalCard
                      // msg={userEval.data}
                      key={userEval.id}
                      userEval={userEval}
                      ratingsSom={ratingsSom}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <form onSubmit={postComment}>
                <div className="top">
                  <span className="user-pic">R</span>
                  <TextInput
                    placeholder="Ecrivez un commentaire..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="rating">
                  <Rating onChange={setValue} value={value} />
                </div>
                <button type="submit" style={{ display: "none" }}></button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;

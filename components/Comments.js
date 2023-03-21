import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setCommentSate } from "../features/comment.slice";

const Comments = ({ showComment }) => {
  const dispatch = useDispatch();
  return (
    <div className="comment">
      <div className="container">
        <div className="comment-box">
          <div className="top">
            <span
              className="btn"
              onClick={() => dispatch(setCommentSate(false))}
            >
              <RxCross1 />
            </span>
            publication de <span>user</span>
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

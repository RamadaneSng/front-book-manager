import React from "react";
import Image from "next/image";
import psycho from "../public/images/psychologie of money.jpg";
import { BiCommentDetail } from "react-icons/bi";
import { setCommentSate } from "../features/comment.slice";
import { useDispatch } from "react-redux";

const Card = () => {
  const dispatch = useDispatch();
  return (
    <li className="card">
      <div className="image">
        <Image src={psycho} width={220} height={300} />
      </div>
      <div className="btn-container">
        <div className="btn" onClick={() => dispatch(setCommentSate(true))}>
          <BiCommentDetail />
        </div>
      </div>
      <div className="infos">
        <h3>
          psychologie of money <span>( Finance) </span>
        </h3>
        <p>
          <span>Morgan Housel</span>
        </p>
      </div>
    </li>
  );
};

export default Card;

import React from "react";
import { Rating } from "@mantine/core";

const EvalCard = ({ userEval, msg }) => {
  const dateFormater = (date) => {
    let newDate = date.split("T");

    let [yy, mm, dd] = newDate[0].split("-");
    let hour = newDate[1].split(".")[0];

    let result = [[dd, mm, yy].join("-"), hour].join(" à ");

    return result;
  };

  return (
    <li className="eval-card">
      <div className="top">
        <div className="user-container">
          <div className="user-infos">
            <div>
              <span>{userEval.user.name[0]}</span>
              <p>{userEval.user.name}</p>
            </div>
            <div className="eval">
              <Rating value={userEval.evaluation} fractions={2} readOnly />
            </div>
          </div>
          <div className="message">{userEval.comment}</div>
        </div>
      </div>
      <div className="bottom">
        <p>
          publié le : <span>{dateFormater(userEval.created_at)}</span>{" "}
        </p>
      </div>
    </li>
  );
};

export default EvalCard;

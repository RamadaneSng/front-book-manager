import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useRef } from "react";
import { useSelector } from "react-redux";
import useData from "../../hooks/useData";

const Edit = () => {
  const bookId = useSelector((state) => state.book.bookId);

  const { books } = useData();

  const imageRef = useRef();

  const [infoLivre, setInfoLivre] = useState({
    title: "",
    author: "",
    category: "",
  });
  const categories = [
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

  const Handlechange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInfoLivre((infoLivre) => {
      return { ...infoLivre, [name]: value };
    });
  };

  const monLivre = () => {
    const filter = books.books?.filter((book) => book.id === bookId);
    return filter[0];
  };

  useEffect(() => {
    setInfoLivre(monLivre());
  });

  const editBook = async (e) => {
    e.preventDefault();
    // console.log("ok");
    const title = infoLivre.title;
    const author = infoLivre.author;
    const pic = imageRef.current.files[0];
    const category = infoLivre.category;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("pic", pic);
    formData.append("category", category);
    formData.append("_method", "PATCH");

    axios
      .post(`api/book/setBook/${bookId}`, formData)
      .then((res) => {
        // if (res.data.status == 200) {
        //   alert(res.data.message);
        // }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={editBook}>
        <input
          type="text"
          name="title"
          onChange={Handlechange}
          //   value={infoLivre?.title}
        />
        <input
          type="text"
          name="author"
          onChange={Handlechange}
          //   value={infoLivre?.author}
        />
        <select
          required
          name="category"
          //   value={infoLivre?.category}
          onChange={Handlechange}
        >
          {categories.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <input type="file" ref={imageRef} />
        <button type="submit" onClick={editBook}>
          ok
        </button>
      </form>
    </div>
  );
};

export default Edit;

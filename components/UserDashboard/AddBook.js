import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
// import { addBooks } from "../features/books.slice";

const AddBook = () => {
  const titreRef = useRef();
  const auteurRef = useRef();
  const categorieRef = useRef();
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titre = titreRef.current.value;
    const author = auteurRef.current.value;
    const pic = imageRef.current.files[0];
    const category = categorieRef.current.value;

    const dispatch = useDispatch();

    const formData = new FormData();
    formData.append("title", titre);
    formData.append("author", author);
    formData.append("pic", pic);
    formData.append("category", category);
    formData.append("user_id", 1);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/book/postBook",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-book">
      <h3>Ajouter un livre</h3>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Titre" ref={titreRef} />
        <input type="text" placeholder="Auteur" ref={auteurRef} />
        <input type="text" placeholder="Categorie" ref={categorieRef} />
        <input type="file" placeholder="image" ref={imageRef} />
        <input type="submit" value="envoyer" />
      </form>
    </div>
  );
};

export default AddBook;

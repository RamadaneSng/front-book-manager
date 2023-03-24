import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useRef } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";
import { FcAddImage } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { modals } from "@mantine/modals";
import { constants } from "buffer";
// import { useSelector } from "react-redux";
import { useInputState } from "@mantine/hooks";
import useData from "../../hooks/useData";
import { notifications } from "@mantine/notifications";

const EditBook = () => {
  const bookId = useSelector((state) => state.book.bookId);

  const titreRef = useRef();
  const auteurRef = useRef();
  const categorieRef = useRef();
  const imageRef = useRef();

  const [infoLivre, setInfoLivre] = useState({
    title: "",
    author: "",
    category: "",
  });

  const categories = [
    "selectionner la categorie",
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

  const { user } = useAuth();

  const { books } = useData();

  // console.log(books);

  const monLivre = () => {
    const filter = books.books?.filter((book) => book.id === bookId);
    return filter[0];
  };

  // console.log(infoLivre);

  useEffect(() => {
    setInfoLivre(monLivre());
  });

  const editBook = async (e) => {
    e.preventDefault();
    // console.log("ok");

    const titre = titreRef.current.value;
    const author = auteurRef.current.value;
    const pic = imageRef.current.files[0];
    const category = categorieRef.current.value;

    const formData = new FormData();
    formData.append("title", titre);
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
        modals.closeAll();
        console.log(res);
        if (response.data.status === 200) {
          notifications.show({
            title: "Livre Edité avec succes !",
            message: "Vous pouvez voir votre livre dans la section mes livres",
          });
        } else {
          notifications.show({
            title: "Oups ",
            message: "Veuillez remplir tous les champs! ",
          });
        }
      })
      .catch((err) => console.log(err));
    notifications.show({
      title: "Livre edité avec succes",
      message: "Vous pouvez voir votre livre dans la section mes livres",
    });
  };

  return (
    <div className="edit-book">
      <form onSubmit={editBook} method="post" encType="multipart/form-data">
        <div className="form-item">
          <input
            type="text"
            name="title"
            placeholder="Entrez le titre du livre"
            ref={titreRef}
            defaultValue={infoLivre?.title}
            required
          />
        </div>

        <div className="form-item">
          <input
            placeholder="Entrez l'auteur du livre"
            // label="Auteur du livre"
            name="author"
            ref={auteurRef}
            type="text"
            defaultValue={infoLivre?.author}
            required
          />
        </div>
        <div className="form-item">
          <select
            required
            name="category"
            defaultValue={infoLivre?.category}
            ref={categorieRef}
          >
            {categories.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          {/* <Group position="center">
            <FileButton
              required
              style={{ width: "100%", background: "#293494" }}
              ref={imageRef}
              accept="image/png,image/jpeg,image/jpg"
            >
              {(props) => (
                <Button {...props}>
                  <FcAddImage
                    style={{ fontSize: "22px", marginRight: "5px" }}
                  />
                  Ajouter une cover
                </Button>
              )}
            </FileButton>
          </Group> */}
          <input
            type="file"
            id="file"
            required
            ref={imageRef}
            accept="image/png,image/jpeg,image/jpg"
          />
          <label htmlFor="file">
            <FcAddImage style={{ fontSize: "22px", marginRight: "5px" }} />
            Ajouter une cover
          </label>
        </div>

        <button type="submit" onClick={() => modals.closeAll()}>
          Editer le livre
        </button>
      </form>
    </div>
  );
};

export default EditBook;

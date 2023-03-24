import React, { useState } from "react";
import axios from "../../lib/axios";
import { useRef } from "react";
import { notifications } from "@mantine/notifications";
import {
  TextInput,
  Select,
  FileButton,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { FcAddImage } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";

const AddBooks = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");

  const titreRef = useRef();
  const auteurRef = useRef();
  const categorieRef = useRef();
  const imageRef = useRef();
  const formRef = useRef();

  const { user } = useAuth();

  const addBook = async (e) => {
    e.preventDefault();
    const titre = titreRef.current.value;
    const author = auteurRef.current.value;
    const pic = imageRef.current.files[0];
    const category = categorieRef.current.value;

    // const dispatch = useDispatch();

    const formData = new FormData();
    formData.append("title", titre);
    formData.append("author", author);
    formData.append("pic", pic);
    formData.append("category", category);
    formData.append("user_id", user.user.id);

    try {
      const response = await axios.post("/api/book/postBook", formData);

      console.log(response.data);

      if (response.data.status === 200) {
        notifications.show({
          title: "Livre ajouter avec succes !",
          message: "Vous pouvez voir votre livre dans la section mes livres",
        });
        formRef.current.reset();
      } else {
        notifications.show({
          title: "Oups ",
          message: "Veuillez remplir tous les champs! ",
        });
      }
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
    setFile("");
    formRef.current.reset();
  };

  return (
    <div className="add-book">
      <h2>Ajouter un livre</h2>

      <form onSubmit={addBook} ref={formRef}>
        <div className="form-item">
          <TextInput
            required
            placeholder="Entrez le titre du livre"
            label="Titre du livre"
            ref={titreRef}
          />
        </div>
        <div className="form-item">
          <TextInput
            required
            placeholder="Entrez l'auteur du livre"
            label="Auteur du livre"
            ref={auteurRef}
          />
        </div>
        <div className="form-item">
          <Select
            required
            label="Categorie du livre"
            placeholder="Choisissez une categorie"
            data={[
              { value: "Technologie", label: "Technologie" },
              { value: "Finance", label: "Finance" },
              { value: "Sports", label: "Sports" },
              { value: "Histoire", label: "Histoire" },
              { value: "Roman", label: "Roman" },
              { value: "Cuisine", label: "Cuisine" },
              { value: "Manga", label: "Manga" },
              { value: "Science", label: "Science" },
              { value: "Entrepreneuriat", label: "Entrepreneuriat" },
              {
                value: "Developpement personnel",
                label: "Developpement personnel",
              },
            ]}
            ref={categorieRef}
          />
        </div>
        <div className="form-item">
          <Group position="center">
            <FileButton
              required
              style={{ width: "100%", background: "#293494" }}
              onChange={setFile}
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
          </Group>
        </div>

        {file && (
          <Text size="sm" align="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )}
        <div className="form-item">
          <Button type="submit" style={{ background: "#FCA72C" }}>
            Ajouter le livre
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;

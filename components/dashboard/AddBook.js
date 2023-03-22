import React, { useState } from "react";
import axios from "../../lib/axios";
import { useRef } from "react";
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
  const [data, setData] = useState([]);

  const titreRef = useRef();
  const auteurRef = useRef();
  const categorieRef = useRef();
  const imageRef = useRef();

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-book">
      <h2>Ajouter un livre</h2>

      <form onSubmit={addBook}>
        <div className="form-item">
          <TextInput
            placeholder="Entrez le titre du livre"
            label="Titre du livre"
            ref={titreRef}
          />
        </div>
        <div className="form-item">
          <TextInput
            placeholder="Entrez l'auteur du livre"
            label="Auteur du livre"
            ref={auteurRef}
          />
        </div>
        <div className="form-item">
          <Select
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

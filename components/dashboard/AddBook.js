import React, { useState } from "react";
import {
  TextInput,
  Select,
  FileButton,
  SelectFileButton,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { FcAddImage } from "react-icons/fc";
import { MdOutlineSaveAlt } from "react-icons/md";

const AddBooks = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="add-book">
      <h2>Ajouter un livre</h2>

      <form>
        <div className="form-item">
          <TextInput
            placeholder="Entrez le titre du livre"
            label="Titre du livre"
          />
        </div>
        <div className="form-item">
          <TextInput
            placeholder="Entrez l'auteur du livre"
            label="Auteur du livre"
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
          />
        </div>
        <div className="form-item">
          <Group position="center">
            <FileButton
              style={{ width: "100%", background: "#293494" }}
              onChange={setFile}
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

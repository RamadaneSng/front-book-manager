// import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Layout from "../components/Layout";
// import { setLogin } from "../features/login.slice";
import { TextInput, PasswordInput, Group, Button } from "@mantine/core";
import { Form, useForm, hasLength, isEmail, isNotEmpty } from "@mantine/form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
// import { Value } from "sass";

const register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: hasLength(
        { min: 2, max: 20 },
        "le nom doit être en 2 et 20 caractères"
      ),
      email: isEmail("Adresse email invalide"),
      password: isNotEmpty("Choisissez un mot de passe "),
      confirmPassword: (value, values) =>
        value !== values.password
          ? "les mots de passe ne correspondent pas"
          : null,
    },
  });

  // auth hook
  //auth Hook
  const { register, isLoading, user } = useAuth({ middleware: "guest" });

  if (isLoading || user) {
    return <>loading ...</>;
  }

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password, setErrors });
  };

  return (
    <div className="login">
      {/* <h2>Creez un compte</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <TextInput
            placeholder="Votre nom"
            label="Nom"
            onChange={(e) => setName(e.target.value)}
            // {...form.getInputProps("name")}
          />
        </div>
        <div className="form-item">
          <TextInput
            label="Email"
            placeholder="votre email"
            mt="md"
            onChange={(e) => setEmail(e.target.value)}
            // {...form.getInputProps("email")}
          />
        </div>
        <div className="login-form-item">
          <PasswordInput
            style={{ marginTop: "16px" }}
            label="Mot de passe"
            placeholder="Mot de passe"
            // {...form.getInputProps("password")}
          />
        </div>
        <div className="login-form-item">
          <PasswordInput
            mt="sm"
            label="Comfirmer le mot de passe"
            placeholder="Comfirmer le mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            // {...form.getInputProps("confirmPassword")}
          />
        </div>
        <div className="login-form-item">
          <Group position="right" mt="md">
            <Button type="submit" style={{ background: "#293494" }}>
              Inscription
            </Button>
          </Group>
        </div>
      </form>
      <p>
        Vous avez déjà un compte ? <Link href="/login">Connexion</Link>
      </p>
    </div>
  );
};

export default register;

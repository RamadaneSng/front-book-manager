import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
// import { setLogin } from "../features/login.slice";
import { TextInput, PasswordInput, Group, Button } from "@mantine/core";
import {
  Form,
  useForm,
  hasLength,
  isEmail,
  isNotEmpty,
  FormErrors,
} from "@mantine/form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
// import { Value } from "sass";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Adresse email invalide"),
    },
  });

  //auth Hook
  const { login, isLoading, user } = useAuth({ middleware: "guest" });

  if (isLoading || user) {
    return <>loading ...</>;
  }

  //submit form
  const handleLogin = async (e) => {
    e.preventDefault();
    // form.validate();

    login({ email, password, setErrors });
  };
  // console.log(form.onSubmit);

  return (
    <div className="login">
      {/* <h2>Creez un compte</h2> */}
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="form-item">
          <TextInput
            label="Email"
            placeholder="votre email"
            mt="md"
            onChange={(e) => setEmail(e.target.value)}
            {...form.getInputProps("email")}
          />
        </div>
        <div className="login-form-item">
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "16px" }}
            label="Mot de passe"
            placeholder="Mot de passe"
            {...form.getInputProps("password")}
          />
        </div>

        <div className="login-form-item">
          <Group position="right" mt="md">
            <Button type="submit" style={{ background: "#293494" }}>
              Connexion
            </Button>
          </Group>
        </div>
      </form>
      <p>
        pas encore de compte ? <Link href="/register">Inscription</Link>
      </p>
    </div>
  );
};

export default login;

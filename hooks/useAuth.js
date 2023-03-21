import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

export const useAuth = ({ middleware, redirectIfAuth } = {}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios.get("/api/user").then((response) => response.data)
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, ...props }) => {
    setErrors([]);

    await csrf();

    axios
      .post("/api/login", props)
      .then(() => mutate() && router.push("/"))
      .catch((error) => {
        if (error.response.status != 422) throw error;

        // setErrors(Object.values(error.response.data.errors).flat());
        console.log(error.response.data.errors);
      });
  };

  const logout = async () => {
    await axios.post("/api/logout");

    mutate(null);

    router.push("/login");
  };

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware == "guest" && user) router.push("/");
    if (middleware == "auth" && !user && error) logout();
  });

  return {
    user,
    csrf,
    login,
    logout,
    isLoading,
  };
};

export default useAuth;

import axios from "../lib/axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = ({ middleware }) => {
  const router = useRouter();
  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // User
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/user", () => {
    axios
      .get("/user")
      .then((response) => response.data.data)
      .catch((error) => {
        if (error.response.status !== 409) throw err;
      });
  });

  // CSRF
  const csrf = () => axios.get("sanctum/csrf-cookie");

  // Login
  const login = async ({ setErrors, ...props }) => {
    setErrors([]);

    await csrf();
    axios
      .post("/login", props)
      .then(() => mutate() && router.push("/"))
      .catch((error) => {
        if (error.response.status != 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  // logout
  const logout = async () => {
    await axios.post("/logout");

    mutate(null);

    router.push("/");
  };

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);

      if (middleware == "guest" && user) router.push("/");
      if (middleware == "auth" && error) router.push("/profil");
    }
  });

  return {
    user,
    csrf,
    isLoading,
    login,
    register,
    logout,
  };
};

import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "../lib/axios";

export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: books,
    error,
    mutate,
  } = useSWR("/api/book/getBooks", () =>
    axios.get("/api/book/getBooks").then((response) => response.data)
  );

  useEffect(() => {
    if (books || error) {
      setIsLoading(false);
    }
  }, [books, error]);

  return {
    books,
    isLoading,
  };
};

export default useData;

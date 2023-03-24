import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { setCommentData } from "../features/comment.slice";
import axios from "../lib/axios";

export const useData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: books,
    error,
    mutate,
  } = useSWR("/api/book/getBooks", () =>
    axios.get("/api/book/getBooks").then((response) => response.data)
  );

  const { data: evaluations } = useSWR("/api/get/comments", () =>
    axios.get("/api/get/comments").then((response) => {
      dispatch(setCommentData(response.data.evaluations));
    })
  );

  useEffect(() => {
    if (books || error || evaluations) {
      setIsLoading(false);
    }
  }, [books, error]);

  return {
    books,
    evaluations,
    isLoading,
  };
};

export default useData;

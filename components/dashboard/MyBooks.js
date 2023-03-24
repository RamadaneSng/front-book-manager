import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";
import Comments from "../Comments";
import Card from "../Card";
import { useEffect } from "react";
import books from "../../pages/books";
import { addBook, setBook } from "../../features/books.slice";

const MyBooks = () => {
  const showComment = useSelector((state) => state.comment.commentReducer);
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();

  const { books } = useData();
  // useEffect(() => {
  //   dispatch(setBook(books));
  // }, [dispatch]);

  // console.log(books);

  let myBooks = [];

  if (typeof books !== "undefined" && books.books.length > 0 && user.user.id) {
    myBooks = books.books.filter((book) => book.user_id === user.user.id);
  }

  return (
    <div className="my-books">
      <h2>Mes livres</h2>
      <div className="books-container">
        <ul className="my-book-content">
          {showComment && <Comments />}
          {myBooks.map((book) => (
            <Card key={book.id} book={book}></Card>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyBooks;

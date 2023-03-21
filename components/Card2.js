<li className="card">
  <div className="image">
    <Image
      loader={() => `http://localhost:8000/${book.pic}`}
      src={`http://localhost:8000/${book.pic}`}
      width={250}
      height={250}
    />
  </div>
  <div className="infos">
    <h3>{book.title}</h3>
    <p className="category">
      {" "}
      <span>categorie :</span>
      {book.category}
    </p>
    <p>
      <span>auteur:</span>
      {book.author}
    </p>
  </div>
</li>;

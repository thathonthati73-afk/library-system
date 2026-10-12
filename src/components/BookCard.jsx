function BookCard({ book }) {
  const isLow = book.quantity < 2;

  return (
    <div className={isLow ? "card low" : "card"}>
      <h3>{book.title}</h3>
      <p>{book.author} - {book.genre}</p>
      <p>ISBN: {book.isbn}</p>
      <p><b>In stock: {book.quantity}</b></p>
      {isLow && <p className="error">Low stock!</p>}
    </div>
  );
}

export default BookCard;

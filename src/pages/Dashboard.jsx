import BookCard from "../components/BookCard";

function Dashboard({ books }) {
  const lowStock = books.filter((b) => b.quantity < 2).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total books: {books.length} | Low stock: {lowStock}</p>
      {books.length === 0 && <p>No books yet. Add some on the Books page.</p>}
      <div className="cards">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

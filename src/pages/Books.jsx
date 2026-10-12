import { useState } from "react";
import BookForm from "../components/BookForm";

function Books({ books, setBooks }) {
  const [editingId, setEditingId] = useState(null);

  function addBook(newBook) {
    if (books.some((b) => b.isbn === newBook.isbn)) {
      return "A book with this ISBN already exists";
    }
    setBooks([...books, { ...newBook, id: Date.now() }]);
    return "";
  }

  function updateBook(updated) {
    if (books.some((b) => b.isbn === updated.isbn && b.id !== editingId)) {
      return "A book with this ISBN already exists";
    }
    setBooks(books.map((b) => (b.id === editingId ? { ...updated, id: editingId } : b)));
    setEditingId(null);
    return "";
  }

  function deleteBook(id) {
    if (window.confirm("Delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  }

  return (
    <div>
      <h2>Book Management</h2>
      <h3>Add new book</h3>
      <BookForm onSave={addBook} buttonText="Add Book" />

      <h3>All books</h3>
      {books.length === 0 && <p>No books yet.</p>}
      {books.map((book) =>
        editingId === book.id ? (
          <div className="card" key={book.id}>
            <BookForm
              initialBook={book}
              onSave={updateBook}
              buttonText="Save"
              onCancel={() => setEditingId(null)}
            />
          </div>
        ) : (
          <div className="card row" key={book.id}>
            <div>
              <b>{book.title}</b> by {book.author}
              <br />
              {book.genre} | ISBN {book.isbn} | Qty {book.quantity}
            </div>
            <div>
              <button onClick={() => setEditingId(book.id)}>Update</button>
              <button className="danger" onClick={() => deleteBook(book.id)}>Delete</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Books;

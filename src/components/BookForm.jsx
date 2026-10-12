import { useState } from "react";

const emptyBook = { title: "", author: "", genre: "", isbn: "", quantity: "" };

// used for adding a book and for updating a book
function BookForm({ initialBook, onSave, buttonText, onCancel }) {
  const [book, setBook] = useState(initialBook || emptyBook);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (book.title.trim() === "") newErrors.title = "Title is required";
    if (book.author.trim() === "") newErrors.author = "Author is required";
    if (book.genre.trim() === "") newErrors.genre = "Genre is required";
    if (book.isbn.trim() === "") newErrors.isbn = "ISBN is required";
    if (book.quantity === "" || Number(book.quantity) < 0) {
      newErrors.quantity = "Quantity must be 0 or more";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const error = onSave({ ...book, quantity: Number(book.quantity) });
    if (error) {
      setErrors({ isbn: error });
      return;
    }
    if (!initialBook) setBook(emptyBook); // clear the form after adding
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
      {errors.title && <p className="error">{errors.title}</p>}
      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
      {errors.author && <p className="error">{errors.author}</p>}
      <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />
      {errors.genre && <p className="error">{errors.genre}</p>}
      <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
      {errors.isbn && <p className="error">{errors.isbn}</p>}
      <input name="quantity" type="number" placeholder="Quantity" value={book.quantity} onChange={handleChange} />
      {errors.quantity && <p className="error">{errors.quantity}</p>}
      <div>
        <button type="submit">{buttonText}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default BookForm;

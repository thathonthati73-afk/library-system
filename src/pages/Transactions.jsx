import { useState } from "react";

function Transactions({ books, transactions, onTransaction }) {
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleClick(type) {
    if (quantity < 1) {
      setMessage("Quantity must be at least 1");
      return;
    }
    const error = onTransaction(Number(bookId), type, Number(quantity));
    setMessage(error || "Transaction saved");
  }

  return (
    <div>
      <h2>Transactions</h2>
      <div className="form">
        <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
          <option value="">-- choose a book --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} (stock: {b.quantity})
            </option>
          ))}
        </select>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <div>
          <button onClick={() => handleClick("add")}>Add stock</button>
          <button className="danger" onClick={() => handleClick("borrow")}>Borrow (deduct)</button>
        </div>
        {message && <p>{message}</p>}
      </div>

      <h3>History</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Book</th><th>Type</th><th>Qty</th><th>By</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.bookTitle}</td>
                <td>{t.type === "add" ? "Stock added" : "Borrowed"}</td>
                <td>{t.quantity}</td>
                <td>{t.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && <p>No transactions yet.</p>}
    </div>
  );
}

export default Transactions;

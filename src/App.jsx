import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

function App() {
  const [books, setBooks] = useLocalStorage("books", []);
  const [users, setUsers] = useLocalStorage("users", [
    { id: 1, name: "Nthati", membershipId: "LIB001", role: "admin" },
  ]);
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  // add or deduct stock and save it in the history
  // returns an error message or empty string if ok
  function makeTransaction(bookId, type, quantity) {
    const book = books.find((b) => b.id === bookId);
    if (!book) return "Please choose a book";
    if (type === "borrow" && book.quantity < quantity) {
      return "Not enough copies in stock";
    }

    const change = type === "borrow" ? -quantity : quantity;
    setBooks(
      books.map((b) =>
        b.id === bookId ? { ...b, quantity: b.quantity + change } : b
      )
    );
    setTransactions([
      {
        id: Date.now(),
        bookTitle: book.title,
        type: type,
        quantity: quantity,
        by: currentUser.name,
        date: new Date().toLocaleString(),
      },
      ...transactions,
    ]);
    return "";
  }

  if (!currentUser) {
    return <Login users={users} onLogin={setCurrentUser} />;
  }

  return (
    <div>
      <Navbar user={currentUser} onLogout={() => setCurrentUser(null)} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard books={books} />} />
          <Route
            path="/books"
            element={<Books books={books} setBooks={setBooks} />}
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                transactions={transactions}
                onTransaction={makeTransaction}
              />
            }
          />
          <Route
            path="/users"
            element={
              <Users
                users={users}
                setUsers={setUsers}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

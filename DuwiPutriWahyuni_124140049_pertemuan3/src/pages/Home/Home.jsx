import { useEffect, useState } from 'react';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

export default function Home() {
  const { books, filteredBooks, statusFilter, query, setStatusFilter, setQuery, addBook, updateBook, deleteBook } =
    useBooks();
  const [editingBook, setEditingBook] = useState(null);

  // Judul tab browser mengikuti jumlah buku
  useEffect(() => {
    document.title = `Rak Buku (${books.length})`;
  }, [books.length]);

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (book) => {
    if (window.confirm(`Hapus "${book.title}" dari rak?`)) {
      deleteBook(book.id);
      if (editingBook?.id === book.id) setEditingBook(null);
    }
  };

  return (
    <div className="home">
      <section className="home__panel">
        <BookForm bookToEdit={editingBook} onSubmit={handleSubmit} onCancel={() => setEditingBook(null)} />
      </section>

      <section className="home__shelf" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading">
          Koleksi saya <span className="home__count">{filteredBooks.length} dari {books.length} buku</span>
        </h2>
        <BookFilter
          status={statusFilter}
          query={query}
          onStatusChange={setStatusFilter}
          onQueryChange={setQuery}
        />
        <BookList books={filteredBooks} totalCount={books.length} onEdit={setEditingBook} onDelete={handleDelete} />
      </section>
    </div>
  );
}

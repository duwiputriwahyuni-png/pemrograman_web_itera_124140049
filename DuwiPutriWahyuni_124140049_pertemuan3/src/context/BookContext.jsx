import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../constants/books';

const BookContext = createContext(null);

const createId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/**
 * Provider global: menyimpan daftar buku (persisten di localStorage),
 * filter status, kata kunci pencarian, serta fungsi CRUD.
 */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, []);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [query, setQuery] = useState('');

  const addBook = useCallback(
    ({ title, author, status }) => {
      const newBook = { id: createId(), title: title.trim(), author: author.trim(), status };
      setBooks((prev) => [newBook, ...prev]);
    },
    [setBooks]
  );

  const updateBook = useCallback(
    (id, { title, author, status }) => {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, title: title.trim(), author: author.trim(), status } : book
        )
      );
    },
    [setBooks]
  );

  const deleteBook = useCallback(
    (id) => setBooks((prev) => prev.filter((book) => book.id !== id)),
    [setBooks]
  );

  // Filter status + pencarian judul/penulis (tidak sensitif huruf besar-kecil)
  const filteredBooks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
      const matchQuery =
        !keyword ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);
      return matchStatus && matchQuery;
    });
  }, [books, statusFilter, query]);

  const value = useMemo(
    () => ({
      books,
      filteredBooks,
      statusFilter,
      query,
      setStatusFilter,
      setQuery,
      addBook,
      updateBook,
      deleteBook,
    }),
    [books, filteredBooks, statusFilter, query, addBook, updateBook, deleteBook]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook akses context dengan pengaman jika dipakai di luar provider
// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks harus dipakai di dalam <BookProvider>');
  return context;
}

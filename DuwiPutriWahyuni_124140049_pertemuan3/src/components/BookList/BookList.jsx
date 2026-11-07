import PropTypes from 'prop-types';
import { bookShape } from '../../constants/books';
import BookItem from './BookItem';
import './BookList.css';

/** Daftar buku, lengkap dengan pesan untuk rak kosong dan hasil filter kosong. */
export default function BookList({ books, totalCount, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="book-list__empty">
        {totalCount === 0
          ? 'Rak masih kosong. Tambahkan buku pertama Anda lewat form di atas.'
          : 'Tidak ada buku yang cocok dengan filter atau pencarian.'}
      </p>
    );
  }

  return (
    <ul className="book-list" aria-label="Daftar buku">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  totalCount: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

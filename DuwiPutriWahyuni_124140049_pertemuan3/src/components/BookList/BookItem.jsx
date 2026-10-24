import PropTypes from 'prop-types';
import { bookShape, getStatusLabel } from '../../constants/books';

/** Satu baris buku: info, label status, tombol aksi. */
export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item" data-status={book.status}>
      <div className="book-item__info">
        <h3 className="book-item__title">{book.title}</h3>
        <p className="book-item__author">{book.author}</p>
      </div>
      <span className={`status-badge status-badge--${book.status}`}>{getStatusLabel(book.status)}</span>
      <div className="book-item__actions">
        <button type="button" className="btn btn--ghost" aria-label={`Edit ${book.title}`} onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" aria-label={`Hapus ${book.title}`} onClick={() => onDelete(book)}>
          Hapus
        </button>
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

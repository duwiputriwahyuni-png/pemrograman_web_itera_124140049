import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants/books';
import './BookFilter.css';

const FILTERS = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS];

/** Filter status + kotak pencarian judul / penulis. */
export default function BookFilter({ status, query, onStatusChange, onQueryChange }) {
  return (
    <div className="book-filter">
      <div className="book-filter__status" role="group" aria-label="Filter status buku">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`chip ${status === filter.value ? 'chip--active' : ''}`}
            aria-pressed={status === filter.value}
            onClick={() => onStatusChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="book-filter__search">
        <label htmlFor="book-search">Cari judul atau penulis</label>
        <input
          id="book-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ketik untuk mencari…"
        />
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

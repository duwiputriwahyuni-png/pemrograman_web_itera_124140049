import { STATUS_OPTIONS } from '../../constants/books';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

export default function Stats() {
  const { books } = useBooks();
  const { total, count, percent, uniqueAuthors } = useBookStats(books);

  return (
    <div className="stats">
      <h1>Statistik koleksi</h1>

      <dl className="stats__summary">
        <div>
          <dt>Total buku</dt>
          <dd data-testid="stat-total">{total}</dd>
        </div>
        <div>
          <dt>Penulis berbeda</dt>
          <dd data-testid="stat-authors">{uniqueAuthors}</dd>
        </div>
      </dl>

      {total === 0 ? (
        <p className="stats__empty">Belum ada data. Tambahkan buku di halaman Beranda.</p>
      ) : (
        <ul className="stats__bars" aria-label="Sebaran status buku">
          {STATUS_OPTIONS.map((option) => (
            <li key={option.value}>
              <div className="stats__bar-label">
                <span>{option.label}</span>
                <span data-testid={`stat-${option.value}`}>
                  {count[option.value]} ({percent[option.value]}%)
                </span>
              </div>
              <div className="stats__track">
                <div className={`stats__fill stats__fill--${option.value}`} style={{ width: `${percent[option.value]}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

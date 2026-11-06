import { useMemo } from 'react';
import { STATUS_OPTIONS } from '../constants/books';

/**
 * Custom hook #2: menghitung statistik dari daftar buku.
 * Hasil di-memoize supaya hanya dihitung ulang saat `books` berubah.
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const count = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, 0]));

    books.forEach((book) => {
      if (book.status in count) count[book.status] += 1;
    });

    const percent = Object.fromEntries(
      STATUS_OPTIONS.map((o) => [o.value, total === 0 ? 0 : Math.round((count[o.value] / total) * 100)])
    );

    const uniqueAuthors = new Set(books.map((b) => b.author.trim().toLowerCase())).size;

    return { total, count, percent, uniqueAuthors };
  }, [books]);
}

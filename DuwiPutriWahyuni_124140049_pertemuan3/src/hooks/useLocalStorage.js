import { useEffect, useState } from 'react';

/**
 * Custom hook #1: state yang otomatis tersimpan di localStorage.
 * - Nilai awal dibaca dari localStorage (jika ada dan valid).
 * - Setiap nilai berubah, useEffect menyimpannya kembali.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      // Data rusak atau localStorage tidak tersedia: pakai nilai awal
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Abaikan error penyimpanan (misalnya kuota penuh)
    }
  }, [key, value]);

  return [value, setValue];
}

import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// Bersihkan localStorage setelah setiap test agar antar test tidak saling memengaruhi
afterEach(() => {
  window.localStorage.clear();
});

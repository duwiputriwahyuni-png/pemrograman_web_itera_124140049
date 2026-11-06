# Rak Buku: Aplikasi Manajemen Buku Pribadi

Tugas Praktikum Pengembangan Aplikasi Web, Pertemuan 3 (React Basics), Teknik Informatika ITERA.

- Nama: Duwi Putri Wahyuni
- NIM: 124140049
- Kelas: RA

## Deskripsi

Rak Buku adalah aplikasi web untuk mencatat buku pribadi. Setiap buku punya judul, penulis, dan status:
**Dimiliki** (milik), **Sedang dibaca** (baca), atau **Ingin dibeli** (beli). Data tersimpan di `localStorage`, jadi tetap ada setelah halaman ditutup.

Fitur utama:

- Tambah, edit, dan hapus buku
- Filter berdasarkan status
- Pencarian berdasarkan judul atau nama penulis
- Halaman statistik koleksi (total buku, penulis berbeda, sebaran status)
- Validasi form: kolom judul dan penulis wajib diisi, dengan umpan balik visual (border merah dan pesan error)

## Instalasi dan Menjalankan

Prasyarat: Node.js 18 atau lebih baru.

```bash
cd DuwiPutriWahyuni_124140049_pertemuan3
npm install
npm run dev        # jalankan aplikasi di http://localhost:5173
npm run test:run   # jalankan seluruh unit test sekali
npm run build      # build produksi
```

## Screenshot

| Beranda | Statistik |
| --- | --- |
| ![Beranda](docs/screenshots/beranda.png) | ![Statistik](docs/screenshots/statistik.png) |

## Fitur React yang Digunakan

| Konsep | Lokasi | Penjelasan |
| --- | --- | --- |
| `useState` | `BookForm`, `Home`, `BookContext` | Menyimpan isi form, error, buku yang sedang diedit, filter, dan kata kunci pencarian |
| `useEffect` | `useLocalStorage`, `BookForm`, `Home` | Menyimpan data ke localStorage, mengisi form saat mode edit, dan memperbarui judul tab |
| `useMemo`, `useCallback` | `BookContext`, `useBookStats` | Menghindari hitung ulang daftar terfilter, statistik, dan nilai context |
| `useRef` | `BookForm` | Memindahkan fokus ke form saat tombol Edit ditekan |
| Context API | `src/context/BookContext.jsx` | State global buku, filter, dan fungsi CRUD yang dipakai halaman Beranda dan Statistik |
| React Router | `App.jsx`, `Navbar` | Rute `/` (Beranda), `/statistik`, dan halaman 404 |
| Custom hook | `useLocalStorage`, `useBookStats` | State yang persisten dan perhitungan statistik |
| PropTypes | Semua komponen yang menerima props | Type checking props |
| Komponen reusable | `BookForm`, `BookFilter`, `BookList`/`BookItem`, `Navbar` | Dipakai ulang dan dikontrol lewat props |

## Struktur Folder

```
src/
├── components/
│   ├── BookForm/      (form tambah dan edit + validasi)
│   ├── BookFilter/    (filter status + pencarian)
│   ├── BookList/      (BookList + BookItem)
│   └── Navbar/
├── pages/
│   ├── Home/
│   └── Stats/
├── hooks/             (useLocalStorage.js, useBookStats.js)
├── context/           (BookContext.jsx)
├── constants/         (daftar status, kunci storage, PropTypes buku)
├── tests/             (unit dan integrasi test)
├── App.jsx
└── main.jsx
```

## Pengujian

Menggunakan Vitest dan React Testing Library, dengan 23 test:

- `BookForm.test.jsx`: validasi kolom kosong, spasi saja, data valid, error hilang saat mengetik, mode edit
- `hooks.test.jsx`: `useLocalStorage` dan `useBookStats` (termasuk data rusak dan daftar kosong)
- `BookFilterList.test.jsx`: filter, pencarian, pesan daftar kosong, callback edit dan hapus
- `App.test.jsx`: alur tambah, filter, cari, edit, hapus, persistensi localStorage, statistik, dan navigasi

Laporan testing: screenshot hasil `npm run test:run` ada di `docs/screenshots/test.png`.

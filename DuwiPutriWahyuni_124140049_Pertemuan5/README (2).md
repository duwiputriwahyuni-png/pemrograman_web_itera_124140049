# Tugas Pertemuan 5 - Sistem Manajemen Perpustakaan (Python OOP)

## Identitas Mahasiswa
- **Nama Lengkap** : [ISI NAMA LENGKAP]
- **NIM**          : [ISI NIM]
- **Kelas Praktikum** : [RA / RB]

## Deskripsi Program
Program ini adalah sistem perpustakaan sederhana. Alurnya: `main.py` membuat objek `Library`, menambahkan beberapa `Book` dan `Magazine`, menampilkan katalog tersedia, mencari item (berdasarkan judul/ID), lalu seorang `Member` meminjam dan mengembalikan item (dengan perhitungan denda).

Penerapan 4 pilar OOP:
1. **Class & Object** - `LibraryItem`, `Book`, `Magazine`, `Library`, dan `Member` masing-masing membungkus data dan perilakunya.
2. **Inheritance** - `Book` dan `Magazine` mewarisi abstract class `LibraryItem(ABC)` dan memakai `super().__init__()`. Abstract method `get_tipe()`, `get_detail()`, `hitung_denda()` wajib diimplementasikan.
3. **Encapsulation** - `__is_dipinjam` (private) pada `LibraryItem`, `_judul`/`_item_id` (protected), `__koleksi` (private) pada `Library`, dan `__item_dipinjam` (private) pada `Member`. Akses dari luar hanya lewat `@property` (read-only) dan method.
4. **Polymorphism** - `get_detail()` dan `hitung_denda()` dipanggil seragam, tetapi hasilnya berbeda per subclass (denda buku Rp 1.000/hari, majalah Rp 500/hari).

## Struktur Berkas
```
tugas_perpustakaan/
├── library_item.py   # LibraryItem (abstract), Book, Magazine
├── member.py         # Member
├── library.py        # Library
├── main.py           # Program pengujian
└── output.txt        # Hasil eksekusi
```

## Panduan Menjalankan
```bash
cd tugas_perpustakaan
python main.py
```
Membutuhkan Python 3.10+ (tanpa library eksternal).

## Screenshot Output
> Jalankan `python main.py`, ambil screenshot terminal, lalu letakkan di sini, misalnya `![Output](screenshot.png)`.

Teks hasil eksekusi (juga tersimpan di `tugas_perpustakaan/output.txt`):

```text
--- 1. Menambahkan Item ---
Item ditambahkan: Pemrograman Python (Buku)
Item ditambahkan: Basis Data Dasar (Buku)
Item ditambahkan: Tech Monthly (Majalah)
Item ditambahkan: Sains Populer (Majalah)
Gagal: ID 'B001' sudah terdaftar.

--- 2. Katalog Tersedia ---

=== Katalog Tersedia - Perpustakaan ITERA (4 item) ===
 - Buku | ID: B001 | Judul: Pemrograman Python | Penulis: Budi Santoso | Halaman: 320
 - Buku | ID: B002 | Judul: Basis Data Dasar | Penulis: Siti Rahma | Halaman: 280
 - Majalah | ID: M001 | Judul: Tech Monthly | Penerbit: Gramedia | Edisi: Nov 2026
 - Majalah | ID: M002 | Judul: Sains Populer | Penerbit: Kompas | Edisi: Okt 2026

--- 3. Pencarian ---
Cari judul 'python': ['Pemrograman Python']
Cari ID 'M001'     : Majalah | ID: M001 | Judul: Tech Monthly | Penerbit: Gramedia | Edisi: Nov 2026
Cari ID 'X999'     : None

--- 4. Peminjaman & Status Ketersediaan ---
Sukses: Ahmad Fadhil meminjam 'Pemrograman Python'.
Sukses: Ahmad Fadhil meminjam 'Tech Monthly'.
Gagal: 'Pemrograman Python' sedang dipinjam.
Status B001 dipinjam? True

=== Katalog Tersedia - Perpustakaan ITERA (2 item) ===
 - Buku | ID: B002 | Judul: Basis Data Dasar | Penulis: Siti Rahma | Halaman: 280
 - Majalah | ID: M002 | Judul: Sains Populer | Penerbit: Kompas | Edisi: Okt 2026

--- 5. Pengembalian & Denda (Polymorphism) ---
Sukses: Ahmad Fadhil mengembalikan 'Pemrograman Python'. Denda: Rp 3,000
Sukses: Ahmad Fadhil mengembalikan 'Tech Monthly'. Denda: Rp 1,500

=== Seluruh Koleksi - Perpustakaan ITERA (4 item) ===
 - [B001] Pemrograman Python (Buku) - Tersedia
 - [B002] Basis Data Dasar (Buku) - Tersedia
 - [M001] Tech Monthly (Majalah) - Tersedia
 - [M002] Sains Populer (Majalah) - Tersedia

--- 6. Bukti Encapsulation & Abstract Class ---
is_dipinjam bersifat read-only (AttributeError).
LibraryItem tidak bisa diinstansiasi: Can't instantiate abstract class LibraryItem without an implementation for abstract methods 'get_detail', 'get_tipe', 'hitung_denda'
```

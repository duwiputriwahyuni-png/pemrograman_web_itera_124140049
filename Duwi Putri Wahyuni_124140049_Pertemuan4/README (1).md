# Tugas Praktikum Pertemuan 4: Python Dasar

## Identitas
- **Nama** : Duwi Putri Wahyuni
- **NIM**  : 124140049
- **Kelas**: RA

## Struktur Folder
```
DuwiPutriWahyuni_124140049_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

## Deskripsi Program

### Soal 1 - `tugas1_bmi.py` (Penghitung BMI)
Meminta input berat badan (kg) dan tinggi badan (m) dengan `input()` (divalidasi agar berupa angka positif).
Fungsi `hitung_bmi()` menghitung `BMI = berat / (tinggi * tinggi)`, lalu `tentukan_kategori()` memakai
`if-elif-else` untuk menentukan kategori:
- BMI < 18.5 : Berat badan kurang
- 18.5 <= BMI < 25 : Berat badan normal
- 25 <= BMI < 30 : Berat badan berlebih
- BMI >= 30 : Obesitas

Hasil dicetak dengan f-string (BMI 2 angka desimal).

### Soal 2 - `tugas2_nilai_mahasiswa.py` (Pengelolaan Nilai Mahasiswa)
Menyimpan 6 mahasiswa dalam list of dictionary (`nama`, `nim`, `nilai_uts`, `nilai_uas`, `nilai_tugas`).
- `hitung_nilai_akhir()`: `30% UTS + 40% UAS + 30% Tugas`
- `tentukan_grade()`: A (>=80), B (70-79), C (60-69), D (50-59), E (<50)
- `cetak_tabel()`: menampilkan tabel rapi (No, Nama, NIM, Nilai Akhir, Grade) dengan perataan f-string
- Mencari mahasiswa nilai tertinggi dan terendah dengan `max()` / `min()` + lambda

### Soal 3 - `math_operations.py` & `main.py`
**`math_operations.py`** (modul) berisi:
- Konstanta `PI` dan `KELVIN_OFFSET`
- Geometri: luas & keliling persegi, persegi panjang, lingkaran
- Konversi suhu: `celsius_ke_fahrenheit()`, `celsius_ke_kelvin()`

**`main.py`** mengimpor modul dengan 3 cara (`import math_operations`,
`from math_operations import ...`, `import math_operations as mo`), memanggil seluruh fungsi dengan
beberapa nilai uji, dan mencetak hasil dalam format rapi.

## Cara Menjalankan
Pastikan Python 3.8+ terpasang, lalu buka terminal di folder ini:

```bash
python tugas1_bmi.py
python tugas2_nilai_mahasiswa.py
python main.py
```
(Gunakan `python3` jika `python` tidak dikenali.)

## Screenshot Hasil Eksekusi
> Ganti dengan screenshot terminal milik kamu sendiri.

**Soal 1 (BMI)**
![Soal 1](screenshots/soal1.png)

**Soal 2 (Nilai Mahasiswa)**
![Soal 2](screenshots/soal2.png)

**Soal 3 (Modul Matematika)**
![Soal 3](screenshots/soal3.png)

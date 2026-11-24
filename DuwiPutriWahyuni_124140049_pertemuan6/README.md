# Pertemuan 6 - RESTful API Pyramid + PostgreSQL

## Identitas
- Nama Lengkap : Duwi Putri Wahyuni
- NIM          : 124140049
- Kelas        : [RA / RB]

## Deskripsi Aplikasi
RESTful API berbasis Pyramid Framework, SQLAlchemy ORM, dan PostgreSQL
dengan dua modul:
1. **Mahasiswa** - CRUD data mahasiswa (`/api/mahasiswa`)
2. **Matakuliah** - CRUD data mata kuliah (`/api/matakuliah`)

Skema database dikelola dengan Alembic.

## Instalasi
```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install --upgrade pip setuptools
pip install -e ".[testing]"
pip install psycopg2-binary
```

## Konfigurasi Database
```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;
```
Pastikan `development.ini` berisi:
```ini
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```

## Migrasi & Seeding
```bash
alembic -c development.ini revision --autogenerate -m "create mahasiswa table"
alembic -c development.ini revision --autogenerate -m "create matakuliah table"
alembic -c development.ini upgrade head
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

## Menjalankan Server
```bash
pserve development.ini --reload
```
Server berjalan di http://localhost:6543

## Endpoint Matakuliah
| Method | URL | Keterangan | Status |
|--------|-----|------------|--------|
| GET | /api/matakuliah | Semua mata kuliah | 200 |
| GET | /api/matakuliah/{id} | Detail mata kuliah | 200 / 404 |
| POST | /api/matakuliah | Tambah mata kuliah | 200 / 400 / 409 |
| PUT | /api/matakuliah/{id} | Ubah mata kuliah | 200 / 400 / 404 / 409 |
| DELETE | /api/matakuliah/{id} | Hapus mata kuliah | 200 / 404 |

Validasi: `kode_mk`, `nama_mk`, `sks`, `semester` wajib diisi; `sks` dan
`semester` harus bilangan bulat > 0; `kode_mk` harus unik.

## Contoh Pengujian cURL
```bash
curl http://localhost:6543/api/matakuliah
curl http://localhost:6543/api/matakuliah/1
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk":"IF4010","nama_mk":"Kecerdasan Buatan","sks":3,"semester":7}'
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" -d '{"sks":4}'
curl -X DELETE http://localhost:6543/api/matakuliah/5
```

## Screenshot Pengujian
Letakkan screenshot di folder `screenshots/` lalu tampilkan di sini:

### Mahasiswa
![GET all mahasiswa](<screenshots/Screenshot 2026-11-24 201242.png>)
![GET one mahasiswa](<screenshots/Screenshot 2026-11-24 201253.png>)
![POST mahasiswa](<screenshots/Screenshot 2026-11-24 201309.png>)
![PUT mahasiswa](<screenshots/Screenshot 2026-11-24 201309.png>)
![DELETE mahasiswa](<screenshots/Screenshot 2026-11-24 201337.png>)

### Matakuliah
![GET all matakuliah](<screenshots/Screenshot 2026-11-24 201027.png>)
![GET one matakuliah](<screenshots/Screenshot 2026-11-24 201050.png>)
![POST matakuliah](<screenshots/Screenshot 2026-11-24 201101.png>)
![POST 400](<screenshots/Screenshot 2026-11-24 201127.png>)
![PUT matakuliah](<screenshots/Screenshot 2026-11-24 201143.png>)
![DELETE matakuliah](<screenshots/Screenshot 2026-11-24 201200.png>)
![GET 404](<screenshots/Screenshot 2026-11-24 201210.png>)

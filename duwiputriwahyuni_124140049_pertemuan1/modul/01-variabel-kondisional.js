// Latihan Variabel dan Kondisional

const nama = "Duwi Putri Wahyuni";
let umur = 20;
const kota = "Pesisir Barat";

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Kota:", kota);

// Menentukan lulus atau tidak
let nilai = 80;

if (nilai >= 70) {
    console.log("Keterangan: Lulus");
} else {
    console.log("Keterangan: Tidak Lulus");
}

// Menentukan kategori umur
if (umur < 13) {
    console.log("Kategori: Anak-anak");
} else if (umur < 18) {
    console.log("Kategori: Remaja");
} else {
    console.log("Kategori: Dewasa");
}
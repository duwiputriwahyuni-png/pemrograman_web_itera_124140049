// Latihan Array dan Object

const mahasiswa = [
    {
        nama: "Duwi Putri Wahyuni",
        nilai: 85
    },
    {
        nama: "Andi",
        nilai: 75
    },
    {
        nama: "Siti",
        nilai: 90
    },
    {
        nama: "Budi",
        nilai: 65
    },
    {
        nama: "Rina",
        nilai: 80
    }
];

// Menampilkan data mahasiswa
console.log("Data Mahasiswa:");

mahasiswa.forEach((mhs) => {
    console.log(`Nama: ${mhs.nama}, Nilai: ${mhs.nilai}`);
});

// Mencari nilai tertinggi
const nilaiTertinggi = Math.max(
    ...mahasiswa.map((mhs) => mhs.nilai)
);

console.log("Nilai Tertinggi:", nilaiTertinggi);

// Menampilkan mahasiswa dengan nilai di atas 75
const nilaiDiAtas75 = mahasiswa.filter(
    (mhs) => mhs.nilai > 75
);

console.log("Mahasiswa dengan nilai di atas 75:");

nilaiDiAtas75.forEach((mhs) => {
    console.log(mhs.nama);
});
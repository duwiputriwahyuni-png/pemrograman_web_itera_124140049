// Latihan Loop dan Function

// Perulangan angka 1 sampai 10
for (let i = 1; i <= 10; i++) {
    console.log("Angka:", i);
}

// Tabel perkalian 5
console.log("Tabel Perkalian 5");

for (let i = 1; i <= 10; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
}

// Function menghitung luas persegi panjang
function luasPersegiPanjang(panjang, lebar) {
    return panjang * lebar;
}

let hasil = luasPersegiPanjang(10, 5);

console.log("Luas Persegi Panjang:", hasil);
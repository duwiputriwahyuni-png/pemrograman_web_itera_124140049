// Latihan DOM dan Fetch API

// Menampilkan pesan ke console
console.log("Latihan DOM dan Fetch API");

// DOM Manipulation
const judul = document.querySelector("h1");

if (judul) {
    judul.textContent = "Mini POS - JavaScript";
}

// Fetch API
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => {
        console.log("Data dari Fetch API:");
        console.log(data);
    })
    .catch((error) => {
        console.log("Terjadi kesalahan:", error);
    });
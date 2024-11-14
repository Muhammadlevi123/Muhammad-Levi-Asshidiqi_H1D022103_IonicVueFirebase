# Tugas 9 Pertemuan 10 - Proyek Ionic

**Nama:** Muhammad Levi Asshidiqi  
**NIM:** H1D022103  
**Shift Baru:** A  

Masukkan SS ke dalam Readme.md lalu jelaskan SS dibawah setiap gambar. 

Jelaskan bagaimana cara dari mulai autentikasi login, hingga aplikasi mendapatkan username dan profil kita dari akun google.


# Inisialisasi Firebase `firebase.ts`

1. Konfigurasi Firebase: Menghubungkan aplikasi dengan proyek Firebase menggunakan `firebaseConfig`.

2. Inisialisasi Authentication: Menginisialisasi layanan autentikasi Firebase menggunakan `getAuth`.

3. Provider GoogleAuth: Membuat instance dari `GoogleAuthProvider` untuk memungkinkan autentikasi dengan akun Google.


# Autentikasi `auth.ts`


1. Variabel `user`: Menyimpan informasi pengguna yang login.

2. Computed Property `isAuth`: Mengecek apakah pengguna sudah login atau belum (bernilai true jika user tidak kosong).


<img src="login-google.png" alt="Lampiran read" width="400" />

3. Fungsi `loginWithGoogle`: Mengatur proses login dengan Google. Langkah-langkahnya:

- Inisialisasi GoogleAuth: Menggunakan plugin @codetrix-studio/capacitor-google-auth untuk autentikasi Google di perangkat seluler.
- Proses Sign-In: Melakukan autentikasi Google dengan memanggil GoogleAuth.signIn(), yang mengembalikan ID token pengguna.
- Konversi Token ke Credential: Menggunakan GoogleAuthProvider.credential(idToken) untuk membuat kredensial Firebase dari ID token.
- Autentikasi Firebase: Menggunakan signInWithCredential untuk login ke Firebase dengan kredensial Google.
- Penyimpanan Data Pengguna: Menyimpan data pengguna ke variabel user dan mengarahkan pengguna ke halaman /home.
- Error Handling: Menampilkan alert jika login gagal.


4. Fungsi logout: Melakukan logout dengan memanggil signOut dari Firebase dan GoogleAuth.signOut(), lalu menghapus data pengguna dan mengarahkan ke halaman login.

5. Status Autentikasi dengan onAuthStateChanged: Firebase mendeteksi perubahan status login pengguna dan memperbarui variabel user setiap kali ada perubahan.

# Autentikasi `router/index.ts`

1. Akses Halaman Terproteksi: Setelah login, pengguna dapat mengakses halaman seperti /home dan /profile.

2. Konfigurasi Rute: Menyusun rute untuk login (/login)

<img src="home.png" alt="Lampiran read" width="400" />

3. konfigurasi beranda (/home)

<img src="profile.png" alt="Lampiran read" width="400" />

4. konfigurasi profil (/profile).

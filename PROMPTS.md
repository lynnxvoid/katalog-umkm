# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.
**Hasil:**
Pekerjaan untuk US-01 (Katalog dari database) telah selesai.

File yang Dibuat dan Diubah
lib/supabase/server.js & lib/supabase/index.js
Membuat fungsi buatClientServer menggunakan @supabase/supabase-js dengan SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable untuk koneksi server publik.
app/page.jsx
Mengambil data dari tabel produk di Supabase secara dinamis di sisi server (Server Component).
Menghapus ketergantungan pada lib/data-contoh.js dan menghapus komponen CatatanBelumAktif.
Menampilkan daftar produk menggunakan KartuProduk tanpa mengubah tampilannya.
Menampilkan pesan error jika terjadi kegagalan pengambilan data atau tulisan "Belum ada produk" jika tabel kosong.
Cara Mengetes
Pastikan konfigurasi di .env.local sudah terisi:
SUPABASE_URL
SUPABASE_SECRET_KEY
Jalankan aplikasi pengembangan:
bash
npm run dev
Buka halaman utama (http://localhost:3000):
Pastikan produk yang tampil berasal dari tabel produk di Supabase (foto, kategori, nama, dan harga rupiah).
Uji kondisi kosong: Jika tabel produk dikosongkan sementara, halaman akan menampilkan tulisan "Belum ada produk".
Uji kondisi error: Jika salah satu environment variable (misalnya SUPABASE_SECRET_KEY) dikosongkan/salah, halaman akan menampilkan pesan error secara jelas.

**Perbaikan:**
Penyebab error Invalid path specified in request URL adalah nilai SUPABASE_URL di konfigurasi environment sebelumnya menyertakan path /rest/v1/ di bagian akhir (URL REST endpoint dari dashboard API Supabase). Karena SDK @supabase/supabase-js secara otomatis menambahkan path /rest/v1, URL yang dipanggil menjadi /rest/v1/rest/v1/produk yang ditolak oleh API Supabase.

Perbaikan yang Dilakukan
lib/supabase/server.js:
Menambahkan fungsi sanitasi/normalisasi URL (normalisasiUrl) untuk otomatis memotong akhiran /rest/v1 dan trailing slash (/), serta membersihkan tanda kutip/spasi yang tidak disengaja. Hal ini mencegah error terulang baik di lokal maupun ketika di-deploy ke Vercel.
.env.local:
Memperbarui format SUPABASE_URL menjadi base project URL saja (tanpa path /rest/v1/).

Tampilan dan komponen pada app/page.jsx tetap sama tanpa ada perubahan visual.

Cara Mengetes
Muat ulang (refresh) halaman katalog di browser (http://localhost:3000).
Daftar produk dari database Supabase kini akan muncul normal dalam format kartu produk.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
**Hasil:**
Bisa mengubah deskrpsi secara live

**Perbaikan:**
File yang Diubah
app/produk/[id]/page.jsx:
Mengambil data produk langsung dari tabel produk di Supabase berdasarkan id pada URL menggunakan koneksi buatClientServer() dari lib/supabase/server.js.
Menggunakan notFound() dari next/navigation jika data produk tidak ditemukan atau terjadi error pencarian.
Menghapus komponen CatatanBelumAktif dan ketergantungan pada lib/data-contoh.js.
Mempertahankan komponen TombolWhatsApp dan seluruh tata letak tampilan detail produk.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.
**Hasil:**
Bisa mengerahkan ke tautan wa langsung direct

**Perbaikan:**
File yang Diubah
components/TombolWhatsApp.jsx:
Mengubah elemen <button> menjadi elemen tautan <a> dengan atribut target="\_blank" dan rel="noopener noreferrer".
Menghubungkan ke https://wa.me/<nomor>?text=<pesan> menggunakan nomor WhatsApp dari lib/toko.js.
Mengisi teks pesan secara otomatis dengan nama produk dan harga terformat rupiah (formatRupiah), yang di-encode menggunakan encodeURIComponent.
Mempertahankan styling dan kelas tampilan tombol yang sudah ada.
app/produk/[id]/page.jsx:
Memastikan komponen CatatanBelumAktif yang merujuk pada US-03 sudah dihapus dari halaman detail produk.

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

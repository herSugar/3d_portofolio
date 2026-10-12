# Mika Portfolio 3D — React + React Three Fiber

Starter project untuk portfolio 3D dengan lima ruangan: Profile, Projects, Skills, Experience, dan Contact.

## Persyaratan
- Node.js versi 20.19+ atau 22.12+
- npm
- VS Code (opsional)

## Menjalankan project
1. Extract ZIP ini.
2. Buka folder `mika-portfolio-r3f` di VS Code.
3. Buka Terminal → New Terminal.
4. Jalankan:

   ```bash
   npm install
   npm run dev
   ```

5. Buka URL lokal yang ditampilkan Vite, biasanya `http://localhost:5173`.

## File model 3D
Model ada di:

`public/models/mika_portfolio_5_rooms_v2.glb`

Jangan ubah nama file tersebut kecuali Anda juga mengubah path di `src/components/PortfolioScene.tsx`.

## Bagian penting
- `src/App.tsx`: layout, navigasi ruangan, teks UI.
- `src/data.ts`: judul, deskripsi, serta posisi kamera tiap ruangan.
- `src/components/PortfolioScene.tsx`: Canvas 3D, pemuatan GLB, lighting, orbit control, transisi kamera.
- `src/styles.css`: tampilan website.

## Menyesuaikan kamera
Di `src/data.ts`, setiap ruangan memiliki:
- `position`: posisi kamera untuk ruangan tersebut.
- `target`: titik yang dilihat kamera.

Karena posisi objek di GLB dapat berbeda setelah diedit di Blender/Meshy, kemungkinan nilai kamera perlu disesuaikan. Gunakan tombol navigasi untuk mencoba setiap preset.

## Catatan penting
- `hello@example.com` hanyalah alamat email placeholder. Ganti di `src/App.tsx` dengan email Anda.
- Model GLB adalah base geometris/prototype. Periksa tampilan dan framing di browser; sesuaikan posisi kamera jika ada ruangan yang tidak terbingkai dengan baik.
- Versi ini memindahkan kamera dengan interpolasi halus. Belum ada animasi karakter berjalan, collision, atau klik langsung pada objek 3D.
- Google Fonts memerlukan internet; jika ingin offline, hapus `@import` di `src/styles.css` dan gunakan font sistem.

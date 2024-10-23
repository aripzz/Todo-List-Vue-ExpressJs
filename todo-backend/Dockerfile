# Menggunakan image Node.js sebagai base image
FROM node:14

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin semua file ke dalam container
COPY . .

# Mengekspos port aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["npm", "start"]
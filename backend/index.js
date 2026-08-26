require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === SUPABASE / MULTER SETUP ===
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function SupabaseStorage(opts) {
  this.bucket = opts.bucket || 'uploads';
}
SupabaseStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_');
  
  if (supabase) {
    const chunks = [];
    file.stream.on('data', chunk => chunks.push(chunk));
    file.stream.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      try {
        const { error } = await supabase.storage.from(this.bucket).upload(filename, buffer, {
          contentType: file.mimetype
        });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from(this.bucket).getPublicUrl(filename);
        cb(null, { filename, path: publicUrlData.publicUrl, size: buffer.length });
      } catch (err) {
        cb(err);
      }
    });
    file.stream.on('error', cb);
  } else {
    // Fallback to local
    const fs = require('fs');
    const path = require('path');
    const outPath = path.join(__dirname, 'uploads', filename);
    const outStream = fs.createWriteStream(outPath);
    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', () => {
      cb(null, { filename, path: `/uploads/${filename}`, size: outStream.bytesWritten });
    });
  }
};
SupabaseStorage.prototype._removeFile = function _removeFile(req, file, cb) { cb(null); };

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = new SupabaseStorage({ bucket: 'uploads' });
const upload = multer({ storage });

// === AUTH API ===
app.get('/', (req, res) => {
  res.send('Backend API Server Kecamatan Cigedug berjalan normal!');
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Auto-create admin if none exists
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      await prisma.admin.create({
        data: { username: 'admin', password: 'password123' }
      });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Kredensial tidak valid' });
    }

    // In a real app, use JWT. For simplicity, just return success.
    res.json({ success: true, token: 'dummy-token-' + admin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/auth/password', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin || admin.password !== oldPassword) {
      return res.status(401).json({ error: 'Password lama tidak cocok' });
    }

    await prisma.admin.update({
      where: { username },
      data: { password: newPassword }
    });

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === UPLOAD API ===
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // The URL accessible from the frontend will be http://localhost:5000/uploads/filename
  res.json({ success: true, url: req.file.path });
});

// === BERITA API ===
app.get('/api/berita', async (req, res) => {
  try {
    const berita = await prisma.berita.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/berita', async (req, res) => {
  try {
    const berita = await prisma.berita.create({ data: req.body });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/berita/:id', async (req, res) => {
  try {
    const berita = await prisma.berita.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/berita/:id', async (req, res) => {
  try {
    await prisma.berita.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === DATASET API ===
app.get('/api/dataset', async (req, res) => {
  try {
    const dataset = await prisma.dataset.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(dataset);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/dataset', async (req, res) => {
  try {
    const dataset = await prisma.dataset.create({ data: req.body });
    res.json(dataset);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/dataset/:id', async (req, res) => {
  try {
    const dataset = await prisma.dataset.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(dataset);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/dataset/:id', async (req, res) => {
  try {
    await prisma.dataset.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === PENGUMUMAN API ===
app.get('/api/pengumuman', async (req, res) => {
  try {
    const data = await prisma.pengumuman.findMany({
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.post('/api/pengumuman', upload.single('file'), async (req, res) => {
  try {
    const { title, date, category, snippet, isPinned } = req.body;
    let fileUrl = '';
    let fileSize = '';
    if (req.file) {
      fileUrl = req.file.path;
      fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB'; // Convert to MB
    }
    const data = await prisma.pengumuman.create({
      data: {
        title,
        date,
        category,
        snippet,
        isPinned: isPinned === 'true',
        fileUrl,
        fileSize
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/pengumuman/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, date, category, snippet, isPinned } = req.body;
    const dataObj = {
      title,
      date,
      category,
      snippet,
      isPinned: isPinned === 'true'
    };
    if (req.file) {
      dataObj.fileUrl = req.file.path;
      dataObj.fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    }
    const data = await prisma.pengumuman.update({
      where: { id: req.params.id },
      data: dataObj
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.delete('/api/pengumuman/:id', async (req, res) => {
  try {
    await prisma.pengumuman.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === PRODUK UNGGULAN API ===
app.get('/api/produk', async (req, res) => {
  try {
    const produk = await prisma.produkUnggulan.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/produk', async (req, res) => {
  try {
    const produk = await prisma.produkUnggulan.create({ data: req.body });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/produk/:id', async (req, res) => {
  try {
    const produk = await prisma.produkUnggulan.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/produk/:id', async (req, res) => {
  try {
    await prisma.produkUnggulan.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === FASILITAS (MAP) API ===
app.get('/api/fasilitas', async (req, res) => {
  try {
    const fasilitas = await prisma.fasilitas.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(fasilitas);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/fasilitas', async (req, res) => {
  try {
    const fasilitas = await prisma.fasilitas.create({ data: req.body });
    res.json(fasilitas);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/fasilitas/:id', async (req, res) => {
  try {
    const fasilitas = await prisma.fasilitas.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(fasilitas);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/fasilitas/:id', async (req, res) => {
  try {
    await prisma.fasilitas.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === DASHBOARD STATS ===
app.get('/api/stats', async (req, res) => {
  try {
    const [berita, dataset, produk] = await Promise.all([
      prisma.berita.count(),
      prisma.dataset.count(),
      prisma.produkUnggulan.count()
    ]);
    res.json({ berita, dataset, produk });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === SITE CONTENT API ===
const DEFAULT_CONTENT = [
  // HOME
  { key: 'home.hero.title', label: 'Hero - Judul Utama', page: 'Home', value: 'Portal Digital Kecamatan Cigedug' },
  { key: 'home.hero.subtitle', label: 'Hero - Sub Judul', page: 'Home', value: 'Kabupaten Garut · Jawa Barat' },
  { key: 'home.hero.tagline', label: 'Hero - Tagline', page: 'Home', value: 'Melayani dengan sepenuh hati untuk masyarakat yang maju, mandiri, dan sejahtera.' },
  { key: 'home.sambutan.title', label: 'Sambutan - Judul', page: 'Home', value: 'Sambutan Camat Cigedug' },
  { key: 'home.sambutan.body', label: 'Sambutan - Isi Teks', page: 'Home', value: 'Puji syukur kami panjatkan kepada Allah SWT atas berkat dan rahmat-Nya. Selamat datang di Portal Digital Kecamatan Cigedug. Portal ini hadir sebagai wujud komitmen kami untuk memberikan pelayanan publik yang transparan, mudah diakses, dan akuntabel kepada seluruh lapisan masyarakat.' },
  // PROFIL
  { key: 'profil.deskripsi', label: 'Deskripsi Kecamatan', page: 'Profil', value: 'Kecamatan Cigedug adalah salah satu kecamatan yang berada di Kabupaten Garut, Jawa Barat. Terletak di ketinggian ±1.300 mdpl dengan suhu rata-rata 15-20°C, menjadikan Cigedug sebagai daerah yang subur dan sejuk.' },
  { key: 'profil.visi', label: 'Visi Kecamatan', page: 'Profil', value: 'Terwujudnya Kecamatan Cigedug yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Pariwisata yang Berwawasan Lingkungan.' },
  { key: 'profil.misi1', label: 'Misi 1', page: 'Profil', value: 'Meningkatkan kualitas pelayanan publik yang profesional, transparan, dan akuntabel.' },
  { key: 'profil.misi2', label: 'Misi 2', page: 'Profil', value: 'Mengembangkan potensi pertanian, perkebunan, dan peternakan secara berkelanjutan.' },
  { key: 'profil.misi3', label: 'Misi 3', page: 'Profil', value: 'Membangun infrastruktur yang merata dan berwawasan lingkungan di seluruh wilayah kecamatan.' },
  { key: 'profil.misi4', label: 'Misi 4', page: 'Profil', value: 'Meningkatkan kualitas sumber daya manusia melalui pendidikan, kesehatan, dan pemberdayaan masyarakat.' },
  { key: 'profil.misi5', label: 'Misi 5', page: 'Profil', value: 'Mendorong pertumbuhan ekonomi kreatif dan pariwisata berbasis kearifan lokal.' },
  // PELAYANAN
  { key: 'pelayanan.intro', label: 'Pelayanan - Pengantar', page: 'Pelayanan', value: 'Kami berkomitmen memberikan pelayanan administrasi yang cepat, mudah, dan transparan kepada seluruh masyarakat Kecamatan Cigedug.' },
  { key: 'pelayanan.jam', label: 'Jam Pelayanan', page: 'Pelayanan', value: 'Senin - Kamis: 08.00 - 16.00 WIB | Jumat: 08.00 - 11.30 WIB' },
  // INOVASI
  { key: 'inovasi.intro', label: 'Inovasi - Pengantar', page: 'Inovasi', value: 'Kecamatan Cigedug terus berinovasi untuk meningkatkan kualitas pelayanan dan pemberdayaan masyarakat melalui program-program unggulan.' },
];

app.get('/api/konten', async (req, res) => {
  try {
    // Seed default content if empty
    const count = await prisma.siteContent.count();
    if (count === 0) {
      for (const item of DEFAULT_CONTENT) {
        await prisma.siteContent.upsert({
          where: { key: item.key },
          update: {},
          create: { key: item.key, label: item.label, page: item.page, value: item.value }
        });
      }
    }
    const contents = await prisma.siteContent.findMany({ orderBy: [{ page: 'asc' }, { key: 'asc' }] });
    res.json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/konten/:key', async (req, res) => {
  try {
    const content = await prisma.siteContent.update({
      where: { key: req.params.key },
      data: { value: req.body.value }
    });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.get('/api/konten/:key', async (req, res) => {
  try {
    const content = await prisma.siteContent.findUnique({ where: { key: req.params.key } });
    if (!content) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === APARATUR API ===
app.get('/api/aparatur', async (req, res) => {
  try {
    const data = await prisma.aparatur.findMany({ orderBy: { unit: 'asc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.post('/api/aparatur', upload.single('image'), async (req, res) => {
  try {
    const dataObj = { ...req.body };
    if (req.file) dataObj.imageUrl = req.file.path;
    const data = await prisma.aparatur.create({ data: dataObj });
    res.json(data);
  } catch (error) {
    console.error("Error Aparatur POST:", error);
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/aparatur/:id', upload.single('image'), async (req, res) => {
  try {
    const dataObj = { ...req.body };
    if (req.file) dataObj.imageUrl = req.file.path;
    const data = await prisma.aparatur.update({
      where: { id: req.params.id },
      data: dataObj
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.delete('/api/aparatur/:id', async (req, res) => {
  try {
    await prisma.aparatur.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === GALERI API ===
app.get('/api/galeri', async (req, res) => {
  try {
    const data = await prisma.galeri.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.post('/api/galeri', upload.single('image'), async (req, res) => {
  try {
    const { title, category, aspectRatio, description } = req.body;
    const img = req.file ? req.file.path : '';
    const data = await prisma.galeri.create({
      data: { title, category, aspectRatio, description, img }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/galeri/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, category, aspectRatio, description } = req.body;
    const dataObj = { title, category, aspectRatio, description };
    if (req.file) dataObj.img = req.file.path;
    const data = await prisma.galeri.update({
      where: { id: req.params.id },
      data: dataObj
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.delete('/api/galeri/:id', async (req, res) => {
  try {
    await prisma.galeri.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === AGENDA API ===
app.get('/api/agenda', async (req, res) => {
  try {
    const data = await prisma.agenda.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.post('/api/agenda', async (req, res) => {
  try {
    const { title, date, time, location, type, status, description } = req.body;
    const data = await prisma.agenda.create({
      data: { title, date, time, location, type, status: status || 'upcoming', description }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/agenda/:id', async (req, res) => {
  try {
    const { title, date, time, location, type, status, description } = req.body;
    const data = await prisma.agenda.update({
      where: { id: req.params.id },
      data: { title, date, time, location, type, status, description }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.delete('/api/agenda/:id', async (req, res) => {
  try {
    await prisma.agenda.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === PENGHARGAAN API ===
app.get('/api/penghargaan', async (req, res) => {
  try {
    const data = await prisma.penghargaan.findMany({ orderBy: { year: 'desc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.post('/api/penghargaan', upload.single('image'), async (req, res) => {
  try {
    const { title, year, category, description, color } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const data = await prisma.penghargaan.create({
      data: { title, year, category, description, imageUrl, color: color || 'from-amber-400 to-orange-500' }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.put('/api/penghargaan/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, year, category, description, color } = req.body;
    const dataObj = { title, year, category, description, color };
    if (req.file) dataObj.imageUrl = req.file.path;
    const data = await prisma.penghargaan.update({
      where: { id: req.params.id },
      data: dataObj
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.delete('/api/penghargaan/:id', async (req, res) => {
  try {
    await prisma.penghargaan.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === INOVASI API ===
app.get('/api/inovasi', async (req, res) => {
  try {
    const data = await prisma.inovasi.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/inovasi', upload.single('image'), async (req, res) => {
  try {
    const { title, date, description, content } = req.body;
    const dataObj = { title, date, description, content };
    if (req.file) dataObj.imageUrl = req.file.path;
    const data = await prisma.inovasi.create({ data: dataObj });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/inovasi/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, date, description, content } = req.body;
    const dataObj = { title, date, description, content };
    if (req.file) dataObj.imageUrl = req.file.path;
    const data = await prisma.inovasi.update({
      where: { id: req.params.id },
      data: dataObj
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/inovasi/:id', async (req, res) => {
  try {
    await prisma.inovasi.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

// === PENGADUAN API ===
app.get('/api/pengaduan', async (req, res) => {
  try {
    const data = await prisma.pengaduan.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.post('/api/pengaduan', async (req, res) => {
  try {
    const { judul, pesan } = req.body;
    const data = await prisma.pengaduan.create({ data: { judul, pesan } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.put('/api/pengaduan/:id/read', async (req, res) => {
  try {
    const data = await prisma.pengaduan.update({
      where: { id: req.params.id },
      data: { status: 'Dibaca' }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});
app.delete('/api/pengaduan/:id', async (req, res) => {
  try {
    await prisma.pengaduan.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan server' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

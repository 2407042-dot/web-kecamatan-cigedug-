import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  title: 'Infografis Kependudukan - Kecamatan Cigedug',
  description: 'Visualisasi interaktif data penduduk Kecamatan Cigedug.',
};

export interface PopulationData {
  kode_kabupaten: string;
  nama_kabupaten: string;
  kode_kecamatan: string;
  nama_kecamatan: string;
  kode_desa_kelurahan: string;
  nama_desa_kelurahan: string;
  jenis_kelamin: string;
  jumlah_penduduk: number;
  satuan: string;
  tahun: string;
}

// Function to parse the simple CSV format provided
function parseCSV(csvText: string): PopulationData[] {
  const lines = csvText.split('\n').filter((line) => line.trim() !== '');
  if (lines.length <= 1) return [];

  // Skip header, parse rows
  return lines.slice(1).map((line) => {
    // Basic CSV parser assuming quotes wrap the values and no commas inside values
    const values = line.split(',').map((val) => val.replace(/(^"|"$)/g, '').trim());
    return {
      kode_kabupaten: values[0],
      nama_kabupaten: values[1],
      kode_kecamatan: values[2],
      nama_kecamatan: values[3],
      kode_desa_kelurahan: values[4],
      nama_desa_kelurahan: values[5],
      jenis_kelamin: values[6],
      jumlah_penduduk: parseInt(values[7], 10) || 0,
      satuan: values[8],
      tahun: values[9],
    };
  });
}

export interface MappedData {
  kategori: string;
  nama: string;
  desa: string;
}

// Function to parse mapped CSV
function parseMappedCSV(csvText: string): MappedData[] {
  const lines = csvText.split('\n').filter((line) => line.trim() !== '');
  if (lines.length <= 1) return [];

  return lines.slice(1).map((line) => {
    // Basic CSV split, handle potential quotes loosely
    const values = line.split(',').map((val) => val.replace(/(^"|"$)/g, '').trim());
    return {
      kategori: values[0] || 'Lainnya',
      nama: values[1] || 'Tanpa Nama',
      desa: values[2] || '-',
    };
  });
}

export default async function InfografisPage() {
  // 1. Read Demographics
  const popPath = path.join(process.cwd(), 'src/data/dataset/Jumlah Penduduk Per Desa di Kecamatan Cigedug.csv');
  let popData: PopulationData[] = [];
  try {
    if (fs.existsSync(popPath)) {
      const csvContent = fs.readFileSync(popPath, 'utf8');
      popData = parseCSV(csvContent);
    }
  } catch (error) {
    console.error('Error reading Population CSV:', error);
  }

  // 2. Read Mapped Facilities (KKN)
  const mapPath = path.join(process.cwd(), 'src/data/Data_Pemetaan_KKN_Cigedug.csv');
  let mapData: MappedData[] = [];
  try {
    if (fs.existsSync(mapPath)) {
      const csvContent = fs.readFileSync(mapPath, 'utf8');
      mapData = parseMappedCSV(csvContent);
    }
  } catch (error) {
    console.error('Error reading Mapped CSV:', error);
  }

  // 3. Read Additional Facilities (Admin JSON)
  const jsonPath = path.join(process.cwd(), 'src/data/Data_Fasilitas.json');
  try {
    if (fs.existsSync(jsonPath)) {
      const jsonContent = fs.readFileSync(jsonPath, 'utf8');
      const adminFasilitas = JSON.parse(jsonContent);
      
      // Gabungkan data CSV dan JSON Admin
      if (Array.isArray(adminFasilitas)) {
        const mappedAdminData = adminFasilitas.map((f: any) => ({
          kategori: f.kategori || 'Lainnya',
          nama: f.nama || 'Tanpa Nama',
          desa: f.desa || '-',
        }));
        mapData = [...mapData, ...mappedAdminData];
      }
    }
  } catch (error) {
    console.error('Error reading Fasilitas JSON:', error);
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700/50 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">pie_chart</span>
            Pusat Data Visual
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Demografi & Potensi</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Eksplorasi interaktif data kependudukan serta persebaran fasilitas dan potensi di seluruh desa se-Kecamatan Cigedug.
          </p>
        </div>
      </section>

      {/* Main Content - Dashboard Client Component */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-32">
        <Dashboard initialData={popData} mappedData={mapData} />
      </section>
    </div>
  );
}

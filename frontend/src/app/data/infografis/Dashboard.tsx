"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ReferenceLine, ComposedChart
} from 'recharts';
import type { PopulationData, MappedData } from './page';

// === Data Statis UMKM (dari REKAP DATA UMKM BPUM TA 2026) ===
const UMKM_PER_DESA = [
  { desa: 'Sindangsari', jumlah: 416 },
  { desa: 'Barusuda', jumlah: 276 },
  { desa: 'Cintanagara', jumlah: 154 },
  { desa: 'Cigedug', jumlah: 151 },
  { desa: 'Sukahurip', jumlah: 83 },
];

const UMKM_BIDANG = [
  { bidang: 'Dagang/Warung', jumlah: 313 },
  { bidang: 'Kuliner', jumlah: 95 },
  { bidang: 'Seblak/Cilor', jumlah: 59 },
  { bidang: 'Kelontong', jumlah: 41 },
  { bidang: 'Pertanian', jumlah: 40 },
  { bidang: 'Sayuran', jumlah: 27 },
  { bidang: 'Lainnya', jumlah: 133 },
];

const PENDIDIKAN_JENJANG = [
  { jenjang: 'PAUD/KB', jumlah: 6, color: '#ec4899' },
  { jenjang: 'SD/MI', jumlah: 25, color: '#3b82f6' },
  { jenjang: 'SMP/MTs', jumlah: 16, color: '#10b981' },
  { jenjang: 'SMA/MA', jumlah: 9, color: '#8b5cf6' },
  { jenjang: 'Pesantren', jumlah: 11, color: '#f59e0b' },
  { jenjang: 'PKBM/LKP', jumlah: 6, color: '#0ea5e9' },
];

const POSYANDU_PER_DESA = [
  { desa: 'Cintanagara', posyandu: 16, kader: 79 },
  { desa: 'Cigedug', posyandu: 13, kader: 63 },
  { desa: 'Barusuda', posyandu: 12, kader: 60 },
  { desa: 'Sukahurip', posyandu: 11, kader: 55 },
  { desa: 'Sindangsari', posyandu: 11, kader: 55 },
];

const DATA_RW: Record<string, number> = {
  'Cigedug': 14,
  'Barusuda': 13,
  'Sukahurip': 11,
  'Sindangsari': 13,
  'Cintanagara': 16,
};

const LINK_DATA = [
  { href: '/data/umkm', icon: 'storefront', label: 'Detail Data UMKM', color: 'text-emerald-600 bg-emerald-50' },
  { href: '/data/pendidikan', icon: 'school', label: 'Detail Pendidikan', color: 'text-blue-600 bg-blue-50' },
  { href: '/data/kesehatan', icon: 'local_hospital', label: 'Detail Kesehatan', color: 'text-rose-600 bg-rose-50' },
  { href: '/data/fasilitas-umum', icon: 'location_city', label: 'Fasilitas Umum', color: 'text-amber-600 bg-amber-50' },
];

interface DashboardProps {
  initialData: PopulationData[];
  mappedData?: MappedData[];
}

const COLORS = ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'];
const MAP_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#64748b'];

export default function Dashboard({ initialData, mappedData = [] }: DashboardProps) {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedDesa, setSelectedDesa] = useState<string>('All');

  // --- Filtering ---
  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const matchYear = selectedYear === 'All' || item.tahun === selectedYear;
      const matchDesa = selectedDesa === 'All' || item.nama_desa_kelurahan === selectedDesa;
      return matchYear && matchDesa;
    });
  }, [initialData, selectedYear, selectedDesa]);

  // --- Get Unique Filter Options ---
  const years = useMemo(() => Array.from(new Set(initialData.map(d => d.tahun))).sort().reverse(), [initialData]);
  const desas = useMemo(() => Array.from(new Set(initialData.map(d => d.nama_desa_kelurahan))).sort(), [initialData]);

  // --- Calculations for Visuals ---

  // 1. Total Penduduk
  const totalPenduduk = filteredData.reduce((sum, item) => sum + item.jumlah_penduduk, 0);

  // YoY Growth Calculation
  const growthData = useMemo(() => {
    if (selectedYear !== 'All') {
      const currentYear = parseInt(selectedYear, 10);
      const prevYear = (currentYear - 1).toString();
      
      const prevYearData = initialData.filter(item => {
        const matchYear = item.tahun === prevYear;
        const matchDesa = selectedDesa === 'All' || item.nama_desa_kelurahan === selectedDesa;
        return matchYear && matchDesa;
      });
      
      if (prevYearData.length === 0) return null;
      
      const prevTotal = prevYearData.reduce((sum, item) => sum + item.jumlah_penduduk, 0);
      const diff = totalPenduduk - prevTotal;
      
      return { diff: Math.abs(diff), isPositive: diff >= 0, text: `vs ${prevYear}` };
    } else {
      const maxYear = Math.max(...years.map(y => parseInt(y, 10))).toString();
      const prevYear = (parseInt(maxYear, 10) - 1).toString();
      
      const maxYearData = initialData.filter(item => item.tahun === maxYear && (selectedDesa === 'All' || item.nama_desa_kelurahan === selectedDesa));
      const prevYearData = initialData.filter(item => item.tahun === prevYear && (selectedDesa === 'All' || item.nama_desa_kelurahan === selectedDesa));
      
      if (maxYearData.length === 0 || prevYearData.length === 0) return null;
      
      const maxTotal = maxYearData.reduce((sum, item) => sum + item.jumlah_penduduk, 0);
      const prevTotal = prevYearData.reduce((sum, item) => sum + item.jumlah_penduduk, 0);
      const diff = maxTotal - prevTotal;
      
      return { diff: Math.abs(diff), isPositive: diff >= 0, text: `Tahun ${maxYear} vs ${prevYear}` };
    }
  }, [initialData, selectedYear, selectedDesa, totalPenduduk, years]);

  // 2. Gender Ratio (Pie Chart)
  const genderData = useMemo(() => {
    const male = filteredData.filter(d => d.jenis_kelamin === 'Laki-laki').reduce((sum, d) => sum + d.jumlah_penduduk, 0);
    const female = filteredData.filter(d => d.jenis_kelamin === 'Perempuan').reduce((sum, d) => sum + d.jumlah_penduduk, 0);
    return [
      { name: 'Laki-laki', value: male },
      { name: 'Perempuan', value: female }
    ].filter(d => d.value > 0);
  }, [filteredData]);

  // 3. Trend by Year (Line Chart)
  const trendData = useMemo(() => {
    // If year is filtered to a specific year, trend chart is less useful, but we'll still show it based on desa filter
    const baseData = selectedDesa === 'All' ? initialData : initialData.filter(d => d.nama_desa_kelurahan === selectedDesa);
    const groupedByYear: Record<string, { Laki_laki: number, Perempuan: number }> = {};
    
    baseData.forEach(d => {
      if (!groupedByYear[d.tahun]) groupedByYear[d.tahun] = { Laki_laki: 0, Perempuan: 0 };
      if (d.jenis_kelamin === 'Laki-laki') groupedByYear[d.tahun].Laki_laki += d.jumlah_penduduk;
      if (d.jenis_kelamin === 'Perempuan') groupedByYear[d.tahun].Perempuan += d.jumlah_penduduk;
    });

    return Object.keys(groupedByYear).sort().map(year => ({
      tahun: year,
      'Laki-laki': groupedByYear[year].Laki_laki,
      'Perempuan': groupedByYear[year].Perempuan,
    }));
  }, [initialData, selectedDesa]);

  // 4. Comparison by Village (Bar Chart)
  const villageData = useMemo(() => {
    const groupedByVillage: Record<string, { Laki_laki: number, Perempuan: number }> = {};
    
    filteredData.forEach(d => {
      if (!groupedByVillage[d.nama_desa_kelurahan]) groupedByVillage[d.nama_desa_kelurahan] = { Laki_laki: 0, Perempuan: 0 };
      if (d.jenis_kelamin === 'Laki-laki') groupedByVillage[d.nama_desa_kelurahan].Laki_laki += d.jumlah_penduduk;
      if (d.jenis_kelamin === 'Perempuan') groupedByVillage[d.nama_desa_kelurahan].Perempuan += d.jumlah_penduduk;
    });

    return Object.keys(groupedByVillage).map(village => ({
      desa: village,
      'Laki-laki': groupedByVillage[village].Laki_laki,
      'Perempuan': groupedByVillage[village].Perempuan,
      rw: DATA_RW[village] || 0
    }));
  }, [filteredData]);

  // 5. Growth Trend (Net Up/Down per year)
  const growthTrendData = useMemo(() => {
    const baseData = selectedDesa === 'All' ? initialData : initialData.filter(d => d.nama_desa_kelurahan === selectedDesa);
    const yearTotals: Record<string, number> = {};
    baseData.forEach(d => {
      yearTotals[d.tahun] = (yearTotals[d.tahun] || 0) + d.jumlah_penduduk;
    });

    const sortedYears = Object.keys(yearTotals).sort();
    const result = [];

    for (let i = 1; i < sortedYears.length; i++) {
      const prevYear = sortedYears[i - 1];
      const currYear = sortedYears[i];
      const diff = yearTotals[currYear] - yearTotals[prevYear];
      result.push({
        tahun: currYear,
        pertumbuhan: diff,
        label: `vs ${prevYear}`
      });
    }
    return result;
  }, [initialData, selectedDesa]);

  // --- Calculations for Mapped Data (Fasilitas & Potensi) ---
  const filteredMappedData = useMemo(() => {
    if (selectedDesa === 'All') return mappedData;
    return mappedData.filter(d => d.desa === selectedDesa);
  }, [mappedData, selectedDesa]);

  // 1. Pie Chart: Persebaran Kategori
  const mapKategoriData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredMappedData.forEach(d => {
      counts[d.kategori] = (counts[d.kategori] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] })).sort((a,b) => b.value - a.value);
  }, [filteredMappedData]);

  // 2. Pie Chart: Persebaran Fasilitas per Desa
  const mapDesaData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredMappedData.forEach(d => {
      counts[d.desa] = (counts[d.desa] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] })).sort((a,b) => b.value - a.value);
  }, [filteredMappedData]);

  // Format Number helper
  const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  if (initialData.length === 0) {
    return (
      <div className="p-8 text-center bg-rose-50 text-rose-600 rounded-2xl border border-rose-200">
        <span className="material-symbols-outlined text-4xl mb-2">error</span>
        <p>Data CSV tidak ditemukan atau format tidak sesuai. Pastikan file berada di `data set/Jumlah Penduduk Per Desa di Kecamatan Cigedug.csv`.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* --- Filter Slicers --- */}
      <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined">filter_alt</span>
          Slicer / Filter
        </div>
        
        <div className="flex flex-col">
          <label className="text-xs text-on-surface-variant font-bold mb-1 uppercase tracking-wider">Tahun</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="All">Semua Tahun</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-on-surface-variant font-bold mb-1 uppercase tracking-wider">Desa / Kelurahan</label>
          <select 
            value={selectedDesa} 
            onChange={(e) => setSelectedDesa(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="All">Semua Desa</option>
            {desas.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Card Visuals --- */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-white/10 blur-[50px] rounded-full"></div>
            <span className="material-symbols-outlined text-white/50 text-6xl absolute -bottom-4 -right-4">groups</span>
            <p className="text-blue-100 font-bold tracking-wider uppercase text-sm mb-2">Total Penduduk</p>
            <h2 className="text-5xl lg:text-6xl font-extrabold">{formatNumber(totalPenduduk)}</h2>
            
            {growthData && (
              <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold w-fit
                ${growthData.isPositive ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
                <span className="material-symbols-outlined text-[18px]">
                  {growthData.isPositive ? 'trending_up' : 'trending_down'}
                </span>
                {growthData.isPositive ? 'Naik' : 'Turun'} {formatNumber(growthData.diff)} jiwa ({growthData.text})
              </div>
            )}
            
            <p className="text-sm text-blue-100 mt-4 border-b border-white/20 pb-2">
              Berdasarkan filter {selectedYear !== 'All' ? `Tahun ${selectedYear}` : 'Semua Tahun'}
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">domain</span>
              {selectedDesa === 'All' ? '67 RW di 5 Desa' : `${DATA_RW[selectedDesa] || 0} RW (Desa ${selectedDesa})`}
            </div>
          </div>
        </div>

        {/* --- Donut Chart --- */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">donut_large</span>
            Rasio Demografi (Laki-laki vs Perempuan)
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={((value: number) => formatNumber(value) + ' Jiwa') as any} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Line Chart (Trend) --- */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            Tren Pertumbuhan Penduduk
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="tahun" />
                <YAxis tickFormatter={(val) => `${val / 1000}k`} />
                <RechartsTooltip formatter={((value: number) => formatNumber(value) + ' Jiwa') as any} />
                <Legend />
                <Line type="monotone" dataKey="Laki-laki" stroke={COLORS[0]} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Perempuan" stroke={COLORS[1]} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Bar Chart (Wilayah) --- */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">bar_chart</span>
            Perbandingan Populasi & RW Wilayah
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={villageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="desa" />
                <YAxis yAxisId="left" tickFormatter={(val) => `${val / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `${val} RW`} />
                <RechartsTooltip formatter={(value: any, name: any) => name === 'Jumlah RW' ? [value + ' RW', name] : [formatNumber(value) + ' Jiwa', name]} cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Legend />
                <Bar yAxisId="left" dataKey="Laki-laki" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="Perempuan" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="rw" name="Jumlah RW" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Line Chart (Pertumbuhan YoY) --- */}
      <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
        <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">ssid_chart</span>
          Grafik Tren Pertumbuhan Penduduk (Naik / Turun per Tahun)
        </h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis dataKey="tahun" />
              <YAxis />
              <RechartsTooltip 
                formatter={((value: number) => [
                  `${value > 0 ? '+' : ''}${formatNumber(value)} Jiwa`, 
                  'Pertumbuhan'
                ]) as any}
                labelFormatter={(label) => `Tahun ${label}`}
              />
              <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="pertumbuhan" 
                stroke="#10b981" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === SECTION: UMKM === */}
      <div className="flex items-center gap-3 mt-4 mb-2">
        <span className="material-symbols-outlined text-2xl text-emerald-600">storefront</span>
        <h2 className="text-2xl font-extrabold text-on-surface">Data UMKM</h2>
        <Link href="/data/umkm" className="ml-auto text-xs text-emerald-600 hover:underline flex items-center gap-1 font-bold">
          Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar: UMKM per Desa */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">bar_chart</span>
            Distribusi UMKM per Desa
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UMKM_PER_DESA} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="desa" width={80} tick={{ fontSize: 12 }} />
                <RechartsTooltip formatter={(v: any) => [`${v} pelaku`, 'Jumlah UMKM']} />
                <Bar dataKey="jumlah" fill="#10b981" radius={[0, 6, 6, 0]} label={{ position: 'right', fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie: Bidang Usaha */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">pie_chart</span>
            Bidang Usaha Terbanyak
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={UMKM_BIDANG} dataKey="jumlah" nameKey="bidang" cx="50%" cy="50%" outerRadius={100}
                  label={({ bidang, jumlah }: any) => `${bidang}: ${jumlah}`} labelLine={false}>
                  {UMKM_BIDANG.map((_, i) => <Cell key={i} fill={MAP_COLORS[i % MAP_COLORS.length]} />)}
                </Pie>
                <RechartsTooltip formatter={(v: any) => [`${v} pelaku`, 'Jumlah']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* === SECTION: PENDIDIKAN === */}
      <div className="flex items-center gap-3 mt-6 mb-2">
        <span className="material-symbols-outlined text-2xl text-blue-600">school</span>
        <h2 className="text-2xl font-extrabold text-on-surface">Data Pendidikan</h2>
        <Link href="/data/pendidikan" className="ml-auto text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold">
          Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
        <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">bar_chart</span>
          Jumlah Lembaga Pendidikan per Jenjang
        </h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PENDIDIKAN_JENJANG} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis dataKey="jenjang" />
              <YAxis allowDecimals={false} />
              <RechartsTooltip formatter={(v: any) => [`${v} lembaga`, 'Jumlah']} />
              <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
                {PENDIDIKAN_JENJANG.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-outline-variant/20">
          {PENDIDIKAN_JENJANG.map(j => (
            <div key={j.jenjang} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: j.color }} />
              <span className="text-xs text-on-surface-variant">{j.jenjang}: <b>{j.jumlah}</b></span>
            </div>
          ))}
          <span className="ml-auto text-xs text-on-surface-variant font-bold">Total: {PENDIDIKAN_JENJANG.reduce((s,j) => s + j.jumlah, 0)} lembaga</span>
        </div>
      </div>

      {/* === SECTION: KESEHATAN / POSYANDU === */}
      <div className="flex items-center gap-3 mt-6 mb-2">
        <span className="material-symbols-outlined text-2xl text-rose-600">local_hospital</span>
        <h2 className="text-2xl font-extrabold text-on-surface">Data Kesehatan & Posyandu</h2>
        <Link href="/data/kesehatan" className="ml-auto text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold">
          Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
        <h3 className="font-bold text-on-surface mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-rose-600">bar_chart</span>
          Jumlah Posyandu & Kader per Desa
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Sumber: Rekap Data Posyandu 2014, Kecamatan Cigedug</p>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={POSYANDU_PER_DESA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis dataKey="desa" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <RechartsTooltip formatter={(v: any, name: any) => [v, name === 'posyandu' ? 'Posyandu' : 'Kader']} />
              <Legend formatter={(val) => val === 'posyandu' ? 'Posyandu' : 'Kader'} />
              <Bar dataKey="posyandu" fill="#f43f5e" radius={[6, 6, 0, 0]} name="posyandu" />
              <Bar dataKey="kader" fill="#fda4af" radius={[6, 6, 0, 0]} name="kader" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-outline-variant/20">
          {[
            { icon: 'local_hospital', label: 'Puskesmas Induk', value: '1', color: 'text-red-600' },
            { icon: 'medical_services', label: 'Puskesdes', value: '4', color: 'text-rose-600' },
            { icon: 'favorite', label: 'Total Posyandu', value: '63', color: 'text-pink-600' },
            { icon: 'people', label: 'Total Kader', value: '312', color: 'text-purple-600' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
              <span className="text-xs text-on-surface-variant">{s.label}: <b className="text-on-surface">{s.value}</b></span>
            </div>
          ))}
        </div>
      </div>

      {/* === SECTION: FASILITAS UMUM === */}
      <div className="flex items-center gap-3 mt-6 mb-2">
        <span className="material-symbols-outlined text-2xl text-amber-600">location_city</span>
        <h2 className="text-2xl font-extrabold text-on-surface">Data Fasilitas Umum</h2>
        <Link href="/data/fasilitas-umum" className="ml-auto text-xs text-amber-600 hover:underline flex items-center gap-1 font-bold">
          Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Fasilitas per Kategori */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">bar_chart</span>
            Jumlah Fasilitas berdasarkan Kategori
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mapKategoriData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
                <RechartsTooltip formatter={(v: any) => [`${v} Lokasi`, 'Fasilitas']} />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 6, 6, 0]} label={{ position: 'right', fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Fasilitas per Desa */}
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">pie_chart</span>
            Sebaran Fasilitas per Desa
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mapDesaData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}
                  label={({ name, value }: any) => `${name}: ${value}`} labelLine={false}>
                  {mapDesaData.map((_, i) => <Cell key={i} fill={MAP_COLORS[i % MAP_COLORS.length]} />)}
                </Pie>
                <RechartsTooltip formatter={(v: any) => [`${v} Lokasi`, 'Fasilitas']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* === SECTION: Shortcut ke Sub-Halaman === */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-on-surface mb-4">Jelajahi Data Lebih Lengkap</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LINK_DATA.map(link => (
            <Link key={link.href} href={link.href}
              className="flex flex-col items-center gap-2 p-5 bg-white dark:bg-surface-container-low border border-outline-variant/40 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all group">
              <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
              </div>
              <span className="text-sm font-semibold text-on-surface text-center group-hover:text-primary transition-colors">{link.label}</span>
              <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- Matrix / Table Detail Penduduk --- */}
      <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <h3 className="font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">table_chart</span>
            Tabel Detail Data Kependudukan
          </h3>
          <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
            {filteredData.length} Baris
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container uppercase text-xs text-on-surface-variant font-bold">
              <tr>
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4">Desa/Kelurahan</th>
                <th className="px-6 py-4">Jenis Kelamin</th>
                <th className="px-6 py-4 text-right">Jumlah (Jiwa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredData.slice(0, 50).map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-3 font-medium">{row.tahun}</td>
                  <td className="px-6 py-3 font-bold text-primary">{row.nama_desa_kelurahan}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.jenis_kelamin === 'Laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {row.jenis_kelamin}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-mono">{formatNumber(row.jumlah_penduduk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length > 50 && (
            <div className="p-4 text-center text-sm text-on-surface-variant border-t border-outline-variant/30">
              Menampilkan 50 baris pertama. Gunakan filter untuk mempersempit data.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

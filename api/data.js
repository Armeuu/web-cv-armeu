/**
 * Vercel Serverless Function: Profile Data
 */

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    status: 'success',
    data: {
      personal: {
        name: 'Ahmad Rizqi Maulana',
        title: 'Mahasiswa Informatika UMM & Web Developer',
        location: 'Malang, Jawa Timur, Indonesia',
        email: 'ahmadrizqimaulanaa@webmail.umm.ac.id',
        phone: '085337659146',
        linkedin: 'https://www.linkedin.com/in/ahmad-rizqi-maulana-8b0a80327',
        status: 'Mahasiswa Aktif S1 Informatika UMM'
      },
      education: [
        { institution: 'Universitas Muhammadiyah Malang (UMM)', degree: 'S1 Teknik Informatika', period: '2024 — Sekarang' },
        { institution: 'SMK Negeri 1 Wadeng', degree: 'Pendidikan Menengah Kejuruan (Pendidikan Terakhir)', period: '2021 — 2024' }
      ],
      experience: [
        { company: 'PT. Eastern Logistik', role: 'Peserta Magang Industri', period: 'Agustus 2022 — Februari 2023 (6 Bulan)' }
      ],
      server_info: {
        platform: 'Vercel Serverless Cloud',
        environment: 'Production'
      }
    }
  });
}


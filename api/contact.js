export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      server: 'Vercel Serverless (Production)',
      message: 'API Kontak Berjalan Normal di Vercel',
      total_pesan: 'Cloud Persisted',
      timestamp: new Date().toISOString()
    });
  }
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body || {};
    const errors = [];
    if (!name || name.trim().length < 3) errors.push('Nama minimal 3 karakter.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Format email tidak valid.');
    if (!subject || subject.trim().length < 1) errors.push('Subjek wajib diisi.');
    if (!message || message.trim().length < 10) errors.push('Pesan minimal 10 karakter.');
    if (errors.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Validasi gagal', errors });
    }
    return res.status(200).json({
      status: 'success',
      message: `Terima kasih, ${name.trim()}! Pesan Anda berhasil dikirim ke server Ahmad Rizqi Maulana.`,
      data: {
        id: 'msg_' + Date.now(),
        timestamp: new Date().toISOString()
      }
    });
  }
  return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
}

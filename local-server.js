const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  if (pathname === '/api/contact' || pathname === '/api/contact.php') {
    if (req.method === 'GET') {
      let count = 0;
      try {
        if (fs.existsSync(DATA_FILE)) {
          const raw = fs.readFileSync(DATA_FILE, 'utf8');
          const data = JSON.parse(raw);
          count = Array.isArray(data) ? data.length : 0;
        }
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'online',
        server: 'Node.js ' + process.version,
        message: 'API Kontak Berjalan Normal (Node.js Backend)',
        total_pesan: count,
        timestamp: new Date().toISOString()
      }));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          let parsed = {};
          if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            parsed = JSON.parse(body || '{}');
          } else {
            const params = new URLSearchParams(body);
            for (const [k, v] of params) parsed[k] = v;
          }
          const { name, email, subject, message } = parsed;
          const errors = [];
          if (!name || name.trim().length < 3) errors.push('Nama minimal 3 karakter.');
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Format email tidak valid.');
          if (!subject || subject.trim().length < 1) errors.push('Subjek wajib diisi.');
          if (!message || message.trim().length < 10) errors.push('Pesan minimal 10 karakter.');
          if (errors.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'Validasi gagal', errors }));
            return;
          }
          const newMsg = {
            id: 'msg_' + Date.now(),
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
            ip: req.socket.remoteAddress || '127.0.0.1',
            createdAt: new Date().toISOString()
          };
          let messages = [];
          if (fs.existsSync(DATA_FILE)) {
            try {
              messages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
            } catch (err) {
              messages = [];
            }
          }
          messages.push(newMsg);
          fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'success',
            message: `Terima kasih, ${newMsg.name}! Pesan Anda berhasil dikirim (Node.js Backend).`,
            data: { id: newMsg.id, timestamp: newMsg.createdAt }
          }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Terjadi kesalahan internal server: ' + err.message }));
        }
      });
      return;
    }
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Method Not Allowed' }));
    return;
  }
  if (pathname === '/api/data' || pathname === '/api/data.php') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
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
          node_version: process.version,
          environment: 'Development',
          system: process.platform
        }
      }
    }));
    return;
  }
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(__dirname, safePath);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 CV Personal Server Aktif: http://localhost:${PORT}`);
  console.log(`📡 Backend API: http://localhost:${PORT}/api/contact`);
  console.log(`💻 Node.js Runtime: ${process.version}`);
  console.log(`====================================================`);
});

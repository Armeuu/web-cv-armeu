<?php
/**
 * API Endpoint: Contact Form Handler
 * Bahasa Pemrograman Lain: PHP (Backend Processing)
 * Menangani validasi, sanitasi, dan penyimpanan pesan kontak ke file JSON.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tangani preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/messages.json';

// Tangani GET request (Pemeriksaan status endpoint)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $count = 0;
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        $count = is_array($data) ? count($data) : 0;
    }
    echo json_encode([
        'status' => 'online',
        'message' => 'API Kontak Berjalan Normal',
        'total_pesan' => $count,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Tangani POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data baik dari FormData maupun JSON Body
    $inputJSON = json_decode(file_get_contents('php://input'), true);
    
    $name    = trim($inputJSON['name'] ?? $_POST['name'] ?? '');
    $email   = trim($inputJSON['email'] ?? $_POST['email'] ?? '');
    $subject = trim($inputJSON['subject'] ?? $_POST['subject'] ?? '');
    $message = trim($inputJSON['message'] ?? $_POST['message'] ?? '');

    $errors = [];

    // Validasi Nama
    if (empty($name)) {
        $errors[] = 'Nama wajib diisi.';
    } elseif (strlen($name) < 3) {
        $errors[] = 'Nama minimal 3 karakter.';
    }

    // Validasi Email
    if (empty($email)) {
        $errors[] = 'Email wajib diisi.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Format email tidak valid.';
    }

    // Validasi Subjek
    if (empty($subject)) {
        $errors[] = 'Subjek pesan wajib diisi.';
    }

    // Validasi Pesan
    if (empty($message)) {
        $errors[] = 'Isi pesan tidak boleh kosong.';
    } elseif (strlen($message) < 10) {
        $errors[] = 'Pesan minimal berisi 10 karakter.';
    }

    // Jika terdapat kesalahan validasi
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Validasi gagal',
            'errors' => $errors
        ]);
        exit;
    }

    // Sanitasi data
    $cleanData = [
        'id'        => uniqid('msg_', true),
        'name'      => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        'email'     => filter_var($email, FILTER_SANITIZE_EMAIL),
        'subject'   => htmlspecialchars($subject, ENT_QUOTES, 'UTF-8'),
        'message'   => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
        'ip'        => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        'createdAt' => date('c')
    ];

    // Simpan ke berkas data/messages.json
    $currentMessages = [];
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $currentMessages = json_decode($content, true) ?: [];
    }

    $currentMessages[] = $cleanData;

    if (file_put_contents($dataFile, json_encode($currentMessages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        http_response_code(200);
        echo json_encode([
            'status'  => 'success',
            'message' => 'Terima kasih, ' . $cleanData['name'] . '! Pesan Anda berhasil dikirim dan tersimpan di server.',
            'data'    => [
                'id' => $cleanData['id'],
                'timestamp' => $cleanData['createdAt']
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Gagal menyimpan pesan ke server. Silakan coba lagi.'
        ]);
    }
    exit;
}

// Metode tidak didukung
http_response_code(405);
echo json_encode([
    'status' => 'error',
    'message' => 'Metode HTTP tidak diizinkan.'
]);

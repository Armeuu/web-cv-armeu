<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
$cvData = [
    'personal' => [
        'name' => 'Ahmad Rizqi Maulana',
        'title' => 'Mahasiswa Informatika UMM & Web Developer',
        'location' => 'Malang, Jawa Timur, Indonesia',
        'email' => 'ahmadrizqimaulanaa@webmail.umm.ac.id',
        'phone' => '085337659146',
        'linkedin' => 'https://www.linkedin.com/in/ahmad-rizqi-maulana-8b0a80327',
        'status' => 'Mahasiswa Aktif S1 Informatika UMM'
    ],
    'education' => [
        [
            'institution' => 'Universitas Muhammadiyah Malang (UMM)',
            'degree' => 'S1 Teknik Informatika',
            'period' => '2024 — Sekarang (Masuk 2024)'
        ],
        [
            'institution' => 'SMK Negeri 1 Wadeng',
            'degree' => 'Pendidikan Menengah Kejuruan (Pendidikan Terakhir)',
            'period' => '2021 — 2024 (Lulus 2024)'
        ]
    ],
    'experience' => [
        [
            'company' => 'PT. Eastern Logistik',
            'role' => 'Peserta Magang Industri (Internship)',
            'period' => 'Agustus 2022 — Februari 2023 (6 Bulan)',
            'description' => 'Praktik kerja industri selama 6 bulan di PT. Eastern Logistik.'
        ]
    ],
    'server_info' => [
        'php_version' => PHP_VERSION,
        'environment' => 'Development',
        'system' => PHP_OS
    ]
];
echo json_encode([
    'status' => 'success',
    'data' => $cvData
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

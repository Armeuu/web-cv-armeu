<?php
/**
 * API Endpoint: CV Data & Statistics
 * Mengembalikan data profil dan statistik secara dinamis dalam format JSON
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

$cvData = [
    'personal' => [
        'name' => 'Rizqi Maulana',
        'title' => 'Full Stack Web Developer & Software Engineer',
        'location' => 'Indonesia',
        'email' => 'rizqi.maulana.dev@example.com',
        'phone' => '+62 812-3456-7890',
        'github' => 'https://github.com/rizqimaulana',
        'linkedin' => 'https://linkedin.com/in/rizqimaulana',
        'status' => 'Terbuka untuk Peluang Kerja & Kolaborasi'
    ],
    'statistics' => [
        'years_experience' => '2+',
        'completed_projects' => '15+',
        'satisfied_clients' => '10+',
        'certifications' => '8+'
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

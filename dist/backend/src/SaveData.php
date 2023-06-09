<?php

require '../vendor/autoload.php';
// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Read the existing Excel file
$spreadsheet = IOFactory::load('../printData.xlsx');

// Get the first worksheet
$worksheet = $spreadsheet->getActiveSheet();

// Find the next available row
$highestRow = $worksheet->getHighestRow();
$row = $highestRow + 1;

// Get the JSON data from the request
$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);
 
// Write the data to the worksheet
$column = 'A';
foreach ($data as $value) {
  $worksheet->setCellValue($column . $row, $value);
  $column++;
}

// Save the modified Excel file
$writer = new Xlsx($spreadsheet);
$writer->save('../printData.xlsx');

// Optional: Send a response back to the frontend
echo 'Data saved successfully';

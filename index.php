<?php
// Incluimos los controladores y otros archivos necesarios
require_once 'app/controllers/UserController.php';

// Obtener la URL desde los parámetros GET
$url = isset($_GET['url']) ? $_GET['url'] : null;

if ($url) {
    // Dividimos la URL para obtener el controlador y el método
    $urlParts = explode('/', $url);
    $controller = $urlParts[0];
    $method = isset($urlParts[1]) ? $urlParts[1] : null;

    // Verificamos si el controlador es "User" y llamamos a su método correspondiente
    if ($controller === 'User' && $method === 'crear') {
        UserController::crear();  // Llamamos al método estático crear()
    } elseif ($controller === 'User' && $method === 'InsertStudent') {
        UserController::crear();  // Llamamos a InsertStudent()
    } else {
        // Manejar rutas no encontradas
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['success' => false, 'message' => 'Ruta no encontrada']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se especificó ninguna URL']);
}
?>

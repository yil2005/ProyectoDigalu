<?php
use Models\DynamicQuery;
require_once __DIR__ . '/../models/DynamicQuery.php';
require_once  __DIR__. '/../helpers/DataValidator.php';

class UserController {
    private static $Query;

    public static function init() {
        self::$Query = new DynamicQuery("usuario");
    }

    public static function verificarSesion() {
        session_start();
        if (!isset($_SESSION['user'])) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Sesión no iniciada, redirigiendo a login.html']);
            exit;
        }
    }

    public static function crear() {

        self::init();            
        header('Content-Type: application/json');
        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
    
        $validation = false;
        $message = '';
        $responseData = [];  
    
        // Verificar errores en la decodificación JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            $message = 'Error al decodificar el JSON';
            $responseData = ['success' => $validation, 'message' => $message, 'data' => null];
        } else {
            // Validar los datos recibidos
            $errors = DataValidator::validateData($data);
            if (!empty($errors)) {
                $message = 'Datos inválidos';
                $responseData = ['success' => $validation, 'message' => $message, 'errors' => $errors];
            } elseif (empty($data) || self::arrayValuesEmpty($data)) {
                $message = 'Datos vacíos';
                $responseData = ['success' => $validation, 'message' => $message, 'data' => null];
            } else {
                // Intentar crear el registro en la base de datos
                $result = self::$Query->created($data);
                if ($result['success']) {
                    $validation = true;
                    $message = 'Datos recibidos y guardados';
    
                    // Si la creación es exitosa, intentar obtener los datos recién creados
                    $result = self::$Query->obtenerPorId(['id_usuario' => $result['id']]);
                    if ($result['success']) {
                        $responseData = [
                            'success' => $validation,
                            'message' => $message,
                            'data' => $result['data'] // Retornar los datos del registro recién creado
                        ];
                    } else {
                        // Si no se pudo recuperar el registro, mostrar un mensaje adecuado
                        $message = 'Error al recuperar los datos recién creados';
                        $responseData = ['success' => $validation, 'message' => $message, 'data' => null];
                    }
                } else {
                    // Si la creación falla, mostrar el mensaje de error
                    $message = $result['message'];
                    $responseData = ['success' => $validation, 'message' => $message, 'data' => null];
                }
            }
        }
    
        // Enviar la respuesta como JSON
        echo json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit; 
    }

    

    public static function login() {
        self::init();
        header('Content-Type: application/json');

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
    

        if (!isset($data['correo']) || !isset($data['pws'])) {
            echo json_encode(['success' => false, 'message' => 'Correo y contraseña son requeridos'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit;
        }

        $result = self::$Query->login($data);

        if ($result['success']) {
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);         
        } else {
            echo("Error");            
        }
        exit;
    }

    public function ecommerce(){
        self::init();        
        header('Content-Type: application/json');

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
    
    }

    
    



   

    private static function arrayValuesEmpty($array) {
        foreach ($array as $value) {
            if (!empty($value)) {
                return false;
            }
        }
        return true;
    }
}

?>
<?php
namespace helpers;
require_once __DIR__ . '/../models/QueryInnerjoin.php';

class Helper{
    // Método para verificar Encriptar contraseña
    public static function EncriptarPws($pws){
        return  hash('sha256', $pws);
    }
    public static function verificarContraseña($password, $hashedPassword) {
       // Comparar la contraseña ingresada con el hash almacenado
    if (password_verify($password, $hashedPassword)) {
        echo "Verificación exitosa: Las contraseñas coinciden.<br>";
        return true;
    } else {
        echo "Verificación fallida: Las contraseñas no coinciden.<br>";
        return false;
    }

    }

    //Método para eliminar contraseña del array
    public static function excludePassword($data) {
        foreach ($data as &$row) {
            unset($row['pws']);
        }
        return $data;
    }

}
?>
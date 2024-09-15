<?php
namespace models;

require_once __DIR__ . '/conexion.php'; 
require_once __DIR__ . '/DataAccessInterface.php';

abstract class DatabaseHandler implements DataAccessInterface {
    protected $conexion;

    public function __construct() {
        $this->conexion = Conexion::getInstancia()->getConexion();
    }

    abstract public function obtenerTodos();
    abstract public function obtenerPorId($id);
    abstract public function created($datos);
    abstract public function actualizar($datos);
    abstract public function eliminar($datos);

    protected function prepareAndExecute($query, $types = '', $params = []) {
        // Preparar la consulta
        $stmt = mysqli_prepare($this->conexion, $query);
        if ($stmt === false) {           
            return [false, "Error en mysqli_prepare: " . mysqli_error($this->conexion)];
        }
    
        // Si hay tipos y parámetros, vincularlos
        if (!empty($types) && !empty($params)) {
            // Verifica si params es un array de arrays o solo un array
            if (!is_array($params[0])) {
                $params = [$params]; // Convertir a array de arrays si no lo es
            }
    
            // Crear un array de referencias para bind_param
            $bindParams = array_merge([$types], $params[0]);
            $refParams = [];
            
            foreach ($bindParams as $key => $value) {
                $refParams[$key] = &$bindParams[$key];
            }
    
            // Vincular los parámetros
            if (!mysqli_stmt_bind_param($stmt, ...$refParams)) {
                return [false, "Error en mysqli_stmt_bind_param: " . mysqli_stmt_error($stmt)];
            }
        }
    
        // Ejecutar la consulta
        if (!mysqli_stmt_execute($stmt)) {
            return [false, "Error en mysqli_stmt_execute: " . mysqli_stmt_error($stmt)];
        }
    
        return [true, $stmt];
    }
    
    public function cerrarConexion() {
        Conexion::getInstancia()->cerrarConexion();
    }
}
?>

<?php
namespace models;
use helpers\Helper;
require_once 'QueryInnerjoin.php';
require_once 'DatabaseHandler.php';
require_once 'QueryBuilder.php';
require_once __DIR__ . '/../helpers/Helper.php'; 

class DynamicQuery extends DatabaseHandler {
    private $table;

    public function __construct($table) {
        parent::__construct();
        $this->table = $table;
    }

    /* me traea todo los datos de la tabla */
    public function obtenerTodos() {
        $query = QueryBuilder::QueryGetAll($this->table);
        $result = mysqli_query($this->conexion, $query);        
        if ($result) {
            $data = $this->fetchResults($result);
            $data = Helper::excludePassword($data);
            $response = ['success' => true, 'data' => $data];
        } else {
            $response = ['success' => false, 'error' => mysqli_error($this->conexion)];
        }
        $this->cerrarConexion();
        return $response;
    }

    /* ejecuta traer todos los datos siempre cuando no sea un usuario */
    public function get(){
        $query = QueryBuilder::QueryGetAll($this->table);
        $result = mysqli_query($this->conexion, $query);
        if ($result) {
            $data = $this->fetchResults($result);           
            $response = ['success' => true, 'data' => $data];
        } else {
            $response = ['success' => false, 'error' => mysqli_error($this->conexion)];
        }
        $this->cerrarConexion();
        return $response;


    }
  /* ejecuta Read por if */
  public function obtenerPorId($datos) {
    list($params, $query) = QueryBuilder::GetId($this->table, $datos);

    // Construir la cadena de tipos basada en el número de parámetros
    $types = str_repeat('s', count($params)); // Suponiendo que todos los parámetros son strings

    list($success, $stmtOrError) = $this->prepareAndExecute($query, $types, $params);

    if ($success) {
        $result = $stmtOrError->get_result();
        $data = mysqli_fetch_assoc($result);
        if ($data) {
            $data = Helper::excludePassword([$data]);
            $result = ['success' => true, 'data' => $data[0]];
        } else {
            $result = ['success' => false, 'message' => 'Este registro no existe'];
        }
    } else {
        $result = ['success' => false, 'message' => 'Error en la consulta: ' . $stmtOrError];
    }
    $this->cerrarConexion();
    return $result;
}


    
  /* crea un nueva registro siempre cuando este un dato pws(password)*/
    public function created($datos) {
        
        return $this->insert($datos);
    }

    /* Ejucuta la consulta update */
    public function actualizar($datos) {
        // Encontrar la clave del identificador de forma dinámica
        $sql = "";           
        list($sql, $values) = QueryBuilder::QueryUpdate($this->table, $datos);        
        // Ejecutar la consulta
        $tipos = str_repeat('s', count($values) - 1) . 'i';    
        list($success, $stmtOrError) = $this->prepareAndExecute($sql, $tipos, $values);    
        if ($success) {
            return ['success' => true, 'message' => 'Actualización exitosa'];
        } else {
            return ['success' => false, 'message' => 'Error al actualizar: ' . $stmtOrError];
        }
        $this->cerrarConexion();
    }
    
    
/* ejecuta la consulta Delete */
    public function eliminar($datos) {
        $sql = "";        
        $types = 's'; // Cambiar 's' por el tipo correcto según el tipo de dato de la columna
        $params = array_values($datos); 
        $sql = QueryBuilder::QueryDelete($this->table, $datos);   
        list($success, $stmtOrError) = $this->prepareAndExecute($sql, $types, $params);    
        if ($success) {
            return ['success' => true, 'message' => 'Eliminación exitosa'];
        } else {
            return ['success' => false, 'message' => 'Error al eliminar: ' . $stmtOrError];
        }
        $this->cerrarConexion();
    }   

    
/* ejecuta la conusltar insert */
    private function insert($datos) {       
        $tipos = str_repeat('s', count($datos));        
        $sql = QueryBuilder::QueryInsert($this->table, $datos);
        try {
            list($success, $stmtOrError) = $this->prepareAndExecute($sql, $tipos, array_values($datos));           
            if ($success) {
                return ['success' => true, 'id' => mysqli_stmt_insert_id($stmtOrError)];
            } else {
                if (strpos($stmtOrError, "Duplicate entry") !== false) {
                    return ['success' => false, 'message' => 'Este registro ya se encuentra registrado', 'data' => null];
                } else {
                    return ['success' => false, 'message' => $stmtOrError];
                }
            }
        } catch (\mysqli_sql_exception $e) {     
           
        return ['success' => false, 'message' => 'Error al insertar: ' . $e->getMessage()];
            
        }
        $this->cerrarConexion();
    }

      /* realiza los consulta al login a la base de datos */
      public function login($data) { 
       
        list($sql, $params) = QueryBuilder::GetLogin($this->table, $data);           
        list($success, $stmtOrError) = $this->prepareAndExecute($sql, 's', [$params[0]]);
        
        if ($success) {
            // Obtener el resultado de la consulta
            $result = $stmtOrError->get_result();
            $user = mysqli_fetch_assoc($result);            

            if($data['pws'] == $user['pws']){
                return ['success'=> true, "data" => $user];

            }
        }
            
           
    
        // Cerrar la conexión
        $this->cerrarConexion();
    }

    
    
     /* Ejecuta los resultado de la consulta los ordena */        
    private function fetchResults($result) {
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        return $data;
    }
}
?>

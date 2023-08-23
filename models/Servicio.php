<?php

namespace Model;

class Servicio extends ActiveRecord
{
    //Base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'precio', 'nombre'];

    public $id;
    public $precio;
    public $nombre;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->precio = $args['precio'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
    }

    public function validar()
    {
        if (!$this->nombre) {
            self::$alertas['error'][] = 'El nombre del servicio es obligatorio';
        }
        if (!$this->precio) {
            self::$alertas['error'][] = 'El precio del servicio es obligatorio';
        }
        if (!is_numeric($this->precio)) {
            self::$alertas['error'][] = 'El precio del servicio no es válido';
        }
        return self::$alertas;
    }
}

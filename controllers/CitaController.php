<?php

namespace Controllers;

use MVC\Router;
use Classes\Email;
use Model\Usuario;

class CitaController
{
    public static function index(Router $router)
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        isAuth();

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }
}

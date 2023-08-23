<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\APIController;
use MVC\Router;
use Controllers\LoginController;
use Controllers\CitaController;
use Controllers\AdminController;
use Controllers\ServicioController;

$router = new Router();

// iniciar sesion

$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

// Recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

// crear Cuenta
$router->get('/crearCuenta', [LoginController::class, 'crear']);
$router->post('/crearCuenta', [LoginController::class, 'crear']);

// Confirmar cuenta
$router->get('/confirmarCuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

// Area Privada
$router->get('/cita', [CitaController::class, 'index']);
$router->get('/admin', [AdminController::class, 'index']);

// API de Citas
$router->get('/apiServicios', [APIController::class, 'index']);
$router->post('/apiCitas', [APIController::class, 'guardar']);
$router->post('/apiEliminar', [APIController::class, 'eliminar']);

// CRUD de Servicios
$router->get('/servicios', [ServicioController::class, 'index']);
$router->get('/serviciosCrear', [ServicioController::class, 'crear']);
$router->post('/serviciosCrear', [ServicioController::class, 'crear']);
$router->get('/serviciosActualizar', [ServicioController::class, 'actualizar']);
$router->post('/serviciosActualizar', [ServicioController::class, 'actualizar']);
$router->post('/serviciosEliminar', [ServicioController::class, 'eliminar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();

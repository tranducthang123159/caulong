<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\AuthController;

Route::post('/signup', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/users', [AuthController::class, 'index']);
Route::post('/users', [AuthController::class, 'store']);
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'delete']);

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;

Route::get('/categories', [CategoryController::class, 'index']);
// routes/api.php
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::get('/products/{id}', [ProductController::class, 'show']);
// routes/api.php

Route::get('/products/search', [ProductController::class, 'search']);


Route::apiResource('customers', CustomerController::class);
Route::apiResource('orders', OrderController::class);


Route::get('/categories', [CategoryController::class, 'index']); // Lấy danh sách danh mục
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Lấy chi tiết danh mục
Route::post('/categories', [CategoryController::class, 'store']); // Tạo danh mục mới
Route::put('/categories/{id}', [CategoryController::class, 'update']); // Cập nhật danh mục
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Xóa danh mục
Route::get('/categories/{categoryId}/products', [CategoryController::class, 'getProductsByCategory']);


Route::post('/orders', [OrderController::class, 'store']);

Route::get('/orders', [OrderController::class, 'index']);  // Sửa lại đường dẫn đúng là /orders
Route::get('/orders/{id}', [OrderController::class, 'show']);  // Lấy chi tiết đơn hàng
Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);


Route::get('/test', function () {
    return 'Hello, world!';
});

Route::get('/dashboard', function () {
    // Lấy số lượng người dùng
    $usersCount = \App\Models\User::count();

    // Lấy số lượng sản phẩm
    $productsCount = \App\Models\Product::count();

    // Lấy số lượng đơn hàng
    $ordersCount = \App\Models\Order::count();

    // Tính tổng doanh thu từ các đơn hàng
    $revenue = \App\Models\Order::sum('total_price');  // Cập nhật tên cột cho phù hợp

    // Lấy 3 sản phẩm mới nhất
    $recentProducts = \App\Models\Product::latest()->take(3)->get();

    // Lấy 3 đơn hàng mới nhất
    $recentOrders = \App\Models\Order::latest()->take(3)->get();

    // Log kết quả

    return response()->json([
        'usersCount' => $usersCount,
        'productsCount' => $productsCount,
        'ordersCount' => $ordersCount,
        'revenue' => $revenue,
        'recentProducts' => $recentProducts,
        'recentOrders' => $recentOrders,
    ]);
});

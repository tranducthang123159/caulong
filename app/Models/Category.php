<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

        protected $fillable = ['name', 'description'];

    public function index()
    {
        // Lấy tất cả danh mục từ cơ sở dữ liệu
        $categories = Category::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($categories);
    }
}

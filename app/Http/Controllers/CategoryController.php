<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Lấy tất cả danh mục từ cơ sở dữ liệu
        $categories = Category::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    
        $category = Category::create($request->only(['name', 'description']));
        return response()->json($category, 201);
    }
    

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    
        $category->update($request->only(['name', 'description']));
        return response()->json($category);
    }
    

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
    
        return response()->json(['message' => 'Category deleted successfully']);
    }
    
}

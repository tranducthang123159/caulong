<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

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
    public function getProductsByCategory($categoryId)
    {
        // Kiểm tra xem categoryId có phải là số hợp lệ không
        if (!is_numeric($categoryId)) {
            return response()->json(['message' => 'Invalid category ID'], 400);
        }
    
        // Tìm danh mục theo ID
        $category = Category::find($categoryId);
    
        // Nếu không tìm thấy danh mục, trả về lỗi 404
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        // Lấy các sản phẩm thuộc danh mục với category_id chính xác
        $products = Product::where('category_id', $categoryId)->get();
    
        // Kiểm tra nếu không có sản phẩm
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found for this category'], 404);
        }
    
        // Trả về các sản phẩm dưới dạng JSON và bao gồm cả danh mục
        return response()->json($products->map(function ($product) use ($category) {
            return [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->quantity,
                'description' => $product->description,
                'image_url' => $product->image_url,
                'category' => $category, // Thêm thông tin về category
            ];
        }), 200);
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

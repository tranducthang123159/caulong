<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;





class ProductController extends Controller
{


    // public function index()
    // {
    //     // Lấy tất cả sản phẩm, có thể thêm các tham số như phân trang nếu cần
    //     $products = Product::all();
    //     return response()->json($products);
    // }


    public function index()
    {
        // Eager load category and fetch all products
        $products = Product::with('category')->get();

        // Append the base URL for the image path
        $baseUrl = asset(''); // Base URL for your Laravel project

        // Map over the products and update image URLs
        $products = $products->map(function ($product) use ($baseUrl) {
            // Ensure the image URL is correct
            $product->image_url = $baseUrl . '/' . ltrim($product->image_url, '/'); // Fix the image URL
            return $product;
        });

        // Return the products as JSON
        return response()->json($products);
    }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'nullable|string',
    //         'price' => 'required|numeric',
    //         'quantity' => 'required|integer',
    //         'category_id' => 'required|exists:categories,id',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

    //     // Xử lý ảnh nếu có
    //     $imagePath = null;
    //     if ($request->hasFile('image')) {
    //         $imagePath = $request->file('image')->store('public/images');
    //     }

    //     // Tạo sản phẩm mới
    //     $product = Product::create([
    //         'name' => $request->name,
    //         'description' => $request->description,
    //         'price' => $request->price,
    //         'quantity' => $request->quantity,
    //         'category_id' => $request->category_id,
    //         'image_url' => $imagePath, // Lưu đường dẫn ảnh
    //     ]);

    //     return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Xử lý ảnh nếu có
        $imagePath = null;
        if ($request->hasFile('image')) {
            // Lưu ảnh vào thư mục public/storage/images mà không có "public/"
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Tạo sản phẩm mới
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
            'image_url' => $imagePath, // Lưu chỉ đường dẫn ảnh mà không có "public/"
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }



    // ProductController.php

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,  // Update the category_id
        ]);
        return response()->json($product);
    }




    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }


    public function show($id)
    {
        // Find the product by its ID
        $product = Product::with('category')->findOrFail($id);

        // Append the base URL for the image path
        $baseUrl = asset(''); // Base URL for your Laravel project

        // Ensure the image URL is correct
        $product->image_url = $baseUrl . '/' . ltrim($product->image_url, '/'); // Fix the image URL

        // Return the product as JSON
        return response()->json($product);
    }

    
}

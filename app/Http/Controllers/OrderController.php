<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate the input data
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'shipping_address' => 'required|string|max:255',
            'items' => 'required|array',
        ]);

        // Check if customer exists or create a new customer
        $customer = Customer::firstOrCreate(
            ['email' => $validated['customer_email']], // Find customer by email
            [
                'name' => $validated['customer_name'],
                'phone' => $request->phone, // Optionally include phone
                'address' => $validated['shipping_address'], // Save shipping address in customer profile
            ]
        );

        // Create the order and associate it with the customer
        $order = Order::create([
            'customer_id' => $customer->id, // Associate the order with the customer
            'total_price' => $this->calculateTotalPrice($validated['items']),
            'status' => 'Pending', // Default order status
        ]);

        // Add order items
        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json($order, 201); // Return the created order with status code 201
    }

    private function calculateTotalPrice($items)
    {
        return array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $items));
    }




    public function index()
    {
        $orders = Order::with('customer')->get(); // Eager load customer để tránh N+1 queries
        return response()->json($orders);
    }

    // Lấy chi tiết một đơn hàng
    public function show($id)
    {
        $order = Order::with('customer', 'items.product')->find($id);
    
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        return response()->json($order);
    }
    
    // Cập nhật trạng thái đơn hàng
    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->status = $request->status; // Update the order's status
        $order->save(); // Save the changes
    
        return response()->json($order); // Return updated order data
    }

    
}

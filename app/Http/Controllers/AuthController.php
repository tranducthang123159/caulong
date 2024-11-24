<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully!',
        ]);
    }


    public function login(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Kiểm tra email và mật khẩu
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email hoặc mật khẩu không chính xác'], 401);
        }

        // Tạo token cho người dùng
        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json(['token' => $token]);
    }




    public function show($id)
    {
        // Tìm người dùng theo ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Trả về thông tin người dùng
        return response()->json($user);
    }

    // Cập nhật thông tin người dùng
    public function update(Request $request, $id)
    {
        // Tìm người dùng theo ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate dữ liệu cập nhật
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
        ]);

        // Cập nhật thông tin người dùng
        if ($request->has('name')) {
            $user->name = $validatedData['name'];
        }
        if ($request->has('email')) {
            $user->email = $validatedData['email'];
        }
        if ($request->has('password')) {
            $user->password = Hash::make($validatedData['password']);
        }

        // Lưu lại thay đổi
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User details updated successfully!',
            'user' => $user
        ]);
    }

    // Xóa người dùng theo ID
    public function delete($id)
    {
        // Tìm người dùng theo ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Xóa người dùng
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User account deleted successfully!'
        ]);
    }


    public function index()
{
    $users = User::all();
    return response()->json($users);
}

}
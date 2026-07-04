<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminService;

class AdminController extends Controller
{
    protected AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function getUsers()
    {
        $users = $this->adminService->getAllUsers();
        return response()->json(['data' => $users]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate(['role' => 'required|in:user,admin']);
        $user = $this->adminService->updateUserRole($id, $request->role);
        return response()->json(['data' => $user]);
    }

    public function deleteUser($id)
    {
        $this->adminService->deleteUser($id);
        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function getAnalytics()
    {
        $analytics = $this->adminService->getAnalytics();
        return response()->json(['data' => $analytics]);
    }
}

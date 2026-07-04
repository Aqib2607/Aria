<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $userId = Auth::id() ?? 1;
        $notifications = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json(['data' => $notifications]);
    }

    public function markAsRead($id)
    {
        $userId = Auth::id() ?? 1;
        $notification = Notification::where('user_id', $userId)->where('id', $id)->firstOrFail();
        
        $notification->status = 'read';
        $notification->save();
        
        return response()->json(['message' => 'Notification marked as read.', 'data' => $notification]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;

class InboxController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Inbox/Index', [
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    public function markAsRead(ContactMessage $message)
    {
        $message->update(['read_at' => now()]);

        return redirect()->back()->with('success', 'Inquiry marked as read.');
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return redirect()->back()->with('success', 'Inquiry deleted.');
    }
}

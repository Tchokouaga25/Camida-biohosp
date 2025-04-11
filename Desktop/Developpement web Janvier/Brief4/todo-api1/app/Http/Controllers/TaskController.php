<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return Task::create($validated);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task->update($validated);
        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Tâche supprimée']);
    }

    public function toggle(Task $task)
    {
        $task->completed = !$task->completed;
        $task->save();

        return $task;
    }
}

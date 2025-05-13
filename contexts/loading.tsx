"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r px-6 py-4">
        <div className="text-xl font-bold text-violet-700 mb-6">Multi Step Form</div>
        <nav className="space-y-4">
          <div className="text-sm font-semibold text-gray-700">Dashboard</div>
          <div className="text-sm font-semibold text-gray-700">Personal Info</div>
          <div className="text-sm font-semibold text-gray-700">Contact Info</div>
          <div className="text-sm font-semibold text-gray-700">Preferences</div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b px-6 flex items-center justify-between">
          <div className="h-6 w-16 bg-gray-300 rounded-md"></div>{" "}
        </header>

        <div className="flex-1 flex ml-48 items-center justify-center">
          <div className="flex items-center space-x-3">
            <Loader2 className="animate-spin h-8 w-8 text-violet-700" />
            <span className="text-violet-700 text-lg font-medium">Please wait</span>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  LogOut,
  BarChart2,
} from "lucide-react"; // npm install lucide-react

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r z-40 transform transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between md:justify-center px-4 py-4 border-b">
          <span className="text-xl font-bold text-indigo-600">MyDashboard</span>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem icon={<Home size={20} />} label="Accueil" />
          <NavItem icon={<BarChart2 size={20} />} label="Statistiques" />
          <NavItem icon={<User size={20} />} label="Profil" />
          <NavItem icon={<Settings size={20} />} label="Paramètres" />
          <NavItem icon={<LogOut size={20} />} label="Déconnexion" />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between md:justify-end">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="hidden md:block">
            <span className="font-medium text-gray-700">Bienvenue, Admin 👋</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tableau de bord</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Utilisateurs" value="1 245" />
            <DashboardCard title="Ventes" value="8 400 €" />
            <DashboardCard title="Nouveaux inscrits" value="145" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Mon Dashboard</h1>

            {/* Formulaire pour ajouter une tâche */}
            <TaskForm />

            {/* Liste des tâches existantes */}
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="flex items-center w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 transition">
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

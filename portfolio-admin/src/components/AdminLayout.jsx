import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">
          Portfolio CMS
        </h1>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            About
          </Link>

          <Link
            to="/skills"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Skills
          </Link>

          <Link
            to="/projects"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Projects
          </Link>

          <Link
            to="/experience"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Experience
          </Link>

          <Link
            to="/resume"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Resume
          </Link>

          <Link
            to="/contact"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Contact Messages
          </Link>

          <Link
            to="/feedback"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Feedback
          </Link>
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1">

        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Admin Dashboard
          </h2>

          <span className="text-sm text-gray-600">
            {user?.username}
          </span>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminLayout
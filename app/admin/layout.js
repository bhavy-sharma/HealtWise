"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/AdminLogin';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      {children}
    </div>
  );
}

// Admin Header Component
function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">Healthwise Administration</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <a
                href="/admin/contacts"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Contact Messages
              </a>
            </nav>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
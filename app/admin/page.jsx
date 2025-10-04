"use client";
import { useState, useEffect } from 'react';
import { Users, MessageSquare, BarChart3, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalUsers: 0,
    newMessages: 0
  });

  useEffect(() => {
    // Fetch stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const contactsRes = await fetch('/api/contact');
      const contactsData = await contactsRes.json();
      
      setStats({
        totalContacts: contactsData.contacts?.length || 0,
        totalUsers: 0, // You can add user count API later
        newMessages: contactsData.contacts?.filter(c => c.status === 'new').length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'blue',
      description: 'Contact form submissions'
    },
    {
      title: 'New Messages',
      value: stats.newMessages,
      icon: Users,
      color: 'green',
      description: 'Unread messages'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to Healthwise Administration Panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                </div>
                <div className={`p-3 rounded-full bg-${card.color}-100`}>
                  <card.icon className={`h-6 w-6 text-${card.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/contacts"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
            >
              <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-medium text-gray-900">View Messages</h3>
                <p className="text-sm text-gray-500">Check contact form submissions</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
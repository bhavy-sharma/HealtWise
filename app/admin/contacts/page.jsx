"use client";
import { useState, useEffect } from 'react';
import { Check, Trash2, Eye, RefreshCw } from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/contact');
      const data = await res.json();
      
      if (res.ok) {
        setContacts(data.contacts || []);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId) => {
    try {
      setActionLoading(contactId);
      
      const res = await fetch(`/api/contact/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the local state
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === contactId
              ? { ...contact, status: 'read' }
              : contact
          )
        );
      } else {
        setError(data.message || 'Failed to mark as read');
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      setError('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const markAsNew = async (contactId) => {
    try {
      setActionLoading(contactId);
      
      const res = await fetch(`/api/contact/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'new' }),
      });

      const data = await res.json();

      if (res.ok) {
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === contactId
              ? { ...contact, status: 'new' }
              : contact
          )
        );
      } else {
        setError(data.message || 'Failed to mark as new');
      }
    } catch (error) {
      console.error('Error marking as new:', error);
      setError('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(contactId);
      
      const res = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        // Remove from local state
        setContacts(prevContacts =>
          prevContacts.filter(contact => contact._id !== contactId)
        );
      } else {
        setError(data.message || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        text: 'New'
      },
      read: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        text: 'Read'
      },
      replied: {
        color: 'bg-green-100 text-green-800 border-green-200',
        text: 'Replied'
      }
    };

    const config = statusConfig[status] || statusConfig.new;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
          <div className="text-lg text-gray-600">Loading contacts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600 mt-2">
              Manage all contact form submissions from users
            </p>
          </div>
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{contacts.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {contacts.filter(c => c.status === 'new').length}
            </div>
            <div className="text-sm text-gray-600">New Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {contacts.filter(c => c.status === 'read').length}
            </div>
            <div className="text-sm text-gray-600">Read Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'replied').length}
            </div>
            <div className="text-sm text-gray-600">Replied Messages</div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No contact messages yet</div>
              <p className="text-gray-500">Contact form submissions will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      className={`hover:bg-gray-50 transition duration-150 ${
                        contact.status === 'new' ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div 
                          className="text-sm text-gray-900 max-w-xs truncate cursor-help" 
                          title={contact.message}
                        >
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(contact.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contact.status || 'new')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {contact.status === 'new' ? (
                            <button
                              onClick={() => markAsRead(contact._id)}
                              disabled={actionLoading === contact._id}
                              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                            >
                              {actionLoading === contact._id ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                              <span>Mark Read</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsNew(contact._id)}
                              disabled={actionLoading === contact._id}
                              className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition duration-200 disabled:opacity-50"
                            >
                              {actionLoading === contact._id ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                              <span>Mark New</span>
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteContact(contact._id)}
                            disabled={actionLoading === contact._id}
                            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition duration-200 disabled:opacity-50"
                          >
                            {actionLoading === contact._id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total: {contacts.length} message(s)
          </div>
          {contacts.length > 0 && (
            <div className="text-xs text-gray-500">
              Showing all {contacts.length} messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
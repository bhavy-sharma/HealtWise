"use client";
import { useAuth } from '@/context/AuthContext';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can keep your header and add some context if needed */}
      <ContactForm />
      
      {/* Optional: Show user info if logged in */}
      {/* {user && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">Logged in as: {user.name}</p>
        </div>
      )} */}
    </div>
  );
}
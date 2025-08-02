'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const NEXT_PUBLIC_ADMIN_EMAIL = [process.env.NEXT_PUBLIC_ADMIN_EMAIL];

if(!NEXT_PUBLIC_ADMIN_EMAIL.length){
  throw new Error("ADMIN_EMAIL not defined")
}
const ADMIN_ACCESS_CODE = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showAccessCodeInput, setShowAccessCodeInput] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (status === 'loading') return; 

    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (session?.user?.email) {
      const isAdminEmail = NEXT_PUBLIC_ADMIN_EMAIL.includes(session.user.email);
      if (isAdminEmail) {
          setIsAuthorized(true);
          setShowAccessCodeInput(true);
      } else {
        setAuthError('Access denied. Admin privileges required.');
        setTimeout(() => {
          router.push('/');
        }, 300000);
      }
    }
  }, [session, status, router]);

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ADMIN_ACCESS_CODE) {
      setIsAuthorized(true);
      setShowAccessCodeInput(false);
      setAuthError('');
    } else {
      setAuthError('Invalid access code. Please try again.');
      setAccessCode('');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (showAccessCodeInput) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access Required</h2>
              <p className="text-gray-400">Enter the admin access code to continue</p>
            </div>

            <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter admin access code"
                  required
                />
              </div>

              {authError && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Verify Access
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authorization error
  if (authError && !showAccessCodeInput) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">{authError}</p>
          <p className="text-gray-500 text-sm">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  // Authorized - render admin content
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Default loading state
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-300">Loading admin panel...</p>
      </div>
    </div>
  );
};

export default AdminLayout;
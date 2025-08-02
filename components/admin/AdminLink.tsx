import React from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';

const NEXT_PUBLIC_ADMIN_EMAIL = [process.env.NEXT_PUBLIC_ADMIN_EMAIL];


const AdminLink: React.FC = () => {
  const { data: session } = useSession();
  
  // Check if current user is admin
  const isAdmin = session?.user?.email && NEXT_PUBLIC_ADMIN_EMAIL.includes(session.user.email);
  
  if (!isAdmin) {
    return null;
  }

  return (
    <Link href="/admin">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors font-medium">
        <Settings className="w-4 h-4" />
        <span>Admin</span>
      </button>
    </Link>
  );
};

export default AdminLink;
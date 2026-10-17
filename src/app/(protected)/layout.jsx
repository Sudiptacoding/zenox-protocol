// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Navbar from '@/components/Navbar';

// export default function ProtectedLayout({ children }) {
//   const { data: session, status, update: updateSession } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen bg-[#020b08] flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         AUTHENTICATING ZENOX PROTOCOL...
//       </div>
//     );
//   }

//   if (!session) return null;

//   return (
//     <div className="min-h-screen bg-black text-white font-chakra">
//       {/* 🚀 গ্লোবাল নেভবার: এখন এটি /dashboard, /tasks সব পেজে কাজ করবে */}
//       <Navbar user={session.user} onRefresh={updateSession} />
//       <main className="max-w-6xl mx-auto p-4 md:p-6">
//         {children}
//       </main>
//     </div>
//   );
// }

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export default function ProtectedLayout({ children }) {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [dbUser, setDbUser] = useState(null);

  const userId = session?.user?.dbData?._id || session?.user?._id || session?.user?.id;

  // 🚀 ব্যাকএন্ড থেকে তাজা ডাটা আনবে যাতে ২০২,০০০ পয়েন্ট বা আসল পয়েন্ট শো করে
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const res = await axios.get(`${backendUrl}/tasks?userId=${userId}`);
      if (res.data?.currentUser) {
        setDbUser(res.data.currentUser);
      }
    } catch (err) {
      console.error('Failed to fetch user points in layout:', err);
    }
  }, [userId]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router, fetchUserData]);

  // 🚀 অ্যাপের যেকোনো জায়গা থেকে পয়েন্ট আপডেট হলে লেআউটও সিঙ্ক করবে
  useEffect(() => {
    const handleUpdate = () => {
      fetchUserData();
    };
    window.addEventListener('update-entries', handleUpdate);
    return () => window.removeEventListener('update-entries', handleUpdate);
  }, [fetchUserData]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#020b08] flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
        AUTHENTICATING ZENOX PROTOCOL...
      </div>
    );
  }

  if (!session) return null;

  // ব্যাকএন্ড থেকে আসা dbUser থাকলে সেটাকে প্রাধান্য দেবে, না হয় সেশনের ইউজার
  const currentUserData = dbUser ? { ...session.user, dbData: dbUser, entries: dbUser.entries } : session.user;

  return (
    <div className="min-h-screen bg-black text-white font-chakra">
      {/* 🟢 গ্লোবাল নেভবার: এখন সব পেজেই দেখাবে এবং সঠিক পয়েন্ট শো করবে */}
      <Navbar user={currentUserData} onRefresh={fetchUserData} />
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
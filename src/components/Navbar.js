'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Navbar({ user, onRefresh }) {
  const { update: updateSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [pointsToSend, setPointsToSend] = useState('');
  const [isSending, setIsSending] = useState(false);

  // ডাটাবেজের ইউজার থেকে সঠিক পয়েন্ট নাও
  const currentEntries = Number(user?.dbData?.entries ?? user?.entries ?? 0);

  // K/M ফরম্যাট না বানিয়ে সরাসরি সংখ্যা বা সঠিক ফরম্যাট দেখানোর জন্য
  const formattedEntries = currentEntries >= 1000 
    ? `${(currentEntries / 1000).toFixed(1)}k` 
    : currentEntries;

  const handleSendPoints = async () => {
    const points = Number(pointsToSend);

    if (!points || points <= 0) {
      toast.error('Please enter a valid points amount');
      return;
    }

    if (points > currentEntries) {
      toast.error('Insufficient entries balance');
      return;
    }

    const toastId = toast.loading('Sending entries to Admin...');
    setIsSending(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const userId = user?.dbData?._id || user?._id;

      const res = await axios.post(`${backendUrl}/tasks/send-reward`, {
        userId,
        pointsToClaim: points,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Request sent successfully!', { id: toastId });
        setPointsToSend('');

        // 🚀 ১. সেসন ডাটা রিফ্রেশ
        await updateSession();

        // 🚀 ২. ড্যাশবোর্ডের আসল ডাটা রি-ফেচ
        if (typeof onRefresh === 'function') {
          await onRefresh();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send entries', { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <nav className="w-full bg-[#020b08] border-b border-[#00e699]/20 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00e699] text-black font-pixel font-bold flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,230,153,0.5)]">
            Z
          </div>
          <span className="font-pixel font-bold text-lg tracking-wider text-white">
            ZENOX
          </span>
        </div> */}

{/* LOGO */}
<div className="flex items-center gap-3 min-w-0">
  <img
    src="/logos/logo.png"
    alt="Zenox Protocol Logo"
    className="w-12 h-12 object-contain shrink-0 rounded-full shadow-[0_0_10px_rgba(0,230,153,0.5)]"
  />

  <span className="font-pixel font-bold text-lg tracking-wider text-white whitespace-nowrap">
    ZENOX
  </span>
</div>



        {/* TOP RIGHT USER SUMMARY */}
        <div className="flex items-center gap-3">
          {/* Realtime Correct Entries Count */}
          <div className="bg-[#051711] border border-[#00e699]/40 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-xs font-bold font-pixel text-[#00e699]">
              {currentEntries.toLocaleString()} Entries
            </span>
          </div>

          {/* Profile Avatar Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full border-2 border-[#00e699] overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,230,153,0.3)] relative"
          >
            <img
              src={user?.image || user?.dbData?.image || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* PROFILE DROPDOWN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#051711] border border-[#00e699]/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,230,153,0.2)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* User Info Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <img
                src={user?.image || user?.dbData?.image || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="w-12 h-12 rounded-full border border-[#00e699]"
              />
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-white truncate">
                  {user?.name || user?.dbData?.name || 'Sudipta Biswas'}
                </h4>
                <p className="text-xs text-[#00e699] font-mono truncate">
                  @{user?.dbData?.username || user?.username || 'user'}
                </p>
              </div>
            </div>

            {/* Current Entries Dashboard Display */}
            <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-pixel uppercase">YOUR ENTRIES</span>
                <p className="text-lg font-bold font-pixel text-[#00e699] mt-0.5">
                  {currentEntries.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Withdraw / Send Points Form */}
            <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex flex-col gap-2">
              <label className="text-[10px] font-pixel text-gray-300 uppercase">
                WITHDRAW / SEND ENTRIES TO ADMIN
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Points..."
                  value={pointsToSend}
                  onChange={(e) => setPointsToSend(e.target.value)}
                  className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
                />
                <button
                  onClick={handleSendPoints}
                  disabled={isSending}
                  className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-50 text-black font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => signOut()}
              className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-xl transition-all cursor-pointer border border-red-500/30"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
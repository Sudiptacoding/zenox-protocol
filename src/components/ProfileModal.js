'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfileModal({ user, onClose }) {
  const dbUser = user?.dbData || {};
  const [pointsInput, setPointsInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendToAdmin = async (e) => {
    e.preventDefault();
    if (!pointsInput || isNaN(pointsInput) || Number(pointsInput) <= 0) {
      return toast.error('Please enter a valid points amount');
    }

    const toastId = toast.loading('Sending claim request...');
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const res = await axios.post(`${backendUrl}/tasks/send-reward`, {
        userId: dbUser._id,
        pointsToClaim: Number(pointsInput)
      });

      toast.success(res.data.message, { id: toastId });
      setPointsInput('');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send claim request', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 bg-[#051711] border border-[#00e699]/40 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 font-chakra text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#00e699]">
          <img src={dbUser.image || user?.image || 'https://via.placeholder.com/150'} alt="User" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-sm text-white truncate">{dbUser.name || 'User'}</h4>
          <p className="text-xs text-[#00e699]">@{dbUser.username || 'username'}</p>
        </div>
      </div>

      {/* Stats Balance */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <div className="bg-[#020b08] border border-white/5 p-2.5 rounded-xl text-center">
          <span className="text-[10px] text-gray-400 uppercase block font-pixel">Entries</span>
          <span className="text-sm font-bold text-[#00e699] font-pixel">{dbUser.entries || 0}</span>
        </div>
        <div className="bg-[#020b08] border border-white/5 p-2.5 rounded-xl text-center">
          <span className="text-[10px] text-gray-400 uppercase block font-pixel">Rank</span>
          <span className="text-sm font-bold text-white font-pixel">#{dbUser.rank || '1'}</span>
        </div>
      </div>

      {/* Send Reward to Admin Form */}
      <form onSubmit={handleSendToAdmin} className="mb-4 bg-[#020b08] p-3 border border-[#00e699]/20 rounded-xl flex flex-col gap-2">
        <label className="text-[11px] text-gray-300 font-bold uppercase">Withdraw / Send Entries to Admin</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Points..."
            value={pointsInput}
            onChange={(e) => setPointsInput(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00e699]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer"
          >
            Send
          </button>
        </div>
      </form>

      <button
        onClick={() => signOut()}
        className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs cursor-pointer transition-all"
      >
        Sign Out
      </button>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { signOut, useSession } from 'next-auth/react';
// import { useRouter, usePathname } from 'next/navigation';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function Navbar({ user, onRefresh }) {
//   const { data: session, update: updateSession } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [pointsToSend, setPointsToSend] = useState('');
//   const [isSending, setIsSending] = useState(false);

//   // নিরাপদভাবে ইউজার বা ডাটাবেজ থেকে পয়েন্ট রিড করার ফাংশন
//   const extractEntries = (usr) => {
//     const val = usr?.dbData?.entries ?? usr?.entries ?? session?.user?.dbData?.entries ?? session?.user?.entries;
//     return val !== undefined && val !== null ? Number(val) : 0;
//   };

//   const [localEntries, setLocalEntries] = useState(() => extractEntries(user));

//   // প্রপস বা সেশন আপডেট হলে এন্ট্রি সিঙ্ক করা
//   useEffect(() => {
//     const incoming = extractEntries(user);
//     if (!isNaN(incoming)) {
//       setLocalEntries(incoming);
//     }
//   }, [user, session]);

//   // রিয়েল-টাইম ইভেন্ট লিসেনার (টাস্ক বা রিওয়ার্ড যোগ হলে)
//   useEffect(() => {
//     const handlePointsUpdate = (event) => {
//       if (event.detail?.newPoints !== undefined) {
//         setLocalEntries(Number(event.detail.newPoints));
//       } else if (event.detail?.addedPoints !== undefined) {
//         setLocalEntries((prev) => prev + Number(event.detail.addedPoints));
//       } else if (event.detail?.deductedPoints !== undefined) {
//         setLocalEntries((prev) => Math.max(0, prev - Number(event.detail.deductedPoints)));
//       }
//     };

//     window.addEventListener('update-entries', handlePointsUpdate);
//     return () => {
//       window.removeEventListener('update-entries', handlePointsUpdate);
//     };
//   }, []);

//   const currentEntries = localEntries;

//   const avatarSrc =
//     user?.image ||
//     user?.dbData?.image ||
//     user?.picture ||
//     user?.dbData?.picture ||
//     user?.avatar ||
//     user?.dbData?.avatar ||
//     null;

//   const navLinks = [
//     { name: '1. Home', url: '/dashboard' },
//     { name: '2. Rewards / Points / Task', url: '/tasks' },
//     { name: '3. Staking Dashboard', url: '/staking' },
//     { name: '4. NFT', url: '/nft' },
//     { name: '5. Referral System', url: '/referral' },
//     { name: '6. Roadmap', url: '/roadmap' },
//     { name: '7. Community', url: '/community' },
//   ];

//   const handleNavClick = (url) => {
//     setIsSidebarOpen(false);
//     router.push(url);
//   };

//   // অ্যাডমিনের কাছে পয়েন্ট সেন্ড করার হ্যান্ডলার
//   const handleSendPoints = async () => {
//     const points = Number(pointsToSend);

//     if (!points || points <= 0) {
//       toast.error('Please enter a valid points amount');
//       return;
//     }

//     if (points > currentEntries) {
//       toast.error(`Insufficient balance (${currentEntries.toLocaleString()})`);
//       return;
//     }

//     const toastId = toast.loading('Sending entries to Admin...');
//     setIsSending(true);

//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const userId = user?.dbData?._id || user?._id || user?.id || session?.user?.dbData?._id;

//       const res = await axios.post(`${backendUrl}/tasks/send-reward`, {
//         userId,
//         pointsToClaim: points,
//       });

//       if (res.data?.success || res.status === 200) {
//         toast.success(res.data?.message || 'Request sent successfully!', { id: toastId });
//         setPointsToSend('');

//         const updatedEntries = Math.max(0, currentEntries - points);
//         setLocalEntries(updatedEntries);

//         if (session?.user) {
//           if (session.user.dbData) session.user.dbData.entries = updatedEntries;
//           session.user.entries = updatedEntries;
//         }

//         window.dispatchEvent(new CustomEvent('update-entries', { 
//           detail: { newPoints: updatedEntries } 
//         }));

//         if (typeof updateSession === 'function') {
//           await updateSession();
//         }

//         if (typeof onRefresh === 'function') {
//           await onRefresh();
//         }
//       } else {
//         toast.error(res.data?.message || 'Failed to send entries', { id: toastId });
//       }
//     } catch (err) {
//       console.error('Send points error:', err);
//       toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to send entries', { id: toastId });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <nav className="w-full bg-[#020b08] border-b border-[#00e699]/20 px-3 md:px-4 py-3 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto flex items-center justify-between">
//         {/* LOGO */}
//         <div className="flex items-center gap-2.5 min-w-0 cursor-pointer" onClick={() => router.push('/dashboard')}>
//           <img
//             src="/logos/logo.png"
//             alt="Zenox Protocol Logo"
//             className="w-9 h-9 md:w-11 md:h-11 object-contain shrink-0 rounded-full shadow-[0_0_10px_rgba(0,230,153,0.5)]"
//           />
//           <span className="font-pixel font-bold text-sm md:text-base tracking-wider text-white whitespace-nowrap">
//             ZENOX
//           </span>
//         </div>

//         {/* TOP RIGHT SUMMARY */}
//         <div className="flex items-center gap-2 md:gap-3">
//           <div className="bg-[#051711] border border-[#00e699]/40 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,230,153,0.15)]">
//             <svg className="w-3.5 h-3.5 text-[#00e699] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//             </svg>
//             <span className="text-[11px] md:text-xs font-bold font-pixel text-[#00e699] tracking-wide whitespace-nowrap">
//               {currentEntries.toLocaleString()} <span className="hidden sm:inline">Ent</span>
//             </span>
//           </div>

//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#051711] border border-[#00e699]/40 flex items-center justify-center text-[#00e699] hover:bg-[#00e699]/10 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.2)]"
//             title="Toggle Menu"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//             </svg>
//           </button>

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#00e699] overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,230,153,0.3)] relative shrink-0 bg-[#051711]"
//           >
//             {avatarSrc ? (
//               <img
//                 src={avatarSrc}
//                 alt="Profile"
//                 width={40}
//                 height={40}
//                 referrerPolicy="no-referrer"
//                 className="w-full h-full rounded-full object-cover"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-700 text-white font-bold text-xs">
//                 {(user?.name || user?.dbData?.name || session?.user?.name || "U").charAt(0).toUpperCase()}
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* DRAWER MENU */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}>
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="absolute top-0 right-0 h-full w-72 md:w-80 bg-[#020b08] border-l border-[#00e699]/30 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 overflow-y-auto"
//           >
//             <div>
//               <div className="flex items-center justify-between pb-4 border-b border-white/10">
//                 <span className="font-pixel font-bold text-xs tracking-wider text-[#00e699] uppercase">NAVIGATION MENU</span>
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-all text-xs"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="flex flex-col gap-2 mt-4 font-chakra">
//                 {navLinks.map((link, idx) => {
//                   const isActive = pathname === link.url;

//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => handleNavClick(link.url)}
//                       className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
//                         isActive
//                           ? 'bg-[#00e699]/15 border-[#00e699] text-[#00e699] font-bold shadow-[0_0_12px_rgba(0,230,153,0.25)]'
//                           : 'bg-[#051711] border-white/10 hover:border-[#00e699]/40 hover:bg-[#00e699]/10 text-white font-semibold'
//                       } text-xs md:text-sm`}
//                     >
//                       <span className="flex items-center gap-2 truncate">
//                         {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00e699] shadow-[0_0_6px_#00e699] shrink-0" />}
//                         <span className="truncate">{link.name}</span>
//                       </span>
//                       <span className={`text-[#00e699] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity shrink-0`}>
//                         →
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="pt-4 mt-6 border-t border-white/10 text-center">
//               <p className="text-[10px] text-gray-500 font-mono">Zenox Protocol v1.0</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PROFILE DROPDOWN MODAL */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="w-full max-w-sm bg-[#051711] border border-[#00e699]/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,230,153,0.2)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 relative"
//           >
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-all text-xs"
//               title="Close Profile"
//             >
//               ✕
//             </button>

//             <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
//               <div className="w-12 h-12 rounded-full border border-[#00e699] overflow-hidden shrink-0 bg-black">
//                 {avatarSrc ? (
//                   <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-700 text-white font-bold text-xs">
//                     {(user?.name || user?.dbData?.name || session?.user?.name || "U").charAt(0).toUpperCase()}
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-col min-w-0">
//                 <h4 className="font-bold text-sm text-white truncate">
//                   {user?.name || user?.dbData?.name || session?.user?.name || 'Sudipta Biswas'}
//                 </h4>
//                 <p className="text-xs text-[#00e699] font-mono truncate">
//                   @{user?.dbData?.username || user?.username || session?.user?.dbData?.username || 'user'}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
//               <div>
//                 <span className="text-[10px] text-gray-400 font-pixel uppercase">YOUR ENTRIES</span>
//                 <p className="text-lg font-bold font-pixel text-[#00e699] mt-0.5">
//                   {currentEntries.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Withdraw Form (Fixed Input typing issue) */}
//             <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex flex-col gap-2">
//               <label className="text-[10px] font-pixel text-gray-300 uppercase">
//                 WITHDRAW / SEND ENTRIES TO ADMIN
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   min="1"
//                   max={currentEntries}
//                   placeholder="Points..."
//                   value={pointsToSend}
//                   onChange={(e) => setPointsToSend(e.target.value)}
//                   className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                 />
//                 <button
//                   onClick={handleSendPoints}
//                   disabled={isSending || Number(pointsToSend) <= 0 || Number(pointsToSend) > currentEntries}
//                   className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-50 text-black font-bold text-xs rounded-xl cursor-pointer transition-all"
//                 >
//                   {isSending ? 'Sending...' : 'Send'}
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() => signOut()}
//               className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-xl transition-all cursor-pointer border border-red-500/30"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Navbar({ user, onRefresh }) {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pointsToSend, setPointsToSend] = useState('');
  const [isSending, setIsSending] = useState(false);

  // সঠিকভাবে প্রপস বা সেশন থেকে পয়েন্ট বের করা
  const extractEntries = (usr) => {
    const val = usr?.dbData?.entries ?? usr?.entries ?? session?.user?.dbData?.entries ?? session?.user?.entries;
    return val !== undefined && val !== null ? Number(val) : 0;
  };

  const [localEntries, setLocalEntries] = useState(() => extractEntries(user));

  useEffect(() => {
    const incoming = extractEntries(user);
    if (!isNaN(incoming)) {
      setLocalEntries(incoming);
    }
  }, [user, session]);

  // রিয়েল-টাইম কাস্টম ইভেন্ট লিসেনার
  useEffect(() => {
    const handlePointsUpdate = (event) => {
      if (event.detail?.newPoints !== undefined) {
        setLocalEntries(Number(event.detail.newPoints));
      } else if (event.detail?.addedPoints !== undefined) {
        setLocalEntries((prev) => prev + Number(event.detail.addedPoints));
      } else if (event.detail?.deductedPoints !== undefined) {
        setLocalEntries((prev) => Math.max(0, prev - Number(event.detail.deductedPoints)));
      }
    };

    window.addEventListener('update-entries', handlePointsUpdate);
    return () => {
      window.removeEventListener('update-entries', handlePointsUpdate);
    };
  }, []);

  const currentEntries = localEntries;

  const avatarSrc =
    user?.image ||
    user?.dbData?.image ||
    user?.picture ||
    user?.dbData?.picture ||
    user?.avatar ||
    user?.dbData?.avatar ||
    null;

  const navLinks = [
    { name: '1. Home', url: '/dashboard' },
    { name: '2. Rewards / Points / Task', url: '/tasks' },
    { name: '3. Staking Dashboard', url: '/staking' },
    { name: '4. NFT', url: '/nft' },
    { name: '5. Referral System', url: '/referral' },
    { name: '6. Roadmap', url: '/roadmap' },
    { name: '7. Community', url: '/community' },
  ];

  const handleNavClick = (url) => {
    setIsSidebarOpen(false);
    router.push(url);
  };

  const handleSendPoints = async () => {
    const points = Number(pointsToSend);

    if (!points || points <= 0) {
      toast.error('Please enter a valid points amount');
      return;
    }

    if (points > currentEntries) {
      toast.error(`Insufficient balance (${currentEntries.toLocaleString()})`);
      return;
    }

    const toastId = toast.loading('Sending entries to Admin...');
    setIsSending(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const userId = user?.dbData?._id || user?._id || user?.id || session?.user?.dbData?._id;

      const res = await axios.post(`${backendUrl}/tasks/send-reward`, {
        userId,
        pointsToClaim: points,
      });

      if (res.data?.success || res.status === 200) {
        toast.success(res.data?.message || 'Request sent successfully!', { id: toastId });
        setPointsToSend('');

        const updatedEntries = Math.max(0, currentEntries - points);
        setLocalEntries(updatedEntries);

        window.dispatchEvent(new CustomEvent('update-entries', { 
          detail: { newPoints: updatedEntries } 
        }));

        if (typeof onRefresh === 'function') {
          await onRefresh();
        }
      } else {
        toast.error(res.data?.message || 'Failed to send entries', { id: toastId });
      }
    } catch (err) {
      console.error('Send points error:', err);
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to send entries', { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <nav className="w-full bg-[#020b08] border-b border-[#00e699]/20 px-3 md:px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2.5 min-w-0 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <img
            src="/logos/logo.png"
            alt="Zenox Protocol Logo"
            className="w-9 h-9 md:w-11 md:h-11 object-contain shrink-0 rounded-full shadow-[0_0_10px_rgba(0,230,153,0.5)]"
          />
          <span className="font-pixel font-bold text-sm md:text-base tracking-wider text-white whitespace-nowrap">
            ZENOX
          </span>
        </div>

        {/* TOP RIGHT SUMMARY */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#051711] border border-[#00e699]/40 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,230,153,0.15)]">
            <svg className="w-3.5 h-3.5 text-[#00e699] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[11px] md:text-xs font-bold font-pixel text-[#00e699] tracking-wide whitespace-nowrap">
              {currentEntries.toLocaleString()} <span className="hidden sm:inline">Ent</span>
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#051711] border border-[#00e699]/40 flex items-center justify-center text-[#00e699] hover:bg-[#00e699]/10 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.2)]"
            title="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#00e699] overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,230,153,0.3)] relative shrink-0 bg-[#051711]"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                width={40}
                height={40}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-700 text-white font-bold text-xs">
                {(user?.name || user?.dbData?.name || session?.user?.name || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* DRAWER MENU */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 h-full w-72 md:w-80 bg-[#020b08] border-l border-[#00e699]/30 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-pixel font-bold text-xs tracking-wider text-[#00e699] uppercase">NAVIGATION MENU</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-all text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4 font-chakra">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.url;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(link.url)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#00e699]/15 border-[#00e699] text-[#00e699] font-bold shadow-[0_0_12px_rgba(0,230,153,0.25)]'
                          : 'bg-[#051711] border-white/10 hover:border-[#00e699]/40 hover:bg-[#00e699]/10 text-white font-semibold'
                      } text-xs md:text-sm`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00e699] shadow-[0_0_6px_#00e699] shrink-0" />}
                        <span className="truncate">{link.name}</span>
                      </span>
                      <span className={`text-[#00e699] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity shrink-0`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-500 font-mono">Zenox Protocol v1.0</p>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE DROPDOWN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#051711] border border-[#00e699]/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,230,153,0.2)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-all text-xs"
              title="Close Profile"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
              <div className="w-12 h-12 rounded-full border border-[#00e699] overflow-hidden shrink-0 bg-black">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-700 text-white font-bold text-xs">
                    {(user?.name || user?.dbData?.name || session?.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-white truncate">
                  {user?.name || user?.dbData?.name || session?.user?.name || 'Sudipta Biswas'}
                </h4>
                <p className="text-xs text-[#00e699] font-mono truncate">
                  @{user?.dbData?.username || user?.username || session?.user?.dbData?.username || 'user'}
                </p>
              </div>
            </div>

            <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-pixel uppercase">YOUR ENTRIES</span>
                <p className="text-lg font-bold font-pixel text-[#00e699] mt-0.5">
                  {currentEntries.toLocaleString()}
                </p>
              </div>
            </div>

            {/* WITHDRAW / SEND ENTRIES FORM */}
            <div className="bg-[#020b08] border border-white/10 p-3.5 rounded-xl flex flex-col gap-2">
              <label className="text-[10px] font-pixel text-gray-300 uppercase">
                WITHDRAW / SEND ENTRIES TO ADMIN
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={currentEntries}
                  placeholder="Points..."
                  value={pointsToSend}
                  onChange={(e) => setPointsToSend(e.target.value)}
                  className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
                />
                <button
                  onClick={handleSendPoints}
                  disabled={isSending || Number(pointsToSend) <= 0 || Number(pointsToSend) > currentEntries}
                  className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-50 text-black font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>

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
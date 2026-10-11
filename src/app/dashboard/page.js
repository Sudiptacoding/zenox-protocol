// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Navbar from '@/components/Navbar';

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router  = useRouter();
//   const [filter, setFilter] = useState('All');

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-sm">
//         LOADING ZENOX SYSTEM...
//       </div>
//     );
//   }

//   const user = session?.user;
//   const dbUser = user?.dbData || {};

//   return (
//     <div className="min-h-screen w-full bg-black text-white font-chakra pb-24">
      
//       {/* Top Header Navbar with Profile Modal */}
//       <Navbar user={user} />

//       <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">
        
//         {/* 1. Daily Check-in Card */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5 relative overflow-hidden">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">CHECK-IN</span>
//               <h2 className="text-xl font-bold font-pixel text-white mt-1">DAY 1</h2>
//               <p className="text-xs text-gray-400 mt-0.5">Tomorrow +120 entries</p>
//             </div>
//             <div className="bg-[#00e699]/10 border border-[#00e699]/40 text-[#00e699] px-3 py-1 rounded-full text-xs font-bold">
//               Active
//             </div>
//           </div>
//         </div>

//         {/* 2. Invite Friends Referral Section */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-lg font-bold font-pixel text-white mb-1 uppercase">INVITE FRIENDS</h3>
//           <p className="text-xs text-gray-400 mb-4">
//             Share your link with friends and get +100 entries for every successful invite.
//           </p>

//           <div className="flex items-center gap-2 bg-[#020b08] border border-[#00e699]/20 rounded-xl p-2.5 mb-4">
//             <span className="text-xs text-gray-400 truncate flex-1">
//               https://zenox.one/invite?ref={dbUser.referralCode || 'BPSAYN'}
//             </span>
//             <button className="bg-[#00e699] text-black font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-[#00c784] transition-all">
//               Copy
//             </button>
//           </div>

//           <div className="grid grid-cols-3 gap-2 text-center">
//             <div className="bg-[#020b08] p-3 rounded-xl border border-white/5">
//               <div className="text-lg font-bold font-pixel text-white">1</div>
//               <div className="text-[10px] text-gray-400 uppercase mt-1">Friends Joined</div>
//             </div>
//             <div className="bg-[#020b08] p-3 rounded-xl border border-white/5">
//               <div className="text-lg font-bold font-pixel text-[#00e699]">#38.7K</div>
//               <div className="text-[10px] text-gray-400 uppercase mt-1">Your Rank</div>
//             </div>
//             <div className="bg-[#020b08] p-3 rounded-xl border border-white/5">
//               <div className="text-lg font-bold font-pixel text-white">400</div>
//               <div className="text-[10px] text-gray-400 uppercase mt-1">Total Entries</div>
//             </div>
//           </div>
//         </div>

//         {/* 3. Your Entry Progress Bar */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-bold font-pixel tracking-wider text-white uppercase">
//               YOUR ENTRY PROGRESS
//             </span>
//             <span className="text-sm font-bold font-pixel text-[#00e699]">100%</span>
//           </div>

//           {/* Green Progress Bar */}
//           <div className="w-full bg-[#020b08] h-3 rounded-full overflow-hidden p-0.5 border border-[#00e699]/20">
//             <div className="bg-[#00e699] h-full rounded-full shadow-[0_0_10px_rgba(0,230,153,0.8)] w-full transition-all duration-500" />
//           </div>

//           {/* Filter Pills */}
//           <div className="flex gap-2 mt-5">
//             {['All 4', 'To do 0', 'Done 4'].map((tab, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setFilter(tab.split(' ')[0])}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
//                   filter === tab.split(' ')[0]
//                     ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50'
//                     : 'bg-[#020b08] text-gray-400 border border-white/5 hover:text-white'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//       </main>

//       {/* 4. Bottom Sticky Check-in Action Button */}
//       <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-30">
//         <div className="max-w-xl mx-auto">
//           <button className="w-full py-4 rounded-2xl bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-base flex items-center justify-between px-6 transition-all shadow-[0_0_25px_rgba(0,230,153,0.4)]">
//             <span>Check in · +100 (×1.0)</span>
//             <span className="flex items-center gap-1 bg-black/10 px-3 py-1 rounded-lg text-xs font-extrabold">
//               📈 Day 1
//             </span>
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }

// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '@/components/Navbar';

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [filter, setFilter] = useState('All');
//   const [tasks, setTasks] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [walletInputs, setWalletInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [verifyingId, setVerifyingId] = useState(null);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   const fetchData = async (userId) => {
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.get(`${backendUrl}/tasks?userId=${userId}`);
//       setTasks(res.data.tasks || []);
//       setLeaderboard(res.data.leaderboard || []);
//     } catch (err) {
//       console.error('Error fetching dashboard data', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTaskAction = async (task, isWalletTask = false) => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
    
//     // টুইটার টাস্ক হলে নতুন ট্যাবে লিংক ওপেন হবে
//     if (task.actionUrl && !isWalletTask) {
//       window.open(task.actionUrl, '_blank');
//     }

//     setVerifyingId(task._id);

//     try {
//       const payload = {
//         userId: session.user.dbData._id,
//         taskId: task._id,
//         walletAddress: walletInputs[task._id] || '',
//         twitterHandle: session.user.dbData.username || ''
//       };

//       const res = await axios.post(`${backendUrl}/tasks/submit`, payload);
//       alert(res.data.message);
//       fetchData(session.user.dbData._id);
//     } catch (err) {
//       alert(err.response?.data?.error || 'Verification Failed');
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING ZENOX DASHBOARD...
//       </div>
//     );
//   }

//   const user = session?.user;
//   const dbUser = user?.dbData || {};

//   // ফিল্টার লজিক
//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'To do') return task.status === 'todo';
//     if (filter === 'Done') return task.status === 'completed';
//     return true;
//   });

//   const completedCount = tasks.filter(t => t.status === 'completed').length;
//   const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

//   return (
//     <div className="min-h-screen w-full bg-black text-white font-chakra pb-28">
//       <Navbar user={user} />

//       <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">
        
//         {/* Entry Progress Section */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,230,153,0.05)]">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-bold font-pixel tracking-wider text-white uppercase">
//               YOUR ENTRY PROGRESS
//             </span>
//             <span className="text-sm font-bold font-pixel text-[#00e699]">{progressPercentage}%</span>
//           </div>

//           <div className="w-full bg-[#020b08] h-3 rounded-full overflow-hidden p-0.5 border border-[#00e699]/20">
//             <div 
//               className="bg-[#00e699] h-full rounded-full shadow-[0_0_10px_rgba(0,230,153,0.8)] transition-all duration-500"
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>

//           {/* Filter Tabs (All, To do, Done) */}
//           <div className="flex gap-2 mt-5">
//             {[
//               { label: `All ${tasks.length}`, val: 'All' },
//               { label: `To do ${tasks.filter(t => t.status === 'todo').length}`, val: 'To do' },
//               { label: `Done ${completedCount}`, val: 'Done' }
//             ].map((tab, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setFilter(tab.val)}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
//                   filter === tab.val
//                     ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50'
//                     : 'bg-[#020b08] text-gray-400 border border-white/5 hover:text-white'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Task List Cards with Wallet Input Support */}
//         <div className="flex flex-col gap-3">
//           {filteredTasks.map((task) => (
//             <div key={task._id} className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-4 flex flex-col gap-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3.5 overflow-hidden">
//                   <div className="w-10 h-10 rounded-xl bg-[#020b08] border border-[#00e699]/40 flex items-center justify-center flex-shrink-0 text-[#00e699] font-bold text-sm">
//                     {task.requiresWallet ? '💳' : '𝕏'}
//                   </div>
//                   <div className="overflow-hidden">
//                     <h4 className="font-bold text-sm text-white truncate">{task.title}</h4>
//                     <p className="text-xs text-gray-400 mt-0.5 truncate">{task.description}</p>
//                   </div>
//                 </div>

//                 {task.status === 'completed' && (
//                   <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl flex-shrink-0">✓ Completed</span>
//                 )}
//                 {task.status === 'pending' && (
//                   <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl flex-shrink-0">⏳ Pending Review</span>
//                 )}
//               </div>

//               {/* যদি টাস্কটি ওয়ালেট সাবমিশনের হয়, তবে ইনপুট ফিল্ড দেখাবে */}
//               {task.requiresWallet && task.status === 'todo' && (
//                 <div className="flex gap-2 mt-1">
//                   <input
//                     type="text"
//                     placeholder="Enter Wallet Address (0x...)"
//                     value={walletInputs[task._id] || ''}
//                     onChange={(e) => setWalletInputs({ ...walletInputs, [task._id]: e.target.value })}
//                     className="flex-1 bg-[#020b08] border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                   />
//                   <button
//                     onClick={() => handleTaskAction(task, true)}
//                     className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer flex-shrink-0"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               )}

//               {/* টুইটার অ্যাকশন টাস্কের জন্য ভেরিফাই বাটন */}
//               {!task.requiresWallet && task.status === 'todo' && (
//                 <button
//                   onClick={() => handleTaskAction(task, false)}
//                   disabled={verifyingId === task._id}
//                   className="w-full py-2.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs transition-all cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)]"
//                 >
//                   {verifyingId === task._id ? 'Verifying Action...' : 'Start & Verify Task'}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Leaderboard Section */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5 mt-4">
//           <h3 className="text-base font-bold font-pixel text-white uppercase tracking-wider mb-3">
//             LEADERBOARD
//           </h3>
//           <div className="bg-[#020b08] border border-white/10 rounded-xl p-3 mb-4 text-xs font-bold text-gray-300 flex justify-between items-center">
//             <span>YOUR RANK #{dbUser.rank || '38,660'}</span>
//             <span className="text-[#00e699]">TOP 14%</span>
//           </div>

//           <div className="flex flex-col gap-2">
//             {leaderboard.map((item, idx) => (
//               <div key={idx} className="flex items-center justify-between bg-[#020b08] border border-white/5 p-3 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-xs flex items-center justify-center font-bold">
//                     {idx + 1}
//                   </span>
//                   <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative">
//                     <img src={item.image || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-xs font-bold text-white">@{item.username || 'user'}</span>
//                     <span className="text-[10px] text-gray-400">{item.name}</span>
//                   </div>
//                 </div>
//                 <span className="text-xs font-bold font-pixel text-[#00e699]">{item.entries}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }


// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Navbar from '@/components/Navbar';

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [filter, setFilter] = useState('All');
//   const [tasks, setTasks] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [walletInputs, setWalletInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [verifyingId, setVerifyingId] = useState(null);
//   const [cooldown, setCooldown] = useState(0);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   const fetchData = async (userId) => {
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.get(`${backendUrl}/tasks?userId=${userId}`);
//       setTasks(res.data.tasks || []);
//       setLeaderboard(res.data.leaderboard || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartTask = (task) => {
//     if (task.actionUrl) {
//       window.open(task.actionUrl, '_blank');
//     }
//     setVerifyingId(task._id);
//     setCooldown(5); // 5 seconds wait timer

//     const timer = setInterval(() => {
//       setCooldown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleVerifyTask = async (task, isWallet = false) => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//     const toastId = toast.loading('Verifying action with X...');

//     try {
//       const payload = {
//         userId: session.user.dbData._id,
//         taskId: task._id,
//         walletAddress: isWallet ? walletInputs[task._id] : '',
//         twitterHandle: session.user.dbData.username || ''
//       };

//       const res = await axios.post(`${backendUrl}/tasks/submit`, payload);
//       toast.success(res.data.message, { id: toastId });
//       setVerifyingId(null);
//       fetchData(session.user.dbData._id);
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Verification Failed! Please complete on X.', { id: toastId });
//     }
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING ZENOX DASHBOARD...
//       </div>
//     );
//   }

//   const user = session?.user;
//   const dbUser = user?.dbData || {};

//   const filteredTasks = tasks.filter((t) => {
//     if (filter === 'To do') return t.status === 'todo';
//     if (filter === 'Done') return t.status === 'completed';
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-black text-white font-chakra pb-28">
//       <Navbar user={user} />

//       <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">
        
//         {/* Campaign Tasks */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-sm font-bold font-pixel text-white uppercase mb-4">CAMPAIGN TASKS</h3>

//           {/* Filter Tabs */}
//           <div className="flex gap-2 mb-4">
//             {['All', 'To do', 'Done'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setFilter(tab)}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
//                   filter === tab ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50' : 'bg-[#020b08] text-gray-400'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-3">
//             {filteredTasks.map((task) => (
//               <div key={task._id} className="bg-[#020b08] border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold">
//                       {task.requiresWallet ? '💳' : '𝕏'}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-sm text-white">{task.title}</h4>
//                       <p className="text-xs text-gray-400">{task.description}</p>
//                     </div>
//                   </div>

//                   {task.status === 'completed' && <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl">✓ Completed</span>}
//                   {task.status === 'pending' && <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl">⏳ Pending Review</span>}
//                 </div>

//                 {/* Wallet Task Input */}
//                 {task.requiresWallet && task.status === 'todo' && (
//                   <div className="flex gap-2 mt-1">
//                     <input
//                       type="text"
//                       placeholder="Enter EVM Wallet Address (0x...)"
//                       value={walletInputs[task._id] || ''}
//                       onChange={(e) => setWalletInputs({ ...walletInputs, [task._id]: e.target.value })}
//                       className="flex-1 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                     />
//                     <button
//                       onClick={() => handleVerifyTask(task, true)}
//                       className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 )}

//                 {/* Twitter Action Buttons */}
//                 {!task.requiresWallet && task.status === 'todo' && (
//                   <div className="flex gap-2">
//                     {verifyingId !== task._id ? (
//                       <button
//                         onClick={() => handleStartTask(task)}
//                         className="flex-1 py-2.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)]"
//                       >
//                         1. Start Action on X
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleVerifyTask(task, false)}
//                         disabled={cooldown > 0}
//                         className={`flex-1 py-2.5 font-bold rounded-xl text-xs transition-all cursor-pointer ${
//                           cooldown > 0
//                             ? 'bg-gray-800 text-gray-400 border border-white/10'
//                             : 'bg-[#00e699] text-black hover:bg-[#00c784] shadow-[0_0_10px_rgba(0,230,153,0.3)]'
//                         }`}
//                       >
//                         {cooldown > 0 ? `Wait (${cooldown}s)...` : '2. Verify Action Now'}
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Leaderboard */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5 mt-4">
//           <h3 className="text-base font-bold font-pixel text-white uppercase tracking-wider mb-3">
//             LEADERBOARD
//           </h3>
//           <div className="bg-[#020b08] border border-white/10 rounded-xl p-3 mb-4 text-xs font-bold text-gray-300 flex justify-between items-center">
//             <span>YOUR RANK #{dbUser.rank || '38,660'}</span>
//             <span className="text-[#00e699]">TOP 14%</span>
//           </div>

//           <div className="flex flex-col gap-2">
//             {leaderboard.map((item, idx) => (
//               <div key={idx} className="flex items-center justify-between bg-[#020b08] border border-white/5 p-3 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-xs flex items-center justify-center font-bold">
//                     {idx + 1}
//                   </span>
//                   <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative">
//                     <img src={item.image || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-xs font-bold text-white">@{item.username || 'user'}</span>
//                     <span className="text-[10px] text-gray-400">{item.name}</span>
//                   </div>
//                 </div>
//                 <span className="text-xs font-bold font-pixel text-[#00e699]">{item.entries}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }

// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Navbar from '@/components/Navbar';

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [filter, setFilter] = useState('All');
//   const [tasks, setTasks] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [dbUser, setDbUser] = useState({});
//   const [walletInputs, setWalletInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [verifyingId, setVerifyingId] = useState(null);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   const fetchData = async (userId) => {
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.get(`${backendUrl}/tasks?userId=${userId}`);
//       setTasks(res.data.tasks || []);
//       setLeaderboard(res.data.leaderboard || []);
//       if (res.data.currentUser) {
//         setDbUser(res.data.currentUser);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🎁 24-Hour Daily Reward Claim
//   const handleClaimDailyReward = async () => {
//     const toastId = toast.loading('Claiming Daily Reward...');
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.post(`${backendUrl}/tasks/daily-reward`, { userId: dbUser._id });
//       toast.success(res.data.message, { id: toastId });
//       fetchData(dbUser._id);
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Already claimed today!', { id: toastId });
//     }
//   };

//   // 𝕏 Task Open & Auto-Verify Workflow
//   const handleStartTwitterTask = (task) => {
//     setVerifyingId(task._id);

//     const width = 600;
//     const height = 700;
//     const left = (window.innerWidth - width) / 2;
//     const top = (window.innerHeight - height) / 2;

//     const twitterWindow = window.open(
//       task.actionUrl,
//       'TwitterActionWindow',
//       `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
//     );

//     const timer = setInterval(() => {
//       if (twitterWindow && twitterWindow.closed) {
//         clearInterval(timer);
//         // Automatically verify upon window close
//         handleVerifyTask(task, false);
//       }
//     }, 1000);
//   };

//   const handleVerifyTask = async (task, isWallet = false) => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//     const toastId = toast.loading('Checking with X API...');

//     try {
//       const payload = {
//         userId: dbUser._id,
//         taskId: task._id,
//         walletAddress: isWallet ? walletInputs[task._id] : '',
//         twitterHandle: dbUser.username || session?.user?.username || ''
//       };

//       const res = await axios.post(`${backendUrl}/tasks/submit`, payload);
//       toast.success(res.data.message, { id: toastId });
//       fetchData(dbUser._id);
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Action not completed on X!', { id: toastId });
//     } finally {
//       // 🚀 reset button state so user can retry or verify again
//       setVerifyingId(null);
//     }
//   };

//   // Check if daily reward is already claimed within 24 hours
//   const isDailyClaimed = () => {
//     if (!dbUser.lastDailyReward) return false;
//     const lastClaim = new Date(dbUser.lastDailyReward);
//     const now = new Date();
//     return (now - lastClaim) < 24 * 60 * 60 * 1000;
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING ZENOX PROTOCOL...
//       </div>
//     );
//   }

//   const filteredTasks = tasks.filter((t) => {
//     if (filter === 'To do') return t.status === 'todo';
//     if (filter === 'Done') return t.status === 'completed';
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-black text-white font-chakra pb-28">
//       <Navbar user={{ ...session?.user, dbData: dbUser }} />

//       <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">
        
//         {/* 🎁 DAILY REWARD BOOSTER (Hides automatically if claimed within 24h) */}
//         {!isDailyClaimed() && (
//           <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,230,153,0.15)] transition-all">
//             <div>
//               <h4 className="text-xs font-bold font-pixel text-[#00e699] uppercase">🎁 DAILY REWARD BOOSTER</h4>
//               <p className="text-[11px] text-gray-400 mt-0.5">Claim +50 free entries every 24 hours</p>
//             </div>
//             <button
//               onClick={handleClaimDailyReward}
//               className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-xl cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)] transition-all"
//             >
//               Claim Free
//             </button>
//           </div>
//         )}

//         {/* CAMPAIGN TASKS */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-sm font-bold font-pixel text-white uppercase mb-4">CAMPAIGN TASKS</h3>

//           <div className="flex gap-2 mb-4">
//             {['All', 'To do', 'Done'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setFilter(tab)}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
//                   filter === tab ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50' : 'bg-[#020b08] text-gray-400'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-3">
//             {filteredTasks.map((task) => (
//               <div key={task._id} className="bg-[#020b08] border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold">
//                       {task.requiresWallet ? '💳' : '𝕏'}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-sm text-white">{task.title}</h4>
//                       <p className="text-xs text-gray-400">{task.description}</p>
//                     </div>
//                   </div>

//                   {task.status === 'completed' && <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl">✓ Completed</span>}
//                   {task.status === 'pending' && <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl">⏳ Pending Review</span>}
//                 </div>

//                 {/* EVM Wallet Submission Input */}
//                 {task.requiresWallet && task.status === 'todo' && (
//                   <div className="flex gap-2 mt-1">
//                     <input
//                       type="text"
//                       placeholder="Enter EVM Wallet Address (0x...)"
//                       value={walletInputs[task._id] || ''}
//                       onChange={(e) => setWalletInputs({ ...walletInputs, [task._id]: e.target.value })}
//                       className="flex-1 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                     />
//                     <button
//                       onClick={() => handleVerifyTask(task, true)}
//                       className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 )}

//                 {/* Twitter Action Button */}
//                 {!task.requiresWallet && task.status === 'todo' && (
//                   <button
//                     onClick={() => handleStartTwitterTask(task)}
//                     disabled={verifyingId === task._id}
//                     className="w-full py-2.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all"
//                   >
//                     {verifyingId === task._id ? 'Verifying Action...' : 'Complete Action on X'}
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* LEADERBOARD */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-base font-bold font-pixel text-white uppercase tracking-wider mb-4">
//             GLOBAL LEADERBOARD
//           </h3>

//           <div className="flex flex-col gap-2">
//             {leaderboard.map((item, idx) => (
//               <div key={idx} className="flex items-center justify-between bg-[#020b08] border border-white/5 p-3 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-xs flex items-center justify-center font-bold">
//                     {idx + 1}
//                   </span>
//                   <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative">
//                     <img src={item.image || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-xs font-bold text-white">@{item.username || 'user'}</span>
//                     <span className="text-[10px] text-gray-400">{item.name}</span>
//                   </div>
//                 </div>
//                 <span className="text-xs font-bold font-pixel text-[#00e699]">{item.entries || 0} Entries</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }



// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Navbar from '@/components/Navbar';

// const MIN_TASK_SECONDS = 20;

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [filter, setFilter] = useState('All');
//   const [tasks, setTasks] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [dbUser, setDbUser] = useState({});
//   const [walletInputs, setWalletInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [verifyingId, setVerifyingId] = useState(null);
//   const [taskTimers, setTaskTimers] = useState({});
//   const [remainingTimes, setRemainingTimes] = useState({});

//   const backendUrl =
//     process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   // Countdown display. The backend remains responsible for validating time.
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRemainingTimes((previous) => {
//         const next = { ...previous };

//         Object.keys(taskTimers).forEach((taskId) => {
//           const startedAt = taskTimers[taskId];
//           const elapsed = Math.floor(
//             (Date.now() - new Date(startedAt).getTime()) / 1000
//           );

//           next[taskId] = Math.max(0, MIN_TASK_SECONDS - elapsed);
//         });

//         return next;
//       });
//     }, 250);

//     return () => clearInterval(interval);
//   }, [taskTimers]);

//   const fetchData = async (userId) => {
//     try {
//       const res = await axios.get(
//         `${backendUrl}/tasks?userId=${userId}`
//       );

//       const fetchedTasks = res.data.tasks || [];

//       setTasks(fetchedTasks);
//       setLeaderboard(res.data.leaderboard || []);

//       if (res.data.currentUser) {
//         setDbUser(res.data.currentUser);
//       }

//       // Restore timer state after refresh if a task was already started.
//       const restoredTimers = {};
//       const restoredRemaining = {};

//       fetchedTasks.forEach((task) => {
//         if (task.status === 'started' && task.startedAt) {
//           restoredTimers[task._id] = task.startedAt;

//           const elapsed = Math.floor(
//             (Date.now() - new Date(task.startedAt).getTime()) / 1000
//           );

//           restoredRemaining[task._id] = Math.max(
//             0,
//             MIN_TASK_SECONDS - elapsed
//           );
//         }
//       });

//       setTaskTimers((previous) => ({
//         ...previous,
//         ...restoredTimers
//       }));

//       setRemainingTimes((previous) => ({
//         ...previous,
//         ...restoredRemaining
//       }));
//     } catch (err) {
//       console.error('Fetch dashboard data error:', err);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Daily Reward
//   const handleClaimDailyReward = async () => {
//     const toastId = toast.loading('Claiming Daily Reward...');

//     try {
//       const res = await axios.post(
//         `${backendUrl}/tasks/daily-reward`,
//         { userId: dbUser._id }
//       );

//       toast.success(res.data.message, { id: toastId });
//       await fetchData(dbUser._id);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.error || 'Already claimed today!',
//         { id: toastId }
//       );
//     }
//   };

//   // Start Visit Task, then open the external page.
//   const handleStartTwitterTask = async (task) => {
//     if (verifyingId === task._id) return;

//     if (!task.actionUrl) {
//       toast.error('This task does not have a visit link');
//       return;
//     }

//     // Open synchronously from the click to reduce popup-blocking issues.
//     const taskWindow = window.open(
//       'about:blank',
//       '_blank'
//     );

//     if (taskWindow) {
//       taskWindow.opener = null;
//     }

//     setVerifyingId(task._id);

//     try {
//       const res = await axios.post(`${backendUrl}/tasks/start`, {
//         userId: dbUser._id,
//         taskId: task._id
//       });

//       const data = res.data;

//       if (data.status === 'completed') {
//         if (taskWindow) taskWindow.close();

//         toast.success('Task already completed!');
//         await fetchData(dbUser._id);
//         return;
//       }

//       if (taskWindow) {
//         taskWindow.location.href = task.actionUrl;
//       } else {
//         // If the browser blocked the popup, still start the timer.
//         toast('Popup blocked. Please open the task link manually.', {
//           icon: '⚠️'
//         });
//       }

//       const startedAt = data.startedAt || new Date().toISOString();

//       setTaskTimers((previous) => ({
//         ...previous,
//         [task._id]: startedAt
//       }));

//       const elapsed = Math.floor(
//         (Date.now() - new Date(startedAt).getTime()) / 1000
//       );

//       setRemainingTimes((previous) => ({
//         ...previous,
//         [task._id]: Math.max(0, MIN_TASK_SECONDS - elapsed)
//       }));

//       setTasks((previous) =>
//         previous.map((item) =>
//           item._id === task._id
//             ? { ...item, status: 'started', startedAt }
//             : item
//         )
//       );

//       toast.success('Visit Task started! Wait for the timer.');
//     } catch (err) {
//       if (taskWindow) taskWindow.close();

//       toast.error(
//         err.response?.data?.error || 'Could not start Visit Task'
//       );
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   // Submit after countdown reaches zero.
//   const handleCompleteVisitTask = async (task) => {
//     if (verifyingId === task._id) return;

//     const startedAt = taskTimers[task._id] || task.startedAt;

//     if (!startedAt) {
//       toast.error('Please click Visit Task first');
//       return;
//     }

//     const elapsed = Math.floor(
//       (Date.now() - new Date(startedAt).getTime()) / 1000
//     );

//     if (elapsed < MIN_TASK_SECONDS) {
//       const remaining = MIN_TASK_SECONDS - elapsed;

//       setRemainingTimes((previous) => ({
//         ...previous,
//         [task._id]: remaining
//       }));

//       toast.error(`Please wait ${remaining} more seconds`);
//       return;
//     }

//     setVerifyingId(task._id);
//     const toastId = toast.loading('Completing Visit Task...');

//     try {
//       const res = await axios.post(`${backendUrl}/tasks/submit`, {
//         userId: dbUser._id,
//         taskId: task._id
//       });

//       toast.success(
//         res.data.message || 'Visit Task completed!',
//         { id: toastId }
//       );

//       setTaskTimers((previous) => {
//         const next = { ...previous };
//         delete next[task._id];
//         return next;
//       });

//       setRemainingTimes((previous) => {
//         const next = { ...previous };
//         delete next[task._id];
//         return next;
//       });

//       await fetchData(dbUser._id);
//     } catch (err) {
//       const data = err.response?.data;

//       toast.error(
//         data?.error || 'Failed to complete task',
//         { id: toastId }
//       );

//       if (typeof data?.remainingSeconds === 'number') {
//         setRemainingTimes((previous) => ({
//           ...previous,
//           [task._id]: data.remainingSeconds
//         }));
//       }

//       // Refresh task state in case the server already completed it.
//       await fetchData(dbUser._id);
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   // Wallet submission remains unchanged.
//   const handleVerifyTask = async (task, isWallet = false) => {
//     const toastId = toast.loading('Submitting wallet...');

//     try {
//       const payload = {
//         userId: dbUser._id,
//         taskId: task._id,
//         walletAddress: isWallet ? walletInputs[task._id] : ''
//       };

//       const res = await axios.post(
//         `${backendUrl}/tasks/submit`,
//         payload
//       );

//       toast.success(res.data.message, { id: toastId });
//       await fetchData(dbUser._id);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.error || 'Submission failed',
//         { id: toastId }
//       );
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   const isDailyClaimed = () => {
//     if (!dbUser.lastDailyReward) return false;

//     return (
//       Date.now() - new Date(dbUser.lastDailyReward).getTime() <
//       24 * 60 * 60 * 1000
//     );
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING ZENOX PROTOCOL...
//       </div>
//     );
//   }

//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'To do') {
//       return task.status === 'todo' || task.status === 'started';
//     }

//     if (filter === 'Done') {
//       return task.status === 'completed';
//     }

//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-black text-white font-chakra pb-28">
//       <Navbar user={{ ...session?.user, dbData: dbUser }} />

//       <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">

//         {/* DAILY REWARD */}
//         {!isDailyClaimed() && (
//           <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,230,153,0.15)] transition-all">
//             <div>
//               <h4 className="text-xs font-bold font-pixel text-[#00e699] uppercase">
//                 🎁 DAILY REWARD BOOSTER
//               </h4>
//               <p className="text-[11px] text-gray-400 mt-0.5">
//                 Claim +50 free entries every 24 hours
//               </p>
//             </div>

//             <button
//               onClick={handleClaimDailyReward}
//               className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-xl cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)] transition-all"
//             >
//               Claim Free
//             </button>
//           </div>
//         )}

//         {/* CAMPAIGN TASKS */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-sm font-bold font-pixel text-white uppercase mb-4">
//             CAMPAIGN TASKS
//           </h3>

//           <div className="flex gap-2 mb-4">
//             {['All', 'To do', 'Done'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setFilter(tab)}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
//                   filter === tab
//                     ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50'
//                     : 'bg-[#020b08] text-gray-400'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-3">
//             {filteredTasks.map((task) => {
//               const isWalletTask =
//                 task.requiresWallet ||
//                 task.platform === 'wallet_submit';

//               const remaining =
//                 remainingTimes[task._id] ?? MIN_TASK_SECONDS;

//               const timerStarted =
//                 task.status === 'started' ||
//                 Boolean(taskTimers[task._id]);

//               const busy = verifyingId === task._id;

//               return (
//                 <div
//                   key={task._id}
//                   className="bg-[#020b08] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
//                 >
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="w-10 h-10 shrink-0 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold">
//                         {isWalletTask ? '💳' : '𝕏'}
//                       </div>

//                       <div className="min-w-0">
//                         <h4 className="font-bold text-sm text-white">
//                           {task.title}
//                         </h4>
//                         <p className="text-xs text-gray-400">
//                           {task.description}
//                         </p>
//                       </div>
//                     </div>

//                     {/* ACTION BUTTON ON THE RIGHT */}
//                     <div className="shrink-0 flex flex-col items-end gap-2">
//                       {task.status === 'completed' && (
//                         <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl">
//                           ✓ Completed
//                         </span>
//                       )}

//                       {task.status === 'pending' && (
//                         <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl">
//                           ⏳ Pending Review
//                         </span>
//                       )}

//                       {!isWalletTask &&
//                         task.status !== 'completed' &&
//                         task.status !== 'pending' && (
//                           <button
//                             onClick={() =>
//                               timerStarted
//                                 ? handleCompleteVisitTask(task)
//                                 : handleStartTwitterTask(task)
//                             }
//                             disabled={busy || (timerStarted && remaining > 0)}
//                             className="min-w-[112px] py-2.5 px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center"
//                           >
//                             {busy
//                               ? 'Please wait...'
//                               : timerStarted && remaining > 0
//                                 ? `Wait ${remaining}s`
//                                 : timerStarted
//                                   ? 'Complete Task'
//                                   : 'Visit Task'}
//                           </button>
//                         )}
//                     </div>
//                   </div>

//                   {/* WALLET SUBMISSION */}
//                   {isWalletTask && task.status === 'todo' && (
//                     <div className="flex gap-2 mt-1">
//                       <input
//                         type="text"
//                         placeholder="Enter EVM Wallet Address (0x...)"
//                         value={walletInputs[task._id] || ''}
//                         onChange={(e) =>
//                           setWalletInputs({
//                             ...walletInputs,
//                             [task._id]: e.target.value
//                           })
//                         }
//                         className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                       />

//                       <button
//                         onClick={() => handleVerifyTask(task, true)}
//                         className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   )}

//                   {timerStarted &&
//                     !isWalletTask &&
//                     task.status !== 'completed' &&
//                     task.status !== 'pending' && (
//                       <p className="text-[11px] text-gray-400">
//                         {remaining > 0
//                           ? `Keep the task page open. You can complete this task in ${remaining} seconds.`
//                           : 'Timer finished. Click Complete Task to claim your entries.'}
//                       </p>
//                     )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* LEADERBOARD */}
//         <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
//           <h3 className="text-base font-bold font-pixel text-white uppercase tracking-wider mb-4">
//             GLOBAL LEADERBOARD
//           </h3>

//           <div className="flex flex-col gap-2">
//             {leaderboard.map((item, idx) => (
//               <div
//                 key={item._id || idx}
//                 className="flex items-center justify-between bg-[#020b08] border border-white/5 p-3 rounded-xl"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-xs flex items-center justify-center font-bold">
//                     {idx + 1}
//                   </span>

//                   <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative">
//                     <img
//                       src={item.image || 'https://via.placeholder.com/150'}
//                       alt="Avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <span className="text-xs font-bold text-white">
//                       @{item.username || 'user'}
//                     </span>
//                     <span className="text-[10px] text-gray-400">
//                       {item.name}
//                     </span>
//                   </div>
//                 </div>

//                 <span className="text-xs font-bold font-pixel text-[#00e699]">
//                   {item.entries || 0} Entries
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const MIN_TASK_SECONDS = 20;

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dbUser, setDbUser] = useState({});
  const [walletInputs, setWalletInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);
  const [taskTimers, setTaskTimers] = useState({});
  const [remainingTimes, setRemainingTimes] = useState({});

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.dbData?._id) {
      fetchData(session.user.dbData._id);
    }
  }, [status, session, router]);

  // Countdown timer for Visit tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes((previous) => {
        const next = { ...previous };

        Object.keys(taskTimers).forEach((taskId) => {
          const startedAt = taskTimers[taskId];
          const elapsed = Math.floor(
            (Date.now() - new Date(startedAt).getTime()) / 1000
          );

          next[taskId] = Math.max(0, MIN_TASK_SECONDS - elapsed);
        });

        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [taskTimers]);

  const fetchData = async (userId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/tasks?userId=${userId}`
      );

      const fetchedTasks = res.data.tasks || [];
      
      // Filter tasks to keep only those created within the last 7 days
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const recentTasks = fetchedTasks.filter((task) => {
        if (!task.createdAt) return true; // keep task if createdAt is not specified
        return now - new Date(task.createdAt).getTime() <= SEVEN_DAYS_MS;
      });

      setTasks(recentTasks);

      // Sort leaderboard strictly by point balance (entries) descending
      const sortedLeaderboard = (res.data.leaderboard || []).sort(
        (a, b) => (b.entries || 0) - (a.entries || 0)
      );
      setLeaderboard(sortedLeaderboard);

      if (res.data.currentUser) {
        setDbUser(res.data.currentUser);
      }

      // Restore timer state on refresh if a task was already started
      const restoredTimers = {};
      const restoredRemaining = {};

      recentTasks.forEach((task) => {
        if (task.status === 'started' && task.startedAt) {
          restoredTimers[task._id] = task.startedAt;

          const elapsed = Math.floor(
            (Date.now() - new Date(task.startedAt).getTime()) / 1000
          );

          restoredRemaining[task._id] = Math.max(
            0,
            MIN_TASK_SECONDS - elapsed
          );
        }
      });

      setTaskTimers((previous) => ({
        ...previous,
        ...restoredTimers
      }));

      setRemainingTimes((previous) => ({
        ...previous,
        ...restoredRemaining
      }));
    } catch (err) {
      console.error('Fetch dashboard data error:', err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Claim Daily Free Reward
  const handleClaimDailyReward = async () => {
    const toastId = toast.loading('Claiming Daily Reward...');

    try {
      const res = await axios.post(
        `${backendUrl}/tasks/daily-reward`,
        { userId: dbUser._id }
      );

      toast.success(res.data.message, { id: toastId });
      await fetchData(dbUser._id);
    } catch (err) {
      toast.error(
        err.response?.data?.error || 'Already claimed today!',
        { id: toastId }
      );
    }
  };

  // Start Visit Task timer
  const handleStartTwitterTask = async (task) => {
    if (verifyingId === task._id) return;

    if (!task.actionUrl) {
      toast.error('This task does not have a visit link');
      return;
    }

    const taskWindow = window.open('about:blank', '_blank');

    if (taskWindow) {
      taskWindow.opener = null;
    }

    setVerifyingId(task._id);

    try {
      const res = await axios.post(`${backendUrl}/tasks/start`, {
        userId: dbUser._id,
        taskId: task._id
      });

      const data = res.data;

      if (data.status === 'completed') {
        if (taskWindow) taskWindow.close();

        toast.success('Task already completed!');
        await fetchData(dbUser._id);
        return;
      }

      if (taskWindow) {
        taskWindow.location.href = task.actionUrl;
      } else {
        toast('Popup blocked. Please open the task link manually.', {
          icon: '⚠️'
        });
      }

      const startedAt = data.startedAt || new Date().toISOString();

      setTaskTimers((previous) => ({
        ...previous,
        [task._id]: startedAt
      }));

      const elapsed = Math.floor(
        (Date.now() - new Date(startedAt).getTime()) / 1000
      );

      setRemainingTimes((previous) => ({
        ...previous,
        [task._id]: Math.max(0, MIN_TASK_SECONDS - elapsed)
      }));

      setTasks((previous) =>
        previous.map((item) =>
          item._id === task._id
            ? { ...item, status: 'started', startedAt }
            : item
        )
      );

      toast.success('Visit Task started! Wait for the timer.');
    } catch (err) {
      if (taskWindow) taskWindow.close();

      toast.error(
        err.response?.data?.error || 'Could not start Visit Task'
      );
    } finally {
      setVerifyingId(null);
    }
  };

  // Complete Visit Task after countdown
  const handleCompleteVisitTask = async (task) => {
    if (verifyingId === task._id) return;

    const startedAt = taskTimers[task._id] || task.startedAt;

    if (!startedAt) {
      toast.error('Please click Visit Task first');
      return;
    }

    const elapsed = Math.floor(
      (Date.now() - new Date(startedAt).getTime()) / 1000
    );

    if (elapsed < MIN_TASK_SECONDS) {
      const remaining = MIN_TASK_SECONDS - elapsed;

      setRemainingTimes((previous) => ({
        ...previous,
        [task._id]: remaining
      }));

      toast.error(`Please wait ${remaining} more seconds`);
      return;
    }

    setVerifyingId(task._id);
    const toastId = toast.loading('Completing Visit Task...');

    try {
      const res = await axios.post(`${backendUrl}/tasks/submit`, {
        userId: dbUser._id,
        taskId: task._id
      });

      toast.success(
        res.data.message || 'Visit Task completed!',
        { id: toastId }
      );

      setTaskTimers((previous) => {
        const next = { ...previous };
        delete next[task._id];
        return next;
      });

      setRemainingTimes((previous) => {
        const next = { ...previous };
        delete next[task._id];
        return next;
      });

      await fetchData(dbUser._id);
    } catch (err) {
      const data = err.response?.data;

      toast.error(
        data?.error || 'Failed to complete task',
        { id: toastId }
      );

      if (typeof data?.remainingSeconds === 'number') {
        setRemainingTimes((previous) => ({
          ...previous,
          [task._id]: data.remainingSeconds
        }));
      }

      await fetchData(dbUser._id);
    } finally {
      setVerifyingId(null);
    }
  };

  // Submit EVM Wallet
  const handleVerifyTask = async (task, isWallet = false) => {
    const toastId = toast.loading('Submitting wallet...');

    try {
      const payload = {
        userId: dbUser._id,
        taskId: task._id,
        walletAddress: isWallet ? walletInputs[task._id] : ''
      };

      const res = await axios.post(
        `${backendUrl}/tasks/submit`,
        payload
      );

      toast.success(res.data.message, { id: toastId });
      await fetchData(dbUser._id);
    } catch (err) {
      toast.error(
        err.response?.data?.error || 'Submission failed',
        { id: toastId }
      );
    } finally {
      setVerifyingId(null);
    }
  };

  const isDailyClaimed = () => {
    if (!dbUser.lastDailyReward) return false;

    return (
      Date.now() - new Date(dbUser.lastDailyReward).getTime() <
      24 * 60 * 60 * 1000
    );
  };

  // Task Counts for Filter Tabs
  const taskCounts = useMemo(() => {
    const all = tasks.length;
    const todo = tasks.filter(
      (t) => t.status === 'todo' || t.status === 'started'
    ).length;
    const done = tasks.filter((t) => t.status === 'completed').length;
    return { all, todo, done };
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'To do') {
      return task.status === 'todo' || task.status === 'started';
    }

    if (filter === 'Done') {
      return task.status === 'completed';
    }

    return true;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
        LOADING ZENOX PROTOCOL...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-chakra pb-28">
      <Navbar 
  user={{ ...session?.user, dbData: dbUser }} 
  onRefresh={() => fetchData(dbUser._id)} 
/>

      <main className="max-w-xl mx-auto px-4 pt-6 flex flex-col gap-5">

        {/* DAILY REWARD */}
        {!isDailyClaimed() && (
          <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,230,153,0.15)] transition-all">
            <div>
              <h4 className="text-xs font-bold font-pixel text-[#00e699] uppercase">
                🎁 DAILY REWARD BOOSTER
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Claim +50 free entries every 24 hours
              </p>
            </div>

            <button
              onClick={handleClaimDailyReward}
              className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-xl cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)] transition-all"
            >
              Claim Free
            </button>
          </div>
        )}

        {/* CAMPAIGN TASKS */}
        <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
          <h3 className="text-sm font-bold font-pixel text-white uppercase mb-4">
            CAMPAIGN TASKS
          </h3>

          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4">
            {[
              { name: 'All', count: taskCounts.all },
              { name: 'To do', count: taskCounts.todo },
              { name: 'Done', count: taskCounts.done }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setFilter(tab.name)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  filter === tab.name
                    ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50 font-bold'
                    : 'bg-[#020b08] text-gray-400 border border-transparent'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === tab.name ? 'bg-[#00e699] text-black font-bold' : 'bg-white/10 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-6 text-xs text-gray-500 font-pixel">
                NO TASKS AVAILABLE
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isWalletTask =
                  task.requiresWallet ||
                  task.platform === 'wallet_submit';

                const remaining =
                  remainingTimes[task._id] ?? MIN_TASK_SECONDS;

                const timerStarted =
                  task.status === 'started' ||
                  Boolean(taskTimers[task._id]);

                const busy = verifyingId === task._id;

                return (
                  <div
                    key={task._id}
                    className="bg-[#020b08] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold">
                          {isWalletTask ? '💳' : '𝕏'}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-white">
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      {/* ACTION BUTTON */}
                      {/* <div className="shrink-0 flex flex-col items-end gap-2">
                        {task.status === 'completed' && (
                          <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl">
                            ✓ Completed
                          </span>
                        )}

                        {task.status === 'pending' && (
                          <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl">
                            ⏳ Pending Review
                          </span>
                        )}

                        {!isWalletTask &&
                          task.status !== 'completed' &&
                          task.status !== 'pending' && (
                            <button
                              onClick={() =>
                                timerStarted
                                  ? handleCompleteVisitTask(task)
                                  : handleStartTwitterTask(task)
                              }
                              disabled={busy || (timerStarted && remaining > 0)}
                              className="min-w-[112px] py-2.5 px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center"
                            >
                              {busy
                                ? 'Please wait...'
                                : timerStarted && remaining > 0
                                  ? `Wait ${remaining}s`
                                  : timerStarted
                                    ? 'Complete Task'
                                    : 'Visit Task'}
                            </button>
                          )}
                      </div> */}
{/* ACTION BUTTON */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {/* Approve বা Completed যেকোনোটি হলেই '✓ Completed' দেখাবে */}
                        {(task.status === 'completed' || task.status === 'approved') && (
                          <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl border border-[#00e699]/30">
                            ✓ Completed
                          </span>
                        )}

                        {task.status === 'pending' && (
                          <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                            ⏳ Pending Review
                          </span>
                        )}

                        {!isWalletTask &&
                          task.status !== 'completed' &&
                          task.status !== 'approved' &&
                          task.status !== 'pending' && (
                            <button
                              onClick={() =>
                                timerStarted
                                  ? handleCompleteVisitTask(task)
                                  : handleStartTwitterTask(task)
                              }
                              disabled={busy || (timerStarted && remaining > 0)}
                              className="min-w-[112px] py-2.5 px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center"
                            >
                              {busy
                                ? 'Please wait...'
                                : timerStarted && remaining > 0
                                  ? `Wait ${remaining}s`
                                  : timerStarted
                                    ? 'Complete Task'
                                    : 'Visit Task'}
                            </button>
                          )}
                      </div>


                    </div>

                    {/* WALLET SUBMISSION */}
{/* WALLET SUBMISSION */}
                    {(isWalletTask && (task.status === 'todo' || task.status === 'rejected' || !task.status)) && (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          placeholder="Enter EVM Wallet Address (0x...)"
                          value={walletInputs[task._id] || ''}
                          onChange={(e) =>
                            setWalletInputs({
                              ...walletInputs,
                              [task._id]: e.target.value
                            })
                          }
                          className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
                        />

                        <button
                          onClick={() => handleVerifyTask(task, true)}
                          className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shrink-0"
                        >
                          {task.status === 'rejected' ? 'Resubmit' : 'Submit'}
                        </button>
                      </div>
                    )}

                    {timerStarted &&
                      !isWalletTask &&
                      task.status !== 'completed' &&
                      task.status !== 'pending' && (
                        <p className="text-[11px] text-gray-400">
                          {remaining > 0
                            ? `Keep the task page open. You can complete this task in ${remaining} seconds.`
                            : 'Timer finished. Click Complete Task to claim your entries.'}
                        </p>
                      )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* GLOBAL LEADERBOARD */}
        <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-5">
          <h3 className="text-base font-bold font-pixel text-white uppercase tracking-wider mb-4">
            GLOBAL LEADERBOARD
          </h3>

          <div className="flex flex-col gap-2">
            {leaderboard.map((item, idx) => (
              <div
                key={item._id || idx}
                className="flex items-center justify-between bg-[#020b08] border border-white/5 p-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>

                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">
                      @{item.username || 'user'}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.name}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold font-pixel text-[#00e699]">
                  {item.entries || 0} Entries
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
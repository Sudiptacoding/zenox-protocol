// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function AdminDashboardPage() {
//   const { data: session } = useSession();

//   // Task Creation Form State
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     rewardEntries: 100,
//     platform: 'twitter_follow',
//     actionUrl: '',
//     requiresWallet: false
//   });

//   // Admin Data Lists
//   const [pendingList, setPendingList] = useState([]);
//   const [claimList, setClaimList] = useState([]);
//   const [unreadNotifications, setUnreadNotifications] = useState(0);
//   const [isSuperAdmin, setIsSuperAdmin] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user?.dbData?._id) {
//       fetchAdminData(session.user.dbData._id);
//     }
//   }, [session]);

//   const fetchAdminData = async (adminId) => {
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
//       setPendingList(res.data.pendingSubmissions || []);
//       setClaimList(res.data.pendingClaims || []);
//       setUnreadNotifications(res.data.unreadCount || 0);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setIsSuperAdmin(false);
//       }
//     }
//   };

//   // 1. Create Task Handler
//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Publishing task...');
//     setLoading(true);

//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/create`, form);
//       toast.success('Task published successfully!', { id: toastId });
//       setForm({
//         title: '',
//         description: '',
//         rewardEntries: 100,
//         platform: 'twitter_follow',
//         actionUrl: '',
//         requiresWallet: false
//       });
//       if (session?.user?.dbData?._id) {
//         fetchAdminData(session.user.dbData._id);
//       }
//     } catch (err) {
//       toast.error('Failed to publish task', { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Review Wallet Task Submission
//   const handleReviewTask = async (userTaskId, action) => {
//     const toastId = toast.loading(`Processing ${action}...`);
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/admin/review`, { userTaskId, action });
//       toast.success(`Submission ${action}d!`, { id: toastId });
//       fetchAdminData(session.user.dbData._id);
//     } catch (err) {
//       toast.error('Failed to review submission', { id: toastId });
//     }
//   };

//   // 3. Review Points Claim Request
//   const handleReviewClaim = async (claimId, action) => {
//     const toastId = toast.loading(`Processing claim ${action}...`);
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/admin/review-claim`, { claimId, action });
//       toast.success(`Claim ${action}d successfully!`, { id: toastId });
//       fetchAdminData(session.user.dbData._id);
//     } catch (err) {
//       toast.error('Failed to process claim', { id: toastId });
//     }
//   };

//   // Calculate Total Claimed Points Approved
//   const totalApprovedPoints = claimList
//     .filter((claim) => claim.status === 'approved')
//     .reduce((acc, curr) => acc + (curr.points || 0), 0);

//   if (!isSuperAdmin) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-pixel text-sm p-4">
//         ACCESS DENIED: YOU ARE NOT A SUPER ADMIN!
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-6 font-chakra">
//       <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
//         {/* Top Header & Overview Bar */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <span className="text-xl">👑</span>
//             <div>
//               <h1 className="text-sm font-bold tracking-wider uppercase font-pixel text-[#00e699]">
//                 SUPER ADMIN PANEL
//               </h1>
//               <p className="text-xs text-gray-400">Manage campaign tasks and review user reward requests</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="bg-[#020b08] border border-[#00e699]/30 px-3 py-1.5 rounded-xl text-xs font-pixel">
//               <span className="text-gray-400">Total Approved Points: </span>
//               <span className="text-[#00e699] font-bold">{totalApprovedPoints} Entries</span>
//             </div>
//             {unreadNotifications > 0 && (
//               <span className="px-3 py-1 bg-red-500 text-white font-bold rounded-full text-xs animate-pulse">
//                 {unreadNotifications} Pending
//               </span>
//             )}
//           </div>
//         </div>

//         {/* 1. Upload New Task Form */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">Upload New Task</h2>

//           <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Task Title</label>
//                 <input
//                   type="text"
//                   required
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                   placeholder="e.g. Follow @Popcorn__Girl_ on X"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Platform / Type</label>
//                 <select
//                   value={form.platform}
//                   onChange={(e) => setForm({ ...form, platform: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 >
//                   <option value="twitter_follow">Twitter Follow</option>
//                   <option value="twitter_like">Twitter Like</option>
//                   <option value="twitter_retweet">Twitter Retweet</option>
//                   <option value="wallet_submit">Wallet Submission</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="text-xs text-gray-400 uppercase font-semibold">Description</label>
//               <input
//                 type="text"
//                 required
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 placeholder="e.g. Follow target account on X to claim +100 entries"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Reward Entries</label>
//                 <input
//                   type="number"
//                   required
//                   value={form.rewardEntries}
//                   onChange={(e) => setForm({ ...form, rewardEntries: Number(e.target.value) })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Action URL (Optional)</label>
//                 <input
//                   type="url"
//                   value={form.actionUrl}
//                   onChange={(e) => setForm({ ...form, actionUrl: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                   placeholder="https://x.com/..."
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-3 mt-2 bg-[#020b08] border border-white/5 p-3 rounded-xl">
//               <input
//                 type="checkbox"
//                 id="requiresWallet"
//                 checked={form.requiresWallet}
//                 onChange={(e) => setForm({ ...form, requiresWallet: e.target.checked })}
//                 className="w-5 h-5 accent-[#00e699] cursor-pointer"
//               />
//               <label htmlFor="requiresWallet" className="text-xs text-gray-200 font-semibold cursor-pointer">
//                 Enable Wallet Address Input Field for this task (Requires Admin Approval)
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 py-3.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_20px_rgba(0,230,153,0.3)] transition-all"
//             >
//               Publish Task to Dashboard
//             </button>
//           </form>
//         </div>

//         {/* 2. User Reward Points Claim Requests */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Pending Points Claim Requests
//           </h2>

//           {claimList.length === 0 ? (
//             <p className="text-xs text-gray-400">No pending reward claim requests from users.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {claimList.map((claim) => (
//                 <div key={claim._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
//                   <div>
//                     <h4 className="text-xs font-bold text-white">User: {claim.username}</h4>
//                     <p className="text-xs text-[#00e699] font-mono mt-1">Claiming: {claim.points} Entries</p>
//                     <p className="text-[10px] text-gray-500 mt-0.5">
//                       Date: {new Date(claim.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleReviewClaim(claim._id, 'approve')}
//                       className="px-3 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer transition-all"
//                     >
//                       Approve & Deduct
//                     </button>
//                     <button
//                       onClick={() => handleReviewClaim(claim._id, 'reject')}
//                       className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer transition-all"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 3. Pending Wallet Approvals Table */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Pending Wallet Submissions
//           </h2>

//           {pendingList.length === 0 ? (
//             <p className="text-xs text-gray-400">No pending wallet approvals at the moment.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {pendingList.map((item) => (
//                 <div key={item._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//                   <div>
//                     <h4 className="text-xs font-bold text-white">{item.task?.title}</h4>
//                     <p className="text-[11px] text-gray-400 mt-0.5">
//                       User: {item.user?.name} (@{item.user?.username})
//                     </p>
//                     <p className="text-[11px] text-[#00e699] font-mono mt-1 bg-black/40 px-2 py-1 rounded">
//                       Wallet: {item.submittedWallet}
//                     </p>
//                   </div>
//                   <div className="flex gap-2 w-full sm:w-auto">
//                     <button
//                       onClick={() => handleReviewTask(item._id, 'approve')}
//                       className="flex-1 sm:flex-none px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black text-xs font-bold rounded-lg cursor-pointer transition-all"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReviewTask(item._id, 'reject')}
//                       className="flex-1 sm:flex-none px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-lg cursor-pointer transition-all"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function AdminDashboardPage() {
//   const { data: session } = useSession();

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     rewardEntries: 100,
//     platform: 'twitter_follow',
//     actionUrl: '',
//     requiresWallet: false
//   });

//   const [pendingList, setPendingList] = useState([]);
//   const [claimList, setClaimList] = useState([]);
//   const [isSuperAdmin, setIsSuperAdmin] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user?.dbData?._id) {
//       fetchAdminData(session.user.dbData._id);
//     }
//   }, [session]);

//   const fetchAdminData = async (adminId) => {
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const res = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
//       setPendingList(res.data.pendingSubmissions || []);
//       setClaimList(res.data.pendingClaims || []);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setIsSuperAdmin(false);
//       }
//     }
//   };

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Publishing task...');
//     setLoading(true);

//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/create`, form);
//       toast.success('Task published successfully!', { id: toastId });
//       setForm({
//         title: '',
//         description: '',
//         rewardEntries: 100,
//         platform: 'twitter_follow',
//         actionUrl: '',
//         requiresWallet: false
//       });
//       if (session?.user?.dbData?._id) {
//         fetchAdminData(session.user.dbData._id);
//       }
//     } catch (err) {
//       toast.error('Failed to publish task', { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReviewClaim = async (claimId, action) => {
//     const toastId = toast.loading(`Processing claim ${action}...`);
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/admin/review-claim`, { claimId, action });
//       toast.success(`Claim ${action}d!`, { id: toastId });
//       fetchAdminData(session.user.dbData._id);
//     } catch (err) {
//       toast.error('Failed to process claim review', { id: toastId });
//     }
//   };

//   // Calculate Total Approved Points for Admin Counter
//   const totalApprovedPoints = claimList
//     .filter((claim) => claim.status === 'approved')
//     .reduce((acc, curr) => acc + (curr.points || 0), 0);

//   if (!isSuperAdmin) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-pixel text-sm p-4">
//         ACCESS DENIED: YOU ARE NOT A SUPER ADMIN!
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-6 font-chakra">
//       <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
//         {/* Header & Total Counter */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <span className="text-xl">👑</span>
//             <div>
//               <h1 className="text-sm font-bold tracking-wider uppercase font-pixel text-[#00e699]">
//                 SUPER ADMIN PANEL
//               </h1>
//               <p className="text-xs text-gray-400">Manage tasks and review user reward withdrawal claims</p>
//             </div>
//           </div>

//           <div className="bg-[#020b08] border border-[#00e699]/30 px-4 py-2 rounded-xl text-xs font-pixel">
//             <span className="text-gray-400">Total Approved Claims: </span>
//             <span className="text-[#00e699] font-bold text-sm">{totalApprovedPoints} Entries</span>
//           </div>
//         </div>

//         {/* Upload Task Form */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">Upload New Task</h2>
//           <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Task Title</label>
//                 <input
//                   type="text"
//                   required
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                   placeholder="e.g. Follow on X"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Platform / Type</label>
//                 <select
//                   value={form.platform}
//                   onChange={(e) => setForm({ ...form, platform: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 >
//                   <option value="twitter_follow">Twitter Follow</option>
//                   <option value="twitter_like">Twitter Like</option>
//                   <option value="twitter_retweet">Twitter Retweet</option>
//                   <option value="wallet_submit">Wallet Submission</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="text-xs text-gray-400 uppercase font-semibold">Description</label>
//               <input
//                 type="text"
//                 required
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 placeholder="Task description..."
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Reward Entries</label>
//                 <input
//                   type="number"
//                   required
//                   value={form.rewardEntries}
//                   onChange={(e) => setForm({ ...form, rewardEntries: Number(e.target.value) })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase font-semibold">Action URL</label>
//                 <input
//                   type="url"
//                   value={form.actionUrl}
//                   onChange={(e) => setForm({ ...form, actionUrl: e.target.value })}
//                   className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
//                   placeholder="https://x.com/..."
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 py-3.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer transition-all"
//             >
//               Publish Task
//             </button>
//           </form>
//         </div>

//         {/* User Reward Claims & History */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             User Reward Claims & History
//           </h2>

//           {claimList.length === 0 ? (
//             <p className="text-xs text-gray-400">No reward claims history available.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {claimList.map((claim) => (
//                 <div key={claim._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
//                   <div>
//                     <h4 className="text-xs font-bold text-white">User: @{claim.username}</h4>
//                     <p className="text-xs text-[#00e699] font-mono mt-1">Requested: {claim.points} Entries</p>
//                     <p className="text-[10px] text-gray-400 mt-0.5">
//                       Status: <span className={claim.status === 'approved' ? 'text-green-400 font-bold' : claim.status === 'rejected' ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>{claim.status.toUpperCase()}</span> | Date: {new Date(claim.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   {claim.status === 'pending' && (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleReviewClaim(claim._id, 'approve')}
//                         className="px-3 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleReviewClaim(claim._id, 'reject')}
//                         className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer"
//                       >
//                         Reject (Refund)
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminTasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    rewardEntries: 100,
    platform: 'visit',
    actionUrl: '',
    requiresWallet: false
  });

  const [pendingList, setPendingList] = useState([]);
  const [claimList, setClaimList] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.dbData?._id) {
      checkAndFetchAdmin(session.user.dbData._id);
    }
  }, [status, session, router]);

  const checkAndFetchAdmin = async (adminId) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const res = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
      
      setIsSuperAdmin(true);
      setPendingList(res.data.pendingSubmissions || []);
      setClaimList(res.data.pendingClaims || []);
    } catch (err) {
      setIsSuperAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Publishing task...');
    setPublishing(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      await axios.post(`${backendUrl}/tasks/create`, form);
      toast.success('Task published successfully!', { id: toastId });
      setForm({
        title: '',
        description: '',
        rewardEntries: 100,
        platform: 'visit',
        actionUrl: '',
        requiresWallet: false
      });
      if (session?.user?.dbData?._id) {
        checkAndFetchAdmin(session.user.dbData._id);
      }
    } catch (err) {
      toast.error('Failed to publish task', { id: toastId });
    } finally {
      setPublishing(false);
    }
  };

  const handleReviewTask = async (userTaskId, action) => {
    const toastId = toast.loading(`Processing ${action}...`);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      await axios.post(`${backendUrl}/tasks/admin/review`, { userTaskId, action });
      toast.success(`Wallet submission ${action}d!`, { id: toastId });
      checkAndFetchAdmin(session.user.dbData._id);
    } catch (err) {
      toast.error('Failed to review submission', { id: toastId });
    }
  };

  const handleReviewClaim = async (claimId, action) => {
    const toastId = toast.loading(`Processing claim ${action}...`);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      await axios.post(`${backendUrl}/tasks/admin/review-claim`, { claimId, action });
      toast.success(`Claim request ${action}d!`, { id: toastId });
      checkAndFetchAdmin(session.user.dbData._id);
    } catch (err) {
      toast.error('Failed to process claim review', { id: toastId });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
        VERIFYING ADMIN...
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 font-pixel text-sm p-4 gap-4">
        <p>ACCESS DENIED: SUPER ADMIN PRIVILEGES REQUIRED!</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-[#00e699] text-black font-bold rounded-xl text-xs cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isWalletTask = form.platform === 'wallet_submit' || form.requiresWallet;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-chakra">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">👑</span>
            <div>
              <h1 className="text-sm font-bold tracking-wider uppercase font-pixel text-[#00e699]">
                TASK & WALLET MANAGEMENT
              </h1>
              <p className="text-xs text-gray-400">Review submissions and publish new campaign tasks</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-all"
          >
            ← Back to Overview
          </button>
        </div>

        {/* Upload Task Form */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
          <h2 className="text-base font-bold font-pixel text-[#00e699] mb-4 uppercase">Upload New Task</h2>
          <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-semibold">Task Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
                  placeholder="e.g. Submit EVM Wallet"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-semibold">Platform / Type</label>
                <select
                  value={form.platform}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({
                      ...form,
                      platform: val,
                      requiresWallet: val === 'wallet_submit'
                    });
                  }}
                  className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
                >
                  <option value="visit">Visit Task (Timer)</option>
                  <option value="wallet_submit">Wallet Submission</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase font-semibold">Description</label>
              <input
                type="text"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
                placeholder="Task description..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-semibold">Reward Entries</label>
                <input
                  type="number"
                  required
                  value={form.rewardEntries}
                  onChange={(e) => setForm({ ...form, rewardEntries: Number(e.target.value) })}
                  className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
                />
              </div>

              {!isWalletTask && (
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold">Action URL</label>
                  <input
                    type="url"
                    required
                    value={form.actionUrl}
                    onChange={(e) => setForm({ ...form, actionUrl: e.target.value })}
                    className="w-full mt-1 bg-[#020b08] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00e699]"
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2 bg-[#020b08] border border-white/5 p-3 rounded-xl">
              <input
                type="checkbox"
                id="requiresWallet"
                checked={form.requiresWallet}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setForm({
                    ...form,
                    requiresWallet: checked,
                    platform: checked ? 'wallet_submit' : 'visit'
                  });
                }}
                className="w-5 h-5 accent-[#00e699] cursor-pointer"
              />
              <label htmlFor="requiresWallet" className="text-xs text-gray-200 font-semibold cursor-pointer">
                Enable Wallet Address Input Field for this task (Requires Admin Approval)
              </label>
            </div>

            <button
              type="submit"
              disabled={publishing}
              className="mt-4 py-3.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer transition-all"
            >
              Publish Task
            </button>
          </form>
        </div>


      </div>
    </div>
  );
}
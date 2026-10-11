// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function AdminOverviewPage() {
//   const { data: session, status, update: updateSession } = useSession();
//   const router = useRouter();

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTasks: 0,
//     pendingWallets: 0,
//     pendingClaims: 0,
//     approvedClaims: 0,
//     rejectedClaims: 0
//   });

//   const [pendingWalletsList, setPendingWalletsList] = useState([]);
//   const [pendingClaimsList, setPendingClaimsList] = useState([]);
//   const [isSuperAdmin, setIsSuperAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [adminPoints, setAdminPoints] = useState(0);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchAdminData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   const fetchAdminData = async (adminId) => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

//     try {
//       const statsRes = await axios.get(`${backendUrl}/tasks/admin/stats?adminId=${adminId}`);
//       if (statsRes.data.success) {
//         setStats(statsRes.data.stats || {});
//       }

//       // Fetch Latest Admin User Data directly for real-time points sync
//       const userRes = await axios.get(`${backendUrl}/tasks?userId=${adminId}`);
//       if (userRes.data?.currentUser) {
//         setAdminPoints(userRes.data.currentUser.entries || 0);
//       }

//       const pendingRes = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
//       if (pendingRes.data.success) {
//         setIsSuperAdmin(true);
//         // Filter ONLY pending wallet submissions
//         setPendingWalletsList(
//           (pendingRes.data.pendingSubmissions || []).filter((item) => item.status === 'pending')
//         );
//         // Filter ONLY pending reward claims
//         setPendingClaimsList(
//           (pendingRes.data.pendingClaims || []).filter((claim) => claim.status === 'pending')
//         );
//       }
//     } catch (err) {
//       setIsSuperAdmin(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReviewTask = async (userTaskId, action) => {
//     const toastId = toast.loading(`Processing ${action}...`);
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       await axios.post(`${backendUrl}/tasks/admin/review`, { userTaskId, action });
//       toast.success(`Wallet submission ${action}d!`, { id: toastId });
//       fetchAdminData(session.user.dbData._id);
//     } catch (err) {
//       toast.error('Failed to review submission', { id: toastId });
//     }
//   };

//   const handleReviewClaim = async (claimId, action) => {
//     const toastId = toast.loading(`Processing claim ${action}...`);
//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
//       const adminId = session?.user?.dbData?._id || session?.user?._id;
      
//       // Admin ID shoh backend-e point transfer request pathano hocchhe
//       await axios.post(`${backendUrl}/tasks/admin/review-claim`, {
//         claimId,
//         action,
//         adminId
//       });

//       toast.success(`Claim request ${action}d!`, { id: toastId });
      
//       // Update NextAuth Session & Sync Points immediately
//       if (typeof updateSession === 'function') {
//         await updateSession();
//       }

//       // Admin dashboard data reload & sync
//       if (adminId) {
//         await fetchAdminData(adminId);
//       }
//     } catch (err) {
//       toast.error('Failed to process claim review', { id: toastId });
//     }
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         VERIFYING SUPER ADMIN ACCESS...
//       </div>
//     );
//   }

//   if (!isSuperAdmin) {
//     return (
//       <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 font-pixel text-sm p-4 gap-4">
//         <p>ACCESS DENIED: SUPER ADMIN PRIVILEGES REQUIRED!</p>
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="px-4 py-2 bg-[#00e699] text-black font-bold rounded-xl text-xs cursor-pointer"
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-6 font-chakra">
//       <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
//         {/* Header Navigation */}
// {/* Header Navigation */}
// <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//   <div>
//     <h1 className="text-base font-bold tracking-wider uppercase font-pixel text-[#00e699]">
//       👑 SUPER ADMIN DASHBOARD
//     </h1>
//     <p className="text-xs text-gray-400 mt-1">Pending wallet approvals & withdrawal claims</p>
//   </div>

//   <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
//     {/* Super Admin Total Points Display */}
//     <div className="bg-[#020b08] border border-[#00e699]/40 px-3.5 py-2 rounded-xl flex items-center gap-2">
//       <span className="text-[10px] text-gray-400 font-pixel uppercase">ADMIN POINTS:</span>
//       <span className="text-xs font-bold font-pixel text-[#00e699]">
//         {Number(adminPoints || session?.user?.dbData?.entries || 0).toLocaleString()} Entries
//       </span>
//     </div>

//     <div className="flex gap-2">
//       <button
//         onClick={() => router.push('/admin/history')}
//         className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-all border border-white/10"
//       >
//         📜 View History
//       </button>
//       <button
//         onClick={() => router.push('/admin/tasks')}
//         className="px-4 py-2.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer transition-all shadow-[0_0_15px_rgba(0,230,153,0.3)]"
//       >
//         + Create Task
//       </button>
//     </div>
//   </div>
// </div>

//         {/* Analytics Summary */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-[#051711] border border-[#00e699]/30 p-5 rounded-2xl flex flex-col gap-1">
//             <span className="text-xs text-gray-400 uppercase font-pixel">Total Users</span>
//             <span className="text-2xl font-bold font-pixel text-white">{stats.totalUsers || 0}</span>
//           </div>

//           <div className="bg-[#051711] border border-[#00e699]/30 p-5 rounded-2xl flex flex-col gap-1">
//             <span className="text-xs text-gray-400 uppercase font-pixel">Total Tasks</span>
//             <span className="text-2xl font-bold font-pixel text-[#00e699]">{stats.totalTasks || 0}</span>
//           </div>

//           <div className="bg-[#051711] border border-[#00e699]/30 p-5 rounded-2xl flex flex-col gap-1">
//             <span className="text-xs text-gray-400 uppercase font-pixel">Pending Wallets</span>
//             <span className="text-2xl font-bold font-pixel text-amber-400">{pendingWalletsList.length}</span>
//           </div>

//           <div className="bg-[#051711] border border-[#00e699]/30 p-5 rounded-2xl flex flex-col gap-1">
//             <span className="text-xs text-gray-400 uppercase font-pixel">Pending Claims</span>
//             <span className="text-2xl font-bold font-pixel text-amber-400">{pendingClaimsList.length}</span>
//           </div>
//         </div>

//         {/* 1. ONLY PENDING Wallet Submissions */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Pending Wallet Submissions ({pendingWalletsList.length})
//           </h2>

//           {pendingWalletsList.length === 0 ? (
//             <p className="text-xs text-gray-400 font-pixel">No pending wallet submissions at the moment.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {pendingWalletsList.map((item) => (
//                 <div key={item._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                   <div className="min-w-0 flex-1">
//                     <h4 className="text-xs font-bold text-white">Task: {item.task?.title}</h4>
//                     <p className="text-[11px] text-gray-400 mt-0.5">
//                       User: {item.user?.name} (@{item.user?.username})
//                     </p>
//                     <p className="text-xs text-[#00e699] font-mono mt-1 bg-black/40 px-2.5 py-1.5 rounded border border-[#00e699]/20 flex items-center justify-between gap-2">
//                       <span className="truncate">Submitted Wallet: {item.submittedWallet}</span>
//                       <button
//                         onClick={() => {
//                           navigator.clipboard.writeText(item.submittedWallet);
//                           toast.success('Wallet address copied!');
//                         }}
//                         className="p-1 text-gray-400 hover:text-[#00e699] hover:bg-white/10 rounded transition-all shrink-0 cursor-pointer"
//                         title="Copy Address"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
//                         </svg>
//                       </button>
//                     </p>
//                   </div>
//                   <div className="flex gap-2 w-full sm:w-auto">
//                     <button
//                       onClick={() => handleReviewTask(item._id, 'approve')}
//                       className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReviewTask(item._id, 'reject')}
//                       className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 2. ONLY PENDING Reward Withdrawal Claims */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Pending User Reward Withdrawal Claims ({pendingClaimsList.length})
//           </h2>

//           {pendingClaimsList.length === 0 ? (
//             <p className="text-xs text-gray-400 font-pixel">No pending reward claim requests.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {pendingClaimsList.map((claim) => (
//                 <div key={claim._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
//                   <div>
//                     <h4 className="text-xs font-bold text-white">User: @{claim.username}</h4>
//                     <p className="text-xs text-[#00e699] font-mono mt-1">Requested: {claim.points} Entries</p>
//                     <p className="text-[10px] text-gray-400 mt-0.5">
//                       Date: {new Date(claim.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleReviewClaim(claim._id, 'approve')}
//                       className="px-3 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReviewClaim(claim._id, 'reject')}
//                       className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer"
//                     >
//                       Reject (Refund)
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


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminOverviewPage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    pendingWallets: 0,
    pendingClaims: 0,
    approvedClaims: 0,
    rejectedClaims: 0
  });

  const [pendingWalletsList, setPendingWalletsList] = useState([]);
  const [pendingClaimsList, setPendingClaimsList] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminPoints, setAdminPoints] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.dbData?._id) {
      fetchAdminData(session.user.dbData._id);
    }
  }, [status, session, router]);

  const fetchAdminData = async (adminId) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

    try {
      const statsRes = await axios.get(`${backendUrl}/tasks/admin/stats?adminId=${adminId}`);
      if (statsRes.data.success) {
        setStats(statsRes.data.stats || {});
      }

      // Fetch Latest Admin User Data directly for real-time points sync
      const userRes = await axios.get(`${backendUrl}/tasks?userId=${adminId}`);
      if (userRes.data?.currentUser) {
        setAdminPoints(userRes.data.currentUser.entries || 0);
      }

      const pendingRes = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
      if (pendingRes.data.success) {
        setIsSuperAdmin(true);
        // Filter ONLY pending wallet submissions
        setPendingWalletsList(
          (pendingRes.data.pendingSubmissions || []).filter((item) => item.status === 'pending')
        );
        // Filter ONLY pending reward claims
        setPendingClaimsList(
          (pendingRes.data.pendingClaims || []).filter((claim) => claim.status === 'pending')
        );
      }
    } catch (err) {
      setIsSuperAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewTask = async (userTaskId, action) => {
    const toastId = toast.loading(`Processing ${action}...`);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      await axios.post(`${backendUrl}/tasks/admin/review`, { userTaskId, action });
      toast.success(`Wallet submission ${action}d!`, { id: toastId });
      fetchAdminData(session.user.dbData._id);
    } catch (err) {
      toast.error('Failed to review submission', { id: toastId });
    }
  };

  const handleReviewClaim = async (claimId, action) => {
    const toastId = toast.loading(`Processing claim ${action}...`);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const adminId = session?.user?.dbData?._id || session?.user?._id;
      
      // Admin ID shoh backend-e point transfer request pathano hocchhe
      await axios.post(`${backendUrl}/tasks/admin/review-claim`, {
        claimId,
        action,
        adminId
      });

      toast.success(`Claim request ${action}d!`, { id: toastId });
      
      // Update NextAuth Session & Sync Points immediately
      if (typeof updateSession === 'function') {
        await updateSession();
      }

      // Admin dashboard data reload & sync
      if (adminId) {
        await fetchAdminData(adminId);
      }
    } catch (err) {
      toast.error('Failed to process claim review', { id: toastId });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest p-4 text-center">
        VERIFYING SUPER ADMIN ACCESS...
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 font-pixel text-sm p-4 gap-4 text-center">
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

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6 font-chakra">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
        
        {/* Header Navigation */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-wider uppercase font-pixel text-[#00e699]">
              👑 SUPER ADMIN DASHBOARD
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Pending wallet approvals & withdrawal claims</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Super Admin Total Points Display */}
            <div className="bg-[#020b08] border border-[#00e699]/40 px-3.5 py-2 rounded-xl flex items-center justify-between sm:justify-start gap-2">
              <span className="text-[10px] text-gray-400 font-pixel uppercase">ADMIN POINTS:</span>
              <span className="text-xs font-bold font-pixel text-[#00e699]">
                {Number(adminPoints || session?.user?.dbData?.entries || 0).toLocaleString()} Entries
              </span>
            </div>

            <div className="grid grid-cols-2 sm:flex gap-2">
              <button
                onClick={() => router.push('/admin/history')}
                className="w-full sm:w-auto px-3 sm:px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-all border border-white/10 text-center"
              >
                📜 View History
              </button>
              <button
                onClick={() => router.push('/admin/tasks')}
                className="w-full sm:w-auto px-3 sm:px-4 py-2.5 bg-[#00e699] hover:bg-[#00c784] text-black font-bold rounded-xl text-xs cursor-pointer transition-all shadow-[0_0_15px_rgba(0,230,153,0.3)] text-center"
              >
                + Create Task
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#051711] border border-[#00e699]/30 p-4 sm:p-5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-pixel">Total Users</span>
            <span className="text-xl sm:text-2xl font-bold font-pixel text-white">{stats.totalUsers || 0}</span>
          </div>

          <div className="bg-[#051711] border border-[#00e699]/30 p-4 sm:p-5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-pixel">Total Tasks</span>
            <span className="text-xl sm:text-2xl font-bold font-pixel text-[#00e699]">{stats.totalTasks || 0}</span>
          </div>

          <div className="bg-[#051711] border border-[#00e699]/30 p-4 sm:p-5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-pixel">Pending Wallets</span>
            <span className="text-xl sm:text-2xl font-bold font-pixel text-amber-400">{pendingWalletsList.length}</span>
          </div>

          <div className="bg-[#051711] border border-[#00e699]/30 p-4 sm:p-5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-pixel">Pending Claims</span>
            <span className="text-xl sm:text-2xl font-bold font-pixel text-amber-400">{pendingClaimsList.length}</span>
          </div>
        </div>

        {/* 1. ONLY PENDING Wallet Submissions */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 sm:p-6">
          <h2 className="text-xs sm:text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
            Pending Wallet Submissions ({pendingWalletsList.length})
          </h2>

          {pendingWalletsList.length === 0 ? (
            <p className="text-xs text-gray-400 font-pixel">No pending wallet submissions at the moment.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pendingWalletsList.map((item) => (
                <div key={item._id} className="bg-[#020b08] border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1 w-full">
                    <h4 className="text-xs font-bold text-white break-words">Task: {item.task?.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      User: {item.user?.name} (@{item.user?.username})
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#00e699] font-mono mt-1.5 bg-black/40 px-2.5 py-1.5 rounded border border-[#00e699]/20 flex items-center justify-between gap-2 min-w-0">
                      <span className="truncate">Submitted Wallet: {item.submittedWallet}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.submittedWallet);
                          toast.success('Wallet address copied!');
                        }}
                        className="p-1 text-gray-400 hover:text-[#00e699] hover:bg-white/10 rounded transition-all shrink-0 cursor-pointer"
                        title="Copy Address"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
                        </svg>
                      </button>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full md:w-auto shrink-0">
                    <button
                      onClick={() => handleReviewTask(item._id, 'approve')}
                      className="w-full md:w-auto px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer text-center"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReviewTask(item._id, 'reject')}
                      className="w-full md:w-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer text-center"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. ONLY PENDING Reward Withdrawal Claims */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-4 sm:p-6">
          <h2 className="text-xs sm:text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
            Pending User Reward Withdrawal Claims ({pendingClaimsList.length})
          </h2>

          {pendingClaimsList.length === 0 ? (
            <p className="text-xs text-gray-400 font-pixel">No pending reward claim requests.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pendingClaimsList.map((claim) => (
                <div key={claim._id} className="bg-[#020b08] border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">User: @{claim.username}</h4>
                    <p className="text-xs text-[#00e699] font-mono mt-1">Requested: {claim.points} Entries</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Date: {new Date(claim.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleReviewClaim(claim._id, 'approve')}
                      className="w-full sm:w-auto px-3 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-lg cursor-pointer text-center"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReviewClaim(claim._id, 'reject')}
                      className="w-full sm:w-auto px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-lg cursor-pointer text-center"
                    >
                      Reject (Refund)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
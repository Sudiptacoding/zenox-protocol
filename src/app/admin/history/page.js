// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function AdminHistoryPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [claimHistory, setClaimHistory] = useState([]);
//   const [walletHistory, setWalletHistory] = useState([]);
//   const [isSuperAdmin, setIsSuperAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/');
//     } else if (status === 'authenticated' && session?.user?.dbData?._id) {
//       fetchHistoryData(session.user.dbData._id);
//     }
//   }, [status, session, router]);

//   const fetchHistoryData = async (adminId) => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

//     try {
//       const res = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
//       if (res.data.success) {
//         setIsSuperAdmin(true);
        
//         const allSubmissions = res.data.pendingSubmissions || [];
//         const allClaims = res.data.pendingClaims || [];

//         // Filter ONLY Reviewed Wallets (Approved / Completed or Rejected)
//         const reviewedWallets = allSubmissions.filter(
//           (item) => ['approved', 'completed', 'rejected'].includes(item.status)
//         );
//         setWalletHistory(reviewedWallets);

//         // Filter ONLY Reviewed Withdrawal Claims (Approved or Rejected)
//         const reviewedClaims = allClaims.filter(
//           (claim) => ['approved', 'rejected'].includes(claim.status)
//         );
//         setClaimHistory(reviewedClaims);
//       }
//     } catch (err) {
//       setIsSuperAdmin(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING HISTORY LOG...
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
        
//         {/* Header */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-base font-bold tracking-wider uppercase font-pixel text-[#00e699]">
//               📜 SYSTEM HISTORY LOG
//             </h1>
//             <p className="text-xs text-gray-400 mt-1">Archived log of reviewed wallet submissions and user claims</p>
//           </div>
//           <button
//             onClick={() => router.push('/admin')}
//             className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-all border border-white/10"
//           >
//             ← Back to Dashboard
//           </button>
//         </div>

//         {/* 1. REVIEWED WALLET SUBMISSIONS HISTORY */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Reviewed Wallet Submissions ({walletHistory.length})
//           </h2>

//           {walletHistory.length === 0 ? (
//             <p className="text-xs text-gray-400 font-pixel">No reviewed wallet submissions history available.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {walletHistory.map((item) => {
//                 const isApproved = item.status === 'approved' || item.status === 'completed';
//                 return (
//                   <div key={item._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                     <div className="min-w-0 flex-1">
//                       <h4 className="text-xs font-bold text-white">Task: {item.task?.title || 'Wallet Submission'}</h4>
//                       <p className="text-[11px] text-gray-400 mt-0.5">
//                         User: {item.user?.name || 'User'} (@{item.user?.username || 'user'})
//                       </p>
                      
//                       {/* Wallet Address Box with Easy Copy Button */}
//                       {item.submittedWallet && (
//                         <p className="text-xs text-[#00e699] font-mono mt-2 bg-black/50 px-3 py-1.5 rounded-lg border border-[#00e699]/20 flex items-center justify-between gap-2">
//                           <span className="truncate">Wallet: {item.submittedWallet}</span>
//                           <button
//                             onClick={() => {
//                               navigator.clipboard.writeText(item.submittedWallet);
//                               toast.success('Wallet address copied!');
//                             }}
//                             className="p-1 text-gray-400 hover:text-[#00e699] hover:bg-white/10 rounded transition-all shrink-0 cursor-pointer"
//                             title="Copy Wallet Address"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
//                             </svg>
//                           </button>
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase ${
//                         isApproved
//                           ? 'bg-green-500/10 text-green-400 border border-green-500/20'
//                           : 'bg-red-500/10 text-red-400 border border-red-500/20'
//                       }`}>
//                         {isApproved ? 'APPROVED' : 'REJECTED'}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* 2. COMPLETED WITHDRAWAL LOG */}
//         <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
//           <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
//             Completed Withdrawal Log ({claimHistory.length})
//           </h2>

//           {claimHistory.length === 0 ? (
//             <p className="text-xs text-gray-400 font-pixel">No reward claims history available.</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {claimHistory.map((claim) => (
//                 <div key={claim._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
//                   <div>
//                     <h4 className="text-xs font-bold text-white">User: @{claim.username}</h4>
//                     <p className="text-xs text-[#00e699] font-mono mt-1">Amount: {claim.points} Entries</p>
//                     <p className="text-[10px] text-gray-500 mt-0.5">
//                       Reviewed Date: {claim.reviewedAt ? new Date(claim.reviewedAt).toLocaleString() : new Date(claim.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div>
//                     <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase ${
//                       claim.status === 'approved' 
//                         ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
//                         : 'bg-red-500/10 text-red-400 border border-red-500/20'
//                     }`}>
//                       {claim.status}
//                     </span>
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

export default function AdminHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [claimHistory, setClaimHistory] = useState([]);
  const [walletHistory, setWalletHistory] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.dbData?._id) {
      fetchHistoryData(session.user.dbData._id);
    }
  }, [status, session, router]);

  const fetchHistoryData = async (adminId) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';

    try {
      const res = await axios.get(`${backendUrl}/tasks/admin/pending?adminId=${adminId}`);
      if (res.data.success) {
        setIsSuperAdmin(true);
        
        const allSubmissions = res.data.pendingSubmissions || [];
        const allClaims = res.data.pendingClaims || [];

        // Filter ONLY Reviewed Wallets (Approved / Completed or Rejected)
        const reviewedWallets = allSubmissions.filter(
          (item) => ['approved', 'completed', 'rejected'].includes(item.status)
        );
        setWalletHistory(reviewedWallets);

        // Filter ONLY Reviewed Withdrawal Claims (Approved or Rejected)
        const reviewedClaims = allClaims.filter(
          (claim) => ['approved', 'rejected'].includes(claim.status)
        );
        setClaimHistory(reviewedClaims);
      }
    } catch (err) {
      setIsSuperAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWallet = async (id) => {
    if (!confirm('Are you sure you want to delete this history record?')) return;
    const toastId = toast.loading('Deleting...');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const adminId = session?.user?.dbData?._id;
      await axios.delete(`${backendUrl}/admin/history/wallet/${id}?adminId=${adminId}`);
      toast.success('Deleted successfully!', { id: toastId });
      fetchHistoryData(adminId);
    } catch (err) {
      toast.error('Failed to delete', { id: toastId });
    }
  };

  const handleDeleteClaim = async (id) => {
    if (!confirm('Are you sure you want to delete this claim record?')) return;
    const toastId = toast.loading('Deleting...');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://zenox-protocol-backend.vercel.app/api';
      const adminId = session?.user?.dbData?._id;
      await axios.delete(`${backendUrl}/admin/history/claim/${id}?adminId=${adminId}`);
      toast.success('Deleted successfully!', { id: toastId });
      fetchHistoryData(adminId);
    } catch (err) {
      toast.error('Failed to delete', { id: toastId });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
        LOADING HISTORY LOG...
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

  return (
    <div className="min-h-screen bg-black text-white p-6 font-chakra">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-bold tracking-wider uppercase font-pixel text-[#00e699]">
              📜 SYSTEM HISTORY LOG
            </h1>
            <p className="text-xs text-gray-400 mt-1">Archived log of reviewed wallet submissions and user claims</p>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-all border border-white/10"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* 1. REVIEWED WALLET SUBMISSIONS HISTORY */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
          <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
            Reviewed Wallet Submissions ({walletHistory.length})
          </h2>

          {walletHistory.length === 0 ? (
            <p className="text-xs text-gray-400 font-pixel">No reviewed wallet submissions history available.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {walletHistory.map((item) => {
                const isApproved = item.status === 'approved' || item.status === 'completed';
                return (
                  <div key={item._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white">Task: {item.task?.title || 'Wallet Submission'}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        User: {item.user?.name || 'User'} (@{item.user?.username || 'user'})
                      </p>
                      
                      {/* Wallet Address Box with Easy Copy Button */}
                      {item.submittedWallet && (
                        <p className="text-xs text-[#00e699] font-mono mt-2 bg-black/50 px-3 py-1.5 rounded-lg border border-[#00e699]/20 flex items-center justify-between gap-2">
                          <span className="truncate">Wallet: {item.submittedWallet}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.submittedWallet);
                              toast.success('Wallet address copied!');
                            }}
                            className="p-1 text-gray-400 hover:text-[#00e699] hover:bg-white/10 rounded transition-all shrink-0 cursor-pointer"
                            title="Copy Wallet Address"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
                            </svg>
                          </button>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase ${
                        isApproved
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {isApproved ? 'APPROVED' : 'REJECTED'}
                      </span>
                      <button
                        onClick={() => handleDeleteWallet(item._id)}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-xl cursor-pointer border border-red-500/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. COMPLETED WITHDRAWAL LOG */}
        <div className="bg-[#051711] border border-[#00e699]/40 rounded-2xl p-6">
          <h2 className="text-sm font-bold font-pixel text-[#00e699] mb-4 uppercase">
            Completed Withdrawal Log ({claimHistory.length})
          </h2>

          {claimHistory.length === 0 ? (
            <p className="text-xs text-gray-400 font-pixel">No reward claims history available.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {claimHistory.map((claim) => (
                <div key={claim._id} className="bg-[#020b08] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">User: @{claim.username}</h4>
                    <p className="text-xs text-[#00e699] font-mono mt-1">Amount: {claim.points} Entries</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Reviewed Date: {claim.reviewedAt ? new Date(claim.reviewedAt).toLocaleString() : new Date(claim.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase ${
                      claim.status === 'approved' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {claim.status}
                    </span>
                    <button
                      onClick={() => handleDeleteClaim(claim._id)}
                      className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-xl cursor-pointer border border-red-500/30 transition-all"
                    >
                      Delete
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
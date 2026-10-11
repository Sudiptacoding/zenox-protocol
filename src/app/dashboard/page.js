// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState, useMemo } from 'react';
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

//   // Countdown timer for Visit tasks
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
      
//       // Filter tasks to keep only those created within the last 7 days
//       const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
//       const now = Date.now();
//       const recentTasks = fetchedTasks.filter((task) => {
//         if (!task.createdAt) return true; // keep task if createdAt is not specified
//         return now - new Date(task.createdAt).getTime() <= SEVEN_DAYS_MS;
//       });

//       setTasks(recentTasks);

//       // Sort leaderboard strictly by point balance (entries) descending
//       const sortedLeaderboard = (res.data.leaderboard || []).sort(
//         (a, b) => (b.entries || 0) - (a.entries || 0)
//       );
//       setLeaderboard(sortedLeaderboard);

//       if (res.data.currentUser) {
//         setDbUser(res.data.currentUser);
//       }

//       // Restore timer state on refresh if a task was already started
//       const restoredTimers = {};
//       const restoredRemaining = {};

//       recentTasks.forEach((task) => {
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

//   // Claim Daily Free Reward
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

//   // Start Visit Task timer
//   const handleStartTwitterTask = async (task) => {
//     if (verifyingId === task._id) return;

//     if (!task.actionUrl) {
//       toast.error('This task does not have a visit link');
//       return;
//     }

//     const taskWindow = window.open('about:blank', '_blank');

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

//   // Complete Visit Task after countdown
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

//       await fetchData(dbUser._id);
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   // Submit EVM Wallet
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

//   // Task Counts for Filter Tabs
//   const taskCounts = useMemo(() => {
//     const all = tasks.length;
//     const todo = tasks.filter(
//       (t) => t.status === 'todo' || t.status === 'started'
//     ).length;
//     const done = tasks.filter((t) => t.status === 'completed').length;
//     return { all, todo, done };
//   }, [tasks]);

//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'To do') {
//       return task.status === 'todo' || task.status === 'started';
//     }

//     if (filter === 'Done') {
//       return task.status === 'completed';
//     }

//     return true;
//   });

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
//         LOADING ZENOX PROTOCOL...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white font-chakra pb-28">
//       <Navbar 
//   user={{ ...session?.user, dbData: dbUser }} 
//   onRefresh={() => fetchData(dbUser._id)} 
// />

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

//           {/* Filter Tabs with Counts */}
//           <div className="flex gap-2 mb-4">
//             {[
//               { name: 'All', count: taskCounts.all },
//               { name: 'To do', count: taskCounts.todo },
//               { name: 'Done', count: taskCounts.done }
//             ].map((tab) => (
//               <button
//                 key={tab.name}
//                 onClick={() => setFilter(tab.name)}
//                 className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
//                   filter === tab.name
//                     ? 'bg-[#00e699]/20 text-[#00e699] border border-[#00e699]/50 font-bold'
//                     : 'bg-[#020b08] text-gray-400 border border-transparent'
//                 }`}
//               >
//                 <span>{tab.name}</span>
//                 <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
//                   filter === tab.name ? 'bg-[#00e699] text-black font-bold' : 'bg-white/10 text-gray-400'
//                 }`}>
//                   {tab.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-3">
//             {filteredTasks.length === 0 ? (
//               <div className="text-center py-6 text-xs text-gray-500 font-pixel">
//                 NO TASKS AVAILABLE
//               </div>
//             ) : (
//               filteredTasks.map((task) => {
//                 const isWalletTask =
//                   task.requiresWallet ||
//                   task.platform === 'wallet_submit';

//                 const remaining =
//                   remainingTimes[task._id] ?? MIN_TASK_SECONDS;

//                 const timerStarted =
//                   task.status === 'started' ||
//                   Boolean(taskTimers[task._id]);

//                 const busy = verifyingId === task._id;

//                 return (
//                   <div
//                     key={task._id}
//                     className="bg-[#020b08] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
//                   >
//                     <div className="flex items-center justify-between gap-3">
//                       <div className="flex items-center gap-3 min-w-0">
//                         <div className="w-10 h-10 shrink-0 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold">
//                           {isWalletTask ? '💳' : '𝕏'}
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="font-bold text-sm text-white">
//                             {task.title}
//                           </h4>
//                           <p className="text-xs text-gray-400">
//                             {task.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* ACTION BUTTON */}
//                       {/* <div className="shrink-0 flex flex-col items-end gap-2">
//                         {task.status === 'completed' && (
//                           <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl">
//                             ✓ Completed
//                           </span>
//                         )}

//                         {task.status === 'pending' && (
//                           <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl">
//                             ⏳ Pending Review
//                           </span>
//                         )}

//                         {!isWalletTask &&
//                           task.status !== 'completed' &&
//                           task.status !== 'pending' && (
//                             <button
//                               onClick={() =>
//                                 timerStarted
//                                   ? handleCompleteVisitTask(task)
//                                   : handleStartTwitterTask(task)
//                               }
//                               disabled={busy || (timerStarted && remaining > 0)}
//                               className="min-w-[112px] py-2.5 px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center"
//                             >
//                               {busy
//                                 ? 'Please wait...'
//                                 : timerStarted && remaining > 0
//                                   ? `Wait ${remaining}s`
//                                   : timerStarted
//                                     ? 'Complete Task'
//                                     : 'Visit Task'}
//                             </button>
//                           )}
//                       </div> */}
// {/* ACTION BUTTON */}
//                       <div className="shrink-0 flex flex-col items-end gap-2">
//                         {/* Approve বা Completed যেকোনোটি হলেই '✓ Completed' দেখাবে */}
//                         {(task.status === 'completed' || task.status === 'approved') && (
//                           <span className="text-xs text-[#00e699] font-bold px-3 py-1.5 bg-[#00e699]/10 rounded-xl border border-[#00e699]/30">
//                             ✓ Completed
//                           </span>
//                         )}

//                         {task.status === 'pending' && (
//                           <span className="text-xs text-amber-400 font-bold px-3 py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/30">
//                             ⏳ Pending Review
//                           </span>
//                         )}

//                         {!isWalletTask &&
//                           task.status !== 'completed' &&
//                           task.status !== 'approved' &&
//                           task.status !== 'pending' && (
//                             <button
//                               onClick={() =>
//                                 timerStarted
//                                   ? handleCompleteVisitTask(task)
//                                   : handleStartTwitterTask(task)
//                               }
//                               disabled={busy || (timerStarted && remaining > 0)}
//                               className="min-w-[112px] py-2.5 px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center"
//                             >
//                               {busy
//                                 ? 'Please wait...'
//                                 : timerStarted && remaining > 0
//                                   ? `Wait ${remaining}s`
//                                   : timerStarted
//                                     ? 'Complete Task'
//                                     : 'Visit Task'}
//                             </button>
//                           )}
//                       </div>


//                     </div>

//                     {/* WALLET SUBMISSION */}
// {/* WALLET SUBMISSION */}
//                     {(isWalletTask && (task.status === 'todo' || task.status === 'rejected' || !task.status)) && (
//                       <div className="flex gap-2 mt-1">
//                         <input
//                           type="text"
//                           placeholder="Enter EVM Wallet Address (0x...)"
//                           value={walletInputs[task._id] || ''}
//                           onChange={(e) =>
//                             setWalletInputs({
//                               ...walletInputs,
//                               [task._id]: e.target.value
//                             })
//                           }
//                           className="flex-1 min-w-0 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00e699]"
//                         />

//                         <button
//                           onClick={() => handleVerifyTask(task, true)}
//                           className="bg-[#00e699] hover:bg-[#00c784] text-black font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shrink-0"
//                         >
//                           {task.status === 'rejected' ? 'Resubmit' : 'Submit'}
//                         </button>
//                       </div>
//                     )}

//                     {timerStarted &&
//                       !isWalletTask &&
//                       task.status !== 'completed' &&
//                       task.status !== 'pending' && (
//                         <p className="text-[11px] text-gray-400">
//                           {remaining > 0
//                             ? `Keep the task page open. You can complete this task in ${remaining} seconds.`
//                             : 'Timer finished. Click Complete Task to claim your entries.'}
//                         </p>
//                       )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* GLOBAL LEADERBOARD */}
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
    const done = tasks.filter(
      (t) => t.status === 'completed' || t.status === 'approved'
    ).length;
    return { all, todo, done };
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'To do') {
      return task.status === 'todo' || task.status === 'started';
    }

    if (filter === 'Done') {
      return task.status === 'completed' || task.status === 'approved';
    }

    return true;
  });

  // Calculate Entry Progress percentage
  const entryProgress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(
      (t) => t.status === 'completed' || t.status === 'approved'
    ).length;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks]);

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

      <main className="max-w-xl mx-auto px-4 pt-4 sm:pt-6 flex flex-col gap-4 sm:gap-5">

        {/* PROGRESS BAR SECTION */}
        <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-4 flex flex-col gap-2.5 shadow-[0_0_20px_rgba(0,230,153,0.1)]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold font-pixel text-white uppercase tracking-wider">
              YOUR ENTRY PROGRESS
            </h4>
            <span className="text-xs font-bold font-pixel text-[#00e699]">
              {entryProgress}%
            </span>
          </div>
          <div className="w-full bg-[#020b08] h-2.5 rounded-full overflow-hidden border border-[#00e699]/20">
            <div 
              className="bg-[#00e699] h-full transition-all duration-300 shadow-[0_0_10px_rgba(0,230,153,0.5)]" 
              style={{ width: `${entryProgress}%` }}
            ></div>
          </div>
        </div>

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
              className="px-4 py-2 bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-xs rounded-xl cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)] transition-all shrink-0"
            >
              Claim Free
            </button>
          </div>
        )}

        {/* CAMPAIGN TASKS */}
        <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-4 sm:p-5">
          <h3 className="text-sm font-bold font-pixel text-white uppercase mb-4">
            CAMPAIGN TASKS
          </h3>

          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
            {[
              { name: 'All', count: taskCounts.all },
              { name: 'To do', count: taskCounts.todo },
              { name: 'Done', count: taskCounts.done }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setFilter(tab.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
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
                    className="bg-[#020b08] border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#00e699]/10 border border-[#00e699]/30 flex items-center justify-center text-[#00e699] font-bold text-sm">
                          {isWalletTask ? '💳' : '𝕏'}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                            {task.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      {/* ACTION BUTTON */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {(task.status === 'completed' || task.status === 'approved') && (
                          <span className="text-[11px] sm:text-xs text-[#00e699] font-bold px-2.5 sm:px-3 py-1.5 bg-[#00e699]/10 rounded-xl border border-[#00e699]/30 whitespace-nowrap">
                            ✓ Completed
                          </span>
                        )}

                        {task.status === 'pending' && (
                          <span className="text-[11px] sm:text-xs text-amber-400 font-bold px-2.5 sm:px-3 py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/30 whitespace-nowrap">
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
                              className="min-w-[95px] sm:min-w-[112px] py-2 sm:py-2.5 px-2.5 sm:px-3 bg-[#00e699] hover:bg-[#00c784] disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-xl text-[11px] sm:text-xs cursor-pointer shadow-[0_0_10px_rgba(0,230,153,0.3)] transition-all text-center whitespace-nowrap"
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
                    {(isWalletTask && (task.status === 'todo' || task.status === 'rejected' || !task.status)) && (
                      <div className="flex flex-col sm:flex-row gap-2 mt-1">
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
                      task.status !== 'approved' &&
                      task.status !== 'pending' && (
                        <p className="text-[10px] sm:text-[11px] text-gray-400">
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
        <div className="bg-[#051711] border border-[#00e699]/30 rounded-2xl p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-bold font-pixel text-white uppercase tracking-wider mb-4">
            GLOBAL LEADERBOARD
          </h3>

          <div className="flex flex-col gap-2">
            {leaderboard.map((item, idx) => (
              <div
                key={item._id || idx}
                className="flex items-center justify-between bg-[#020b08] border border-white/5 p-2.5 sm:p-3 rounded-xl gap-2"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#00e699]/20 text-[#00e699] font-pixel text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#00e699]/40 relative shrink-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                      @{item.username || 'user'}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 truncate">
                      {item.name}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] sm:text-xs font-bold font-pixel text-[#00e699] shrink-0">
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
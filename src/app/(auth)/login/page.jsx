'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState({
    days: '06',
    hours: '19',
    minutes: '21',
    seconds: '33',
  });

  // 1. Auto-Redirect: Logged in user-ke auto /dashboard e pathabe
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // 2. Real-time Countdown Logic (Dynamic Future Proof)
  useEffect(() => {
    // ফিক্সড ডেটের পরিবর্তে বর্তমান সময় থেকে সবসময় ৭ দিন বা ভবিষ্যতের একটি টার্গেট ডেট সেট করা হলো, 
    // যাতে হোস্টিং বা লাইভ করার পর টাইমার জিরো হয়ে বন্ধ হয়ে না যায়।
    const targetKey = 'zenox_campaign_target_time';
    let savedTarget = localStorage.getItem(targetKey);
    
    let targetDate;
    if (savedTarget) {
      targetDate = new Date(savedTarget).getTime();
    } else {
      // যদি ব্রাউজারে সেভ না থাকে, তবে আজকের থেকে ঠিক ৭ দিন পরের সময় টার্গেট হিসেবে ধরে নেবে
      const futureDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(targetKey, new Date(futureDate).toISOString());
      targetDate = futureDate;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      } else {
        // সময় শেষ হয়ে গেলে আবার স্বয়ংক্রিয়ভাবে নতুন ৭ দিন যোগ করে দিবে, যাতে টাইমার কখনো অফ না হয়
        const newFuture = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(targetKey, new Date(newFuture).toISOString());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Loading indicator for smooth authentication state resolution
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00e699] font-pixel text-xs tracking-widest">
        INITIALIZING ZENOX SYSTEM...
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 overflow-hidden bg-black font-chakra select-none">
      
      {/* 1. Background Video & Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 filter brightness-75 contrast-125"
        >
          <source src="/videos/corporate-city.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      </div>

      {/* 2. Brand Header */}
      <header className="relative z-10 pt-6 flex items-center justify-center">
        <div className="flex items-center gap-2 bg-black/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <div className="w-6 h-6 rounded-full border border-[#00e699] flex items-center justify-center bg-[#00e699]/10">
            <svg className="w-3.5 h-3.5 text-[#00e699]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-white uppercase">
            ZENOX PROTOCOL
          </span>
        </div>
      </header>

      {/* 3. Main Card & Countdown Section */}
      <section className="relative z-10 my-auto flex flex-col items-center text-center max-w-lg w-full px-2">
        
        <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#00e699] uppercase mb-1">
          EARLY USER CAMPAIGN
        </span>

        {/* Amount in Pixel Font */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-pixel my-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          $150,000
        </h1>

        <p className="text-xs md:text-sm tracking-[0.3em] text-gray-300 font-semibold uppercase mb-2">
          VAULT ALLOCATION
        </p>

        <p className="text-[11px] text-gray-400 mb-4">
          Limited Time Early Access Campaign
        </p>

        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00e699]/40 bg-[#00e699]/10 text-[#00e699] text-xs font-semibold mb-8 backdrop-blur-md hover:bg-[#00e699]/20 transition-all cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>View reward details</span>
        </button>

        <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-3">
          ENDS IN
        </span>

        {/* Timer Box Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-md mb-8">
          
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-[#031c14]/90 border border-[#00e699]/40 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-bold text-white font-pixel">
                {timeLeft.days}
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-2">DAYS</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-[#031c14]/90 border border-[#00e699]/40 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-bold text-white font-pixel">
                {timeLeft.hours}
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-2">HOURS</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-[#031c14]/90 border border-[#00e699]/40 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-bold text-white font-pixel">
                {timeLeft.minutes}
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-2">MIN</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-[#031c14]/90 border border-[#00e699]/40 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-bold text-white font-pixel">
                {timeLeft.seconds}
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-2">SEC</span>
          </div>

        </div>

        {/* Login Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mb-6">
          <button
            onClick={() => signIn('twitter', { callbackUrl: '/dashboard' })}
            className="w-full py-3 px-4 rounded-xl bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Continue with X</span>
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full py-3 px-4 rounded-xl bg-[#00e699] hover:bg-[#00c784] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,153,0.3)]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-400">
          By continuing you accept the{' '}
          <a href="#" className="underline text-gray-300 hover:text-[#00e699]">Rules</a> and{' '}
          <a href="#" className="underline text-gray-300 hover:text-[#00e699]">Privacy Policy</a>
        </p>

      </section>

      {/* 4. Footer */}
      <footer className="relative z-10 pb-4">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/80 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase backdrop-blur-md">
          <div className="w-6 h-6 rounded-md bg-amber-500 text-black flex items-center justify-center font-extrabold text-xs">
            YZ
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[9px] text-gray-400 font-semibold">BACKED BY</span>
            <span className="text-white text-xs tracking-widest font-extrabold">YZI LABS</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
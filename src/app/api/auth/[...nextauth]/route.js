import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // Twitter OAuth 2.0 PKCE (Free)
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // গুগল বা টুইটার থেকে সাইন ইন করার সাথে সাথে এক্সপ্রেস ব্যাকএন্ডে ডাটা সিঙ্ক করা
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
        const response = await axios.post(`${backendUrl}/users/sync`, {
          name: user.name,
          email: user.email || `${account.providerAccountId}@twitter.com`,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        // ব্যাকএন্ড থেকে আসা JWT ও রোল সেশনে ব্যবহারের জন্য ইউজারে সেট করা
        user.backendToken = response.data.token;
        user.role = response.data.user.role;
        user.dbId = response.data.user._id;
        return true;
      } catch (error) {
        console.error("Backend Sync Error:", error.response?.data || error.message);
        return true; // ব্যাকএন্ড সিঙ্কে সমস্যা হলেও ফ্রন্টএন্ড লগইন কন্টিনিউ করবে
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.role = user.role;
        token.dbId = user.dbId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.backendToken = token.backendToken;
        session.user.role = token.role;
        session.user.id = token.dbId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // হোম পেজই লগইন পেজ
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
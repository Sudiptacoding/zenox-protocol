


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import TwitterProvider from "next-auth/providers/twitter";
// import axios from "axios";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET,
//       version: "2.0",
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       try {
//         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://zenox-protocol-backend.vercel.app/api";
//         const userEmail = user.email || `${account.providerAccountId}@twitter.com`;

//         const response = await axios.post(`${backendUrl}/users/sync`, {
//           name: user.name,
//           email: userEmail,
//           image: user.image,
//           provider: account.provider,
//           providerAccountId: account.providerAccountId,
//           username: user.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'zenox_user'
//         });

//         user.backendToken = response.data.token;
//         user.dbData = response.data.user;
//         return true;
//       } catch (error) {
//         console.error("Backend Sync Error:", error.response?.data || error.message);
//         return true;
//       }
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.backendToken = user.backendToken;
//         token.dbData = user.dbData;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.backendToken = token.backendToken;
//         session.user.dbData = token.dbData;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


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
      version: "2.0",
      // Twitter API v2 theke username & followers fetch korar custom profile mapper
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          username: profile.data.username, // Real Twitter @handle
          image: profile.data.profile_image_url?.replace('_normal', ''), // High-res image
          followersCount: profile.data.public_metrics?.followers_count || 0,
        };
      },
      userinfo: {
        url: "https://api.twitter.com/2/users/me?user.fields=profile_image_url,public_metrics,username",
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://zenox-protocol-backend.vercel.app/api";
        const userEmail = user.email || `${account.providerAccountId}@twitter.com`;

        // Extracting actual username and followers
        const twitterHandle = profile?.data?.username || user.username || user.name.toLowerCase().replace(/\s+/g, '');
        const twitterFollowers = profile?.data?.public_metrics?.followers_count || 0;

        const response = await axios.post(`${backendUrl}/users/sync`, {
          name: user.name,
          email: userEmail,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          username: twitterHandle,
          followersCount: twitterFollowers,
        });

        user.backendToken = response.data.token;
        user.dbData = response.data.user;
        return true;
      } catch (error) {
        console.error("Backend Sync Error:", error.response?.data || error.message);
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.dbData = user.dbData;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.backendToken = token.backendToken;
        session.user.dbData = token.dbData;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// import  NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const { handlers, auth, signIn, signOut} = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     async session({ session, token }: any) {
//       if (session.user) {
//         session.user.id = token.sub as string; 
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, 
// });

// // import NextAuth from "next-auth";
// // import GoogleProvider from "next-auth/providers/google";

// // export const authOptions = {
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID as string,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// //     }),
// //   ],
// //   callbacks: {
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     async session({ session, token }: any) {
// //       session.user.id = token.sub; // Add user ID to session
// //       return session;
// //     },
// //   },
// //   secret: process.env.NEXTAUTH_SECRET, // Secret key for JWT
// // };

// // const handlers = NextAuth(authOptions)
// // export {handlers as GET , handlers as POST}


import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token } : any) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

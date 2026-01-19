import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});

export const isAdmin = (email: string | null | undefined) => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  return email ? adminEmails.includes(email) : false;
};

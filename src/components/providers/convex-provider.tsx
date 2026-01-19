"use client";

import { ReactNode, useMemo } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;
const useAuth = false; // Disabled auth for development

function useAuthFromNextAuth() {
  const { data: session, status } = useSession();

  return useMemo(
    () => ({
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated",
      fetchAccessToken: async ({
        forceRefreshToken,
      }: {
        forceRefreshToken: boolean;
      }) => {
        if (status !== "authenticated" || !session?.user) {
          return null;
        }
        const response = await fetch("/api/convex-token");
        if (!response.ok) {
          return null;
        }
        const { token } = await response.json();
        return token;
      },
    }),
    [session, status]
  );
}

function ConvexProviderInner({ children }: { children: ReactNode }) {
  if (!convex) {
    return <>{children}</>;
  }

  if (!useAuth) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  }

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}

export function ConvexClientProvider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ConvexProviderInner>{children}</ConvexProviderInner>
    </SessionProvider>
  );
}

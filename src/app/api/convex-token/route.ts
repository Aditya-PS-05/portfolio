import { auth } from "@/lib/auth";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const privateKey = process.env.CONVEX_AUTH_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const key = await importPrivateKey(privateKey);

  const token = await new SignJWT({
    sub: session.user.id ?? session.user.email ?? "unknown",
    email: session.user.email,
    name: session.user.name,
    picture: session.user.image,
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setIssuer(process.env.NEXT_PUBLIC_AUTH_DOMAIN!)
    .setAudience("convex")
    .setExpirationTime("1h")
    .sign(key);

  return NextResponse.json({ token });
}

async function importPrivateKey(pemKey: string) {
  const pemContents = pemKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    true,
    ["sign"]
  );
}

import { NextResponse } from "next/server";
import * as crypto from "crypto";

export async function GET() {
  const privateKeyPem = process.env.CONVEX_AUTH_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  if (!privateKeyPem) {
    return NextResponse.json({ keys: [] });
  }

  try {
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    const publicKey = crypto.createPublicKey(privateKey);
    const jwk = publicKey.export({ format: "jwk" });
    
    return NextResponse.json({
      keys: [
        {
          ...jwk,
          kid: "1",
          use: "sig",
          alg: "RS256",
        },
      ],
    });
  } catch (e) {
    console.error("JWKS error:", e);
    return NextResponse.json({ keys: [] });
  }
}

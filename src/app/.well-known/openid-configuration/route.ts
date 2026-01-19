import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN || "http://localhost:3000";
  
  return NextResponse.json({
    issuer: domain,
    jwks_uri: `${domain}/.well-known/jwks.json`,
    authorization_endpoint: `${domain}/api/auth/signin`,
    token_endpoint: `${domain}/api/auth/token`,
    userinfo_endpoint: `${domain}/api/auth/userinfo`,
    response_types_supported: ["code", "token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
  });
}

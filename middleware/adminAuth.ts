import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const NEXT_PUBLIC_ADMIN_EMAIL = [process.env.NEXT_PUBLIC_ADMIN_EMAIL];


export async function adminAuthMiddleware(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token || !token.email) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!NEXT_PUBLIC_ADMIN_EMAIL.includes(token.email as string)) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication error" },
      { status: 500 }
    );
  }
}

export function isAdmin(userEmail?: string | null): boolean {
  if (!userEmail) return false;
  return NEXT_PUBLIC_ADMIN_EMAIL.includes(userEmail);
}
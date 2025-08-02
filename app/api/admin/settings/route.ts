import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import fs from 'fs';
import path from 'path';

// Admin emails - should match the ones in your layout
const NEXT_PUBLIC_ADMIN_EMAIL = [process.env.ADMIN_EMAIL];


// Check if user is admin
async function isAdminUser(request: NextRequest): Promise<boolean> {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token || !token.email) {
      return false;
    }

    return NEXT_PUBLIC_ADMIN_EMAIL.includes(token.email as string);
  } catch (error) {
    console.error("Admin auth error:", error);
    return false;
  }
}

// Get current environment variables
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const isAdmin = await isAdminUser(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    // Return current API key settings (masked for security)
    const settings = {
      GROQ_API_KEY: process.env.GROQ_API_KEY ? '***' + process.env.GROQ_API_KEY.slice(-4) : 'Not set',
      STABILITY_API_KEY: process.env.STABILITY_API_KEY ? '***' + process.env.STABILITY_API_KEY.slice(-4) : 'Not set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'Not set',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Not set',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
    };

    return NextResponse.json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// Update environment variables
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAdmin = await isAdminUser(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: "Key and value are required" },
        { status: 400 }
      );
    }

    // Allowed keys to update
    const allowedKeys = [
      'GROQ_API_KEY',
      'STABILITY_API_KEY',
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY',
      'CLOUDINARY_API_SECRET'
    ];

    if (!allowedKeys.includes(key)) {
      return NextResponse.json(
        { success: false, error: "Key not allowed to be updated" },
        { status: 400 }
      );
    }

    // Read current .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    
    try {
      envContent = fs.readFileSync(envPath, 'utf8');
    } catch {
      envContent = '';
    }

    // Update or add the key-value pair
    const lines = envContent.split('\n');
    let keyFound = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith(`${key}=`)) {
        lines[i] = `${key}=${value}`;
        keyFound = true;
        break;
      }
    }

    if (!keyFound) {
      lines.push(`${key}=${value}`);
    }

    // Write back to file
    const newContent = lines.filter(line => line.trim() !== '').join('\n') + '\n';
    fs.writeFileSync(envPath, newContent);

    // Update process.env for immediate effect (note: this only affects the current process)
    process.env[key] = value;

    return NextResponse.json({
      success: true,
      message: `${key} updated successfully. Restart the application for changes to take full effect.`
    });

  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
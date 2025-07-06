import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test the connection
    await prisma.$connect();
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      result: result
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        clientVersion: error.clientVersion
      }
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 
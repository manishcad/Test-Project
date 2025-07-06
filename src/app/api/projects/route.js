import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects - Get all projects
export async function GET() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Handle specific Prisma errors
    if (error.name === 'PrismaClientInitializationError') {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your database configuration.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request) {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { title, description, githubLink, liveDemo } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        githubLink: githubLink || null,
        liveDemo: liveDemo || null
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle specific Prisma errors
    if (error.name === 'PrismaClientInitializationError') {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your database configuration.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 
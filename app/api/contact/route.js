import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create contact entry
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    console.log('Contact form submitted:', {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      timestamp: contact.createdAt
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        contactId: contact._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve contacts (for admin purposes)
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Contact.countDocuments();

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
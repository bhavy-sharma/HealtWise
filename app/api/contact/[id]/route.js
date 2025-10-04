import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

// PATCH - Update contact status
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const { status } = await request.json();

    // Validate status
    if (!status || !['new', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Contact updated successfully',
      contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove contact
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// GET - Get single contact
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ contact });

  } catch (error) {
    console.error('Get contact error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
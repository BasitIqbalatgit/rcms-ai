import { NextRequest, NextResponse } from 'next/server';
import User, { UserRole } from '@/lib/db/models/User';
import connectDB from '@/lib/db/mongodb';

// Update admin
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const adminId = params.id;
    const updateData = await request.json();
    
    // Validate that this is an admin record
    const existingAdmin = await User.findOne({ 
      _id: adminId, 
      role: UserRole.ADMIN 
    });
    
    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }
    
    // Ensure only appropriate fields can be updated
    const allowedFields = ['name', 'email', 'location', 'centreName', 'creditBalance', 'emailVerified'];
    const sanitizedData: Record<string, any> = {};
    
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        sanitizedData[key] = updateData[key];
      }
    });
    
    // Update the admin in the database
    const updatedAdmin = await User.findByIdAndUpdate(
      adminId,
      { $set: sanitizedData },
      { new: true }
    );
    
    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json(
      { error: 'Failed to update admin' },
      { status: 500 }
    );
  }
}

// Delete admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const adminId = params.id;
    
    // Validate that this is an admin record
    const existingAdmin = await User.findOne({ 
      _id: adminId, 
      role: UserRole.ADMIN 
    });
    
    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }
    
    // Delete the admin
    await User.findByIdAndDelete(adminId);
    
    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
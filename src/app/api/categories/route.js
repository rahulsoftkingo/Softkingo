// src/app/api/categories/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const [categories] = await pool.query(
      'SELECT id, name FROM categories ORDER BY name'
    );
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch categories' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Category name is required' },
        { status: 400 }
      );
    }

    // Insert the new category
    const [result] = await pool.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name.trim()]
    );

    // result.insertId contains the new ID
    const newCategory = { id: result.insertId, name: name.trim() };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('POST /api/categories error:', error);
    return NextResponse.json(
      { message: 'Failed to add category' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/photo-caption?path=/uploads/img/photo.jpg
export async function GET(request) {
    try {
        // Get the path from the query string
        const { searchParams } = new URL(request.url);
        const photoPath = searchParams.get('path');

        if (!photoPath) {
            return NextResponse.json(
                { caption: '' },
                { status: 200 }
            );
        }

        // Query the database for the caption
        const { data, error } = await supabase
            .from('artifact_photos')
            .select('caption')
            .eq('photo_path', photoPath)
            .limit(1)
            .single();

        if (error) {
            console.error('Database error:', error);
            // Return empty caption if not found
            return NextResponse.json(
                { caption: '' },
                { status: 200 }
            );
        }

        return NextResponse.json({
            caption: data?.caption || ''
        });

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { caption: '' },
            { status: 200 }
        );
    }
}


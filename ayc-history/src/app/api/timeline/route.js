import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
    try {
        // Get all artifacts (no year filter)
        const { data: artifacts, error: artifactsError } = await supabase
            .from('artifact')
            .select(`
                artifact_number,
                artifact_title,
                description,
                year
            `)
            .order('year', { ascending: true })
            .order('artifact_title', { ascending: true });

        if (artifactsError) {
            console.error('Database error:', artifactsError);
            return NextResponse.json(
                { error: 'Database error' },
                { status: 500 }
            );
        }

        // Get photos for these artifacts
        const artifactNumbers = artifacts.map(a => a.artifact_number);

        const { data: photos, error: photosError } = await supabase
            .from('artifact_photos')
            .select('artifact_number, photo_path')
            .in('artifact_number', artifactNumbers);

        if (photosError) {
            console.error('Photos error:', photosError);
        }

        // Combine the data
        const formatted = artifacts.map(artifact => {
            const artifactPhotos = photos
                ? photos.filter(p => p.artifact_number === artifact.artifact_number)
                    .map(p => p.photo_path)
                : [];

            return {
                artifact_number: artifact.artifact_number,
                artifact_title: artifact.artifact_title,
                description: artifact.description,
                year: artifact.year,
                images: artifactPhotos
            };
        });

        return NextResponse.json(formatted);

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

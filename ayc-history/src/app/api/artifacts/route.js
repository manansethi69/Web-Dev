import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/artifacts - Get all artifacts with photos and tags
export async function GET(request) {
    try {
        // Get all artifacts
        const { data: artifacts, error: artifactsError } = await supabase
            .from('artifact')
            .select(`
                artifact_number,
                artifact_title,
                description,
                category,
                latitude,
                longitude,
                year,
                visible,
                storage_location,
                format,
                priority
            `)
            .order('artifact_number', { ascending: true });

        if (artifactsError) {
            console.error('Database error:', artifactsError);
            return NextResponse.json(
                { error: 'Database error' },
                { status: 500 }
            );
        }

        // Get all photos
        const { data: photos, error: photosError } = await supabase
            .from('artifact_photos')
            .select('artifact_number, photo_path');

        if (photosError) {
            console.error('Photos error:', photosError);
        }

        // Get all tags
        const { data: tags, error: tagsError } = await supabase
            .from('artifact_tags')
            .select('artifact_number, tag');

        if (tagsError) {
            console.error('Tags error:', tagsError);
        }

        // Combine the data
        const formatted = artifacts?.map(artifact => {
            // Find photos for this artifact
            const artifactPhotos = photos
                ? photos.filter(p => p.artifact_number === artifact.artifact_number)
                    .map(p => p.photo_path)
                : [];

            // Find tags for this artifact
            const artifactTags = tags
                ? tags.filter(t => t.artifact_number === artifact.artifact_number)
                    .map(t => t.tag)
                : [];

            return {
                id: artifact.artifact_number,
                artifact_title: artifact.artifact_title,
                description: artifact.description,
                category: artifact.category,
                latitude: artifact.latitude,
                longitude: artifact.longitude,
                year: artifact.year,
                visible: artifact.visible,
                storage_location: artifact.storage_location,
                format: artifact.format,
                priority: artifact.priority,
                images: artifactPhotos,
                tags: artifactTags
            };
        });

        // Set headers for content range
        const headers = new Headers();
        headers.set('Access-Control-Expose-Headers', 'Content-Range');
        headers.set('Content-Range', `artifacts 0-${formatted.length - 1}/${formatted.length}`);

        return NextResponse.json(formatted || [], { headers });

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

// POST /api/artifacts - Create a new artifact
export async function POST(request) {
    try {
        const body = await request.json();
        const {
            artifact_title,
            description,
            category,
            year,
            visible,
            storage_location,
            format,
            priority,
            photos = [],
            tags = [],
            location = []
        } = body;

        const latitude = Array.isArray(location) && location.length > 0 ? location[0] : null;
        const longitude = Array.isArray(location) && location.length > 1 ? location[1] : null;

        // Insert the artifact
        const { data: artifact, error: artifactError } = await supabase
            .from('artifact')
            .insert([
                {
                    artifact_title,
                    description,
                    category,
                    latitude,
                    longitude,
                    year,
                    visible,
                    storage_location,
                    format,
                    priority
                }
            ])
            .select()
            .single();

        if (artifactError) {
            console.error('Error inserting artifact:', artifactError);
            return NextResponse.json(
                { error: 'Failed to insert artifact' },
                { status: 500 }
            );
        }

        const artifactId = artifact.artifact_number;

        // Insert photos if any
        if (photos && photos.length > 0) {
            const photoInserts = photos.map(photo => ({
                artifact_number: artifactId,
                photo_path: photo.path ?? photo.src ?? '',
                caption: photo.caption ?? ''
            })).filter(p => p.photo_path !== '');

            if (photoInserts.length > 0) {
                const { error: photosError } = await supabase
                    .from('artifact_photos')
                    .insert(photoInserts);

                if (photosError) {
                    console.error('Error inserting photos:', photosError);
                }
            }
        }

        // Insert tags if any
        if (tags && tags.length > 0) {
            const tagInserts = tags.map(tag => ({
                artifact_number: artifactId,
                tag: tag
            }));

            const { error: tagsError } = await supabase
                .from('artifact_tags')
                .insert(tagInserts);

            if (tagsError) {
                console.error('Error inserting tags:', tagsError);
            }
        }

        return NextResponse.json(
            { message: 'Artifact created', id: artifactId },
            { status: 201 }
        );

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}



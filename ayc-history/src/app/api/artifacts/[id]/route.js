import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// DELETE /api/artifacts/[id] - Delete an artifact
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const artifactId = parseInt(id);

        // Delete photos first (foreign key constraint)
        const { error: photosError } = await supabase
            .from('artifact_photos')
            .delete()
            .eq('artifact_number', artifactId);

        if (photosError) {
            console.error('Failed to delete photos:', photosError);
            return NextResponse.json(
                { error: 'Failed to delete photos' },
                { status: 500 }
            );
        }

        // Delete tags
        const { error: tagsError } = await supabase
            .from('artifact_tags')
            .delete()
            .eq('artifact_number', artifactId);

        if (tagsError) {
            console.error('Failed to delete tags:', tagsError);
            return NextResponse.json(
                { error: 'Failed to delete tags' },
                { status: 500 }
            );
        }

        // Delete the artifact itself
        const { error: artifactError } = await supabase
            .from('artifact')
            .delete()
            .eq('artifact_number', artifactId);

        if (artifactError) {
            console.error('Failed to delete artifact:', artifactError);
            return NextResponse.json(
                { error: 'Failed to delete artifact' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Artifact and its photos/tags deleted',
            id: artifactId
        });

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

// PUT /api/artifacts/[id] - Update an artifact
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const artifactId = parseInt(id);
        const body = await request.json();
        const {
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
        } = body;

        const { data, error } = await supabase
            .from('artifact')
            .update({
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
            })
            .eq('artifact_number', artifactId)
            .select()
            .single();

        if (error) {
            console.error('Error updating artifact:', error);
            return NextResponse.json(
                { error: 'Database error' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            id: data.artifact_number,
            artifact_title: data.artifact_title,
            description: data.description,
            category: data.category,
            latitude: data.latitude,
            longitude: data.longitude,
            year: data.year,
            visible: data.visible,
            storage_location: data.storage_location,
            format: data.format,
            priority: data.priority
        });

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}


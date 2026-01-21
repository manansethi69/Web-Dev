import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        // Get the form data from the request
        const formData = await request.formData();

        // Get all files from the "images" field
        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            );
        }

        // Make sure the uploads/img directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'img');

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Process each file
        const uploadedFiles = [];

        for (const file of files) {
            // Get the file bytes
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create the file path
            const fileName = file.name;
            const filePath = path.join(uploadDir, fileName);

            // Write the file to the uploads directory
            await writeFile(filePath, buffer);

            // Add file info to the response
            uploadedFiles.push({
                filename: fileName,
                path: `/uploads/img/${fileName}`
            });
        }

        return NextResponse.json({
            success: true,
            files: uploadedFiles
        });

    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/app/api/artifacts/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        // Get all artifacts
        const { data: artifacts, error: artifactsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact').select(`
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
            `).order('artifact_number', {
            ascending: true
        });
        if (artifactsError) {
            console.error('Database error:', artifactsError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Database error'
            }, {
                status: 500
            });
        }
        // Get all photos
        const { data: photos, error: photosError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact_photos').select('artifact_number, photo_path');
        if (photosError) {
            console.error('Photos error:', photosError);
        }
        // Get all tags
        const { data: tags, error: tagsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact_tags').select('artifact_number, tag');
        if (tagsError) {
            console.error('Tags error:', tagsError);
        }
        // Combine the data
        const formatted = artifacts?.map((artifact)=>{
            // Find photos for this artifact
            const artifactPhotos = photos ? photos.filter((p)=>p.artifact_number === artifact.artifact_number).map((p)=>p.photo_path) : [];
            // Find tags for this artifact
            const artifactTags = tags ? tags.filter((t)=>t.artifact_number === artifact.artifact_number).map((t)=>t.tag) : [];
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(formatted || [], {
            headers
        });
    } catch (err) {
        console.error('Server error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Server error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { artifact_title, description, category, year, visible, storage_location, format, priority, photos = [], tags = [], location = [] } = body;
        const latitude = Array.isArray(location) && location.length > 0 ? location[0] : null;
        const longitude = Array.isArray(location) && location.length > 1 ? location[1] : null;
        // Insert the artifact
        const { data: artifact, error: artifactError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact').insert([
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
        ]).select().single();
        if (artifactError) {
            console.error('Error inserting artifact:', artifactError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Failed to insert artifact'
            }, {
                status: 500
            });
        }
        const artifactId = artifact.artifact_number;
        // Insert photos if any
        if (photos && photos.length > 0) {
            const photoInserts = photos.map((photo)=>({
                    artifact_number: artifactId,
                    photo_path: photo.path ?? photo.src ?? '',
                    caption: photo.caption ?? ''
                })).filter((p)=>p.photo_path !== '');
            if (photoInserts.length > 0) {
                const { error: photosError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact_photos').insert(photoInserts);
                if (photosError) {
                    console.error('Error inserting photos:', photosError);
                }
            }
        }
        // Insert tags if any
        if (tags && tags.length > 0) {
            const tagInserts = tags.map((tag)=>({
                    artifact_number: artifactId,
                    tag: tag
                }));
            const { error: tagsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('artifact_tags').insert(tagInserts);
            if (tagsError) {
                console.error('Error inserting tags:', tagsError);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Artifact created',
            id: artifactId
        }, {
            status: 201
        });
    } catch (err) {
        console.error('Server error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84ecb1d3._.js.map
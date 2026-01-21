(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/_components/ArtifactMap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArtifactMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// This component displays a Leaflet map with artifact markers using OverlappingMarkerSpiderfier.
// When a marker is clicked, it navigates to the artifact detail page.
// Imports React hooks, Leaflet map components, and navigation tools
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2d$defaulticon$2d$compatibility$2f$src$2f$Icon$2e$Default$2e$compatibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet-defaulticon-compatibility/src/Icon.Default.compatibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Loads the OMS library script if it's not already loaded
const loadSpiderfierScript = ()=>{
    return new Promise((resolve, reject)=>{
        if (window.OverlappingMarkerSpiderfier) {
            resolve(); // already loaded
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js";
        script.async = true;
        script.onload = ()=>resolve();
        script.onerror = ()=>reject(new Error("Failed to load Spiderfier"));
        document.body.appendChild(script);
    });
};
// Subcomponent that adds spiderfied markers to the map
function SpiderfiedMarkers({ artifacts }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpiderfiedMarkers.useEffect": ()=>{
            if (!window.OverlappingMarkerSpiderfier || !map) return;
            const customIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
                iconUrl: '/img/pin.png',
                iconSize: [
                    25,
                    40
                ],
                iconAnchor: [
                    19,
                    41
                ],
                popupAnchor: [
                    0,
                    -41
                ]
            });
            const oms = new window.OverlappingMarkerSpiderfier(map, {
                keepSpiderfied: true,
                nearbyDistance: 20
            });
            // Adds a marker for each artifact and defines click behavior
            artifacts.forEach({
                "SpiderfiedMarkers.useEffect": (art)=>{
                    const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker([
                        parseFloat(art.latitude),
                        parseFloat(art.longitude)
                    ], {
                        icon: customIcon
                    });
                    marker.bindPopup(`<strong>${art.artifact_title}</strong><br/>
   <a href="/gallery/${art.id}?fromMap=true" class="popup-link">View details</a>`);
                    marker.addTo(map);
                    oms.addMarker(marker);
                }
            }["SpiderfiedMarkers.useEffect"]);
            oms.addListener("spiderfy", {
                "SpiderfiedMarkers.useEffect": function() {
                    map.closePopup();
                }
            }["SpiderfiedMarkers.useEffect"]);
            return ({
                "SpiderfiedMarkers.useEffect": ()=>oms.clearMarkers()
            })["SpiderfiedMarkers.useEffect"];
        }
    }["SpiderfiedMarkers.useEffect"], [
        map,
        artifacts,
        router
    ]);
    return null;
}
_s(SpiderfiedMarkers, "U2VqIisIkte98EBJzX5BRuLbfU8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SpiderfiedMarkers;
function ArtifactMap() {
    _s1();
    const [artifacts, setArtifacts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only render on client side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArtifactMap.useEffect": ()=>{
            setMounted(true);
        }
    }["ArtifactMap.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArtifactMap.useEffect": ()=>{
            if (!mounted) return;
            loadSpiderfierScript().then({
                "ArtifactMap.useEffect": ()=>{
                    fetch("/api/artifacts").then({
                        "ArtifactMap.useEffect": (res)=>res.json()
                    }["ArtifactMap.useEffect"]).then({
                        "ArtifactMap.useEffect": (data)=>{
                            const visibleArtifacts = data.filter({
                                "ArtifactMap.useEffect.visibleArtifacts": (art)=>art.visible === true || art.visible === 1
                            }["ArtifactMap.useEffect.visibleArtifacts"]);
                            setArtifacts(visibleArtifacts);
                        }
                    }["ArtifactMap.useEffect"]);
                }
            }["ArtifactMap.useEffect"]).catch({
                "ArtifactMap.useEffect": (error)=>{
                    console.error("Error loading Spiderfier:", error);
                }
            }["ArtifactMap.useEffect"]);
        }
    }["ArtifactMap.useEffect"], [
        mounted
    ]);
    // Don't render anything until mounted on client
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: [
            44.6359,
            -63.5828
        ],
        zoom: 14,
        style: {
            height: "100%",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                attribution: "Tiles © Esri",
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            }, void 0, false, {
                fileName: "[project]/src/app/_components/ArtifactMap.js",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            artifacts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpiderfiedMarkers, {
                artifacts: artifacts
            }, void 0, false, {
                fileName: "[project]/src/app/_components/ArtifactMap.js",
                lineNumber: 119,
                columnNumber: 32
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/_components/ArtifactMap.js",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s1(ArtifactMap, "PYmVBNzLp7GmvvjNWMFQbauy22Y=");
_c1 = ArtifactMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "SpiderfiedMarkers");
__turbopack_context__.k.register(_c1, "ArtifactMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/_components/ArtifactMap.js [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/_components/ArtifactMap.js [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_app__components_ArtifactMap_0befbdc4.js.map
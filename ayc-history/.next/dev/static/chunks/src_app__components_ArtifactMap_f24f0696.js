(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/_components/ArtifactMap.js [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_d9244df4._.js",
  "static/chunks/src_app__components_ArtifactMap_0befbdc4.js",
  {
    "path": "static/chunks/_795c82ef._.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)",
      "[project]/src/app/_components/ArtifactMap.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_leaflet_dist_leaflet_css_bad6b30c._.single.css",
      "static/chunks/src_app__components_ArtifactMap_css_bad6b30c._.single.css"
    ]
  },
  "static/chunks/src_app__components_ArtifactMap_1ef69a91.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/app/_components/ArtifactMap.js [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);
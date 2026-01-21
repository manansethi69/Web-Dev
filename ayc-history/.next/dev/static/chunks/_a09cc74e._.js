(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/_components/Artifact.js [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  {
    "path": "static/chunks/_39f6f1f1._.css",
    "included": [
      "[project]/src/app/_components/Artifact.css [app-client] (css)",
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)",
      "[project]/node_modules/react-responsive-carousel/lib/styles/carousel.min.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/src_app__components_Artifact_css_bad6b30c._.single.css",
      "static/chunks/node_modules_leaflet_dist_leaflet_css_bad6b30c._.single.css",
      "static/chunks/node_modules_react-responsive-carousel_lib_styles_carousel_min_css_bad6b30c._.single.css"
    ]
  },
  "static/chunks/node_modules_17b6b418._.js",
  "static/chunks/src_app__components_Artifact_e150e284.js",
  "static/chunks/src_app__components_Artifact_2c6290ae.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/app/_components/Artifact.js [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
"[project]/node_modules/shareon/dist/shareon.es.js [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_shareon_dist_shareon_es_cd04ec6c.js",
  "static/chunks/node_modules_shareon_dist_shareon_es_7668908c.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/shareon/dist/shareon.es.js [app-client] (ecmascript)");
    });
});
}),
]);
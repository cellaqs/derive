import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dérive",
    short_name: "Dérive",
    description: "Interface editorial minimalista para derivas situacionistas",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfcf9",
    theme_color: "#1a1a18",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}

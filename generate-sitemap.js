const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream, readdirSync, statSync } = require("fs");
const path = require("path");

const BASE_URL = "https://platform-nx-doc.vercel.app";
const DOCS_PATH = path.join(__dirname, "docs");
const OUTPUT_PATH = path.join(__dirname, "static", "sitemap.xml");

// Helper function to get all .mdx files recursively
const getAllDocs = (dir, parentPath = "/docs") => {
  let pages = [];
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      pages = pages.concat(getAllDocs(filePath, `${parentPath}/${file}`));
    } else if (file.endsWith(".mdx")) {
      const pageName = file.replace(".mdx", "");
      pages.push(`${parentPath}/${pageName}`);
    }
  });

  return pages;
};

// Get all documentation pages
const docPages = getAllDocs(DOCS_PATH);

// Sitemap entries
const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/blog", changefreq: "daily", priority: 0.9 },
  ...docPages.map((path) => ({
    url: `${BASE_URL}${path}`, // Ensure absolute URL
    changefreq: "daily",
    priority: 0.8,
  })),
];

// Generate sitemap
const sitemap = new SitemapStream({ hostname: BASE_URL });
const writeStream = createWriteStream(OUTPUT_PATH);
sitemap.pipe(writeStream);

pages.forEach((page) => {
  sitemap.write(page); // Write each page
});
sitemap.end();

console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);

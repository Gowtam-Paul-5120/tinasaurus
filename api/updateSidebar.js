// import fs from "fs";
// import path from "path";

const fs = require("fs");
const path = require("path");

const docsPath = path.resolve("./docs");
const sidebarPath = path.resolve("./config/sidebar/index.json");

const generateSidebarItems = (dir) => {
  return fs
    .readdirSync(dir)
    .map((file) => {
      const fullPath = path.join(dir, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        return {
          title: file,
          link: "generated",
          items: generateSidebarItems(fullPath),
          _template: "category",
        };
      } else if (file.endsWith(".mdx")) {
        return {
          document: fullPath.replace(/\\/g, "/").replace(/^.*docs\//, "docs/"),
          _template: "doc",
        };
      }
    })
    .filter(Boolean);
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const sidebarData = {
      label: "Docs Sidebar",
      items: generateSidebarItems(docsPath),
    };

    fs.writeFileSync(sidebarPath, JSON.stringify(sidebarData, null, 2));
    res.status(200).json({ message: "Sidebar updated successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

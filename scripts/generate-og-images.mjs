import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const blogContentDir = join(rootDir, "src/content/blog");
const outDir = join(rootDir, "public/og");

const fontRegular = readFileSync(join(__dirname, "fonts/NotoSansJP-Regular.ttf"));
const fontBold = readFileSync(join(__dirname, "fonts/NotoSansJP-Bold.ttf"));
const fonts = [
  { name: "Noto Sans JP", data: fontRegular, weight: 400, style: "normal" },
  { name: "Noto Sans JP", data: fontBold, weight: 700, style: "normal" },
];

// noa4021j design system tokens (light theme) — kept in sync with src/styles/tokens.css
const COLOR_BG = "#fafaf7";
const COLOR_INK = "#17181c";
const COLOR_MUTED = "#6b6b6b";
const COLOR_ACCENT = "#4a6a75";

function ogImageElement({ title, category }) {
  return {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLOR_BG,
        padding: "80px",
        fontFamily: "Noto Sans JP",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", fontSize: 28, color: COLOR_MUTED },
            children: "noa4021j",
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: COLOR_INK,
              lineHeight: 1.4,
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", fontSize: 28, color: COLOR_ACCENT },
            children: category,
          },
        },
      ],
    },
  };
}

async function renderOgImage({ title, category }) {
  const svg = await satori(ogImageElement({ title, category }), {
    width: 1200,
    height: 630,
    fonts,
  });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const defaultPng = await renderOgImage({
    title: "Software Engineer",
    category: "Portfolio & Tech Blog",
  });
  writeFileSync(join(outDir, "default.png"), defaultPng);

  const files = readdirSync(blogContentDir).filter((file) => file.endsWith(".md"));
  for (const file of files) {
    const raw = readFileSync(join(blogContentDir, file), "utf-8");
    const { data } = matter(raw);
    if (data.draft) continue;

    const slug = basename(file, ".md");
    const png = await renderOgImage({ title: data.title, category: data.category });
    writeFileSync(join(outDir, `${slug}.png`), png);
    console.log(`generated public/og/${slug}.png`);
  }
}

await main();

import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string(),
    draft: z.boolean().default(false),
    // アイキャッチ画像（任意）。未指定の場合はストライプのプレースホルダーを表示。
    coverImage: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: file("src/content/works.yaml"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    detail: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        repo: z.url().optional(),
        site: z.url().optional(),
      })
      .optional(),
    order: z.number().default(0),
    // カバー画像（任意）。未指定の場合はストライプのプレースホルダーを表示。
    coverImage: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z.object({
    id: z.string(),
    company: z.string(),
    // 会社単位の通算期間
    period: z.string(),
    // 表示順（昇順）。新しい経歴ほど小さい値にする。
    order: z.number().default(0),
    roles: z.array(
      z.object({
        role: z.string(),
        period: z.string(),
        // 雇用形態（副業・内定者アルバイト等）。正社員など既定の雇用形態では省略する。
        employmentType: z.string().optional(),
        // 責任範囲と代表的な変化を1文に集約する。
        detail: z.string().max(80),
      })
    ),
  }),
});

const activities = defineCollection({
  loader: file("src/content/activities.yaml"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    tag: z.string(),
    note: z.string().optional(),
    url: z.url().optional(),
  }),
});

const education = defineCollection({
  loader: file("src/content/education.yaml"),
  schema: z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    period: z.string(),
    order: z.number().default(0),
  }),
});

const socials = defineCollection({
  loader: file("src/content/socials.yaml"),
  schema: z.object({
    // "github" | "x" | "linkedin" | "speakerdeck" | "rss" などの小文字スラッグ。Footerの表示ラベルにもそのまま使う。
    id: z.string(),
    name: z.string(),
    // RSSは "/rss.xml" という相対パスのため z.url() ではなく z.string()
    url: z.string(),
    icon: z.enum(["github", "x", "linkedin", "rss", "speakerdeck"]),
    order: z.number().default(0),
  }),
});

const techStack = defineCollection({
  loader: file("src/content/tech-stack.yaml"),
  schema: z.object({
    id: z.string(),
    domain: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const expertise = defineCollection({
  loader: file("src/content/expertise.yaml"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    badge: z.string().optional(),
    statement: z.string().max(100),
    order: z.number().default(0),
  }),
});

const values = defineCollection({
  loader: file("src/content/values.yaml"),
  schema: z.object({
    id: z.string(),
    // カード上部に添える短い英語キーワード（例: "pragmatism"）
    keyword: z.string().optional(),
    name: z.string(),
    detail: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, works, experience, activities, education, socials, techStack, expertise, values };

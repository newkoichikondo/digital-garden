import { defineConfig, createContentLoader, type SiteConfig, HeadConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';
import { Feed } from 'feed';
import path from 'path';
import { writeFileSync } from 'fs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Koichi Kondo",
  description: "個人の学び、思考、知識、アイデアを共有するためのウェブスペース",
  lang: "jp-JP",
  themeConfig: {
    // テーマ設定（省略）
  },
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://koichikondo.com'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/android-chrome-512x512.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.rss' }],
  ],
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    if (pageData.frontmatter.title) {
      head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }]);
    }
    if (pageData.frontmatter.description) {
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }]);
    }
    if (pageData.frontmatter.url) {
      head.push(['meta', { property: 'og:url', content: pageData.frontmatter.url }]);
    }
    if (pageData.frontmatter.image) {
      head.push(['meta', { property: 'og:image', content: pageData.frontmatter.image }]);
    }
    if (pageData.frontmatter.type) {
      head.push(['meta', { property: 'og:type', content: pageData.frontmatter.type }]);
    }
    return head;
  },
  buildEnd: async (config: SiteConfig) => {
    const hostname = 'https://koichikondo.com';
    const feed = new Feed({
      title: 'Koichi Kondo',
      description: '個人の学び、思考、知識、アイデアを共有するためのウェブスペース',
      id: hostname,
      link: hostname,
      language: 'ja',
      favicon: `${hostname}/android-chrome-512x512.png`, // ファビコンのURLを指定
      copyright: `© ${new Date().getFullYear()} Koichi Kondo`,
    });

    const posts = await createContentLoader('**/*.md', {
      excerpt: true,
      render: true,
    }).load();

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    );

    for (const post of posts) {
      const { url, excerpt, frontmatter, html } = post;
      if (!frontmatter.title || !frontmatter.date) {
        continue;
      }
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: frontmatter.description || excerpt || '',
        content: html,
        date: new Date(frontmatter.date),
      });
    }

    // RSSフィードに <image> タグを追加するための設定
    feed.options.image = `${hostname}/android-chrome-512x512.png`; // またはロゴ画像のURL

    // RSSフィードを出力
    writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2());
  },
});

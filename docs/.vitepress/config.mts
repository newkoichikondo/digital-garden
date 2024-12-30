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
    const hostname = 'https://koichikondo.com'; // サイトのURL
    const feed = new Feed({
      title: 'Koichi Kondo',
      description: '個人の学び、思考、知識、アイデアを共有するためのウェブスペース',
      id: hostname,
      link: hostname,
      language: 'ja',
      favicon: `${hostname}/android-chrome-512x512.png`,
      copyright: `© ${new Date().getFullYear()} Koichi Kondo`,
    });

    // Markdownファイルの内容を取得
    const posts = await createContentLoader('**/*.md', {
      excerpt: true,
      render: true,
    }).load();

    // 日付順にソート（新しい順）
    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    );

    // 各投稿をRSSフィードに追加
    for (const post of posts) {
      const { url, excerpt, frontmatter, html } = post;
      if (!frontmatter.title || !frontmatter.date) {
        continue; // タイトルまたは日付がない場合はスキップ
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

    // atom:link with rel="self" を明示的に追加
    feed.options.feedLinks = {
      rss2: `${hostname}/feed.rss`,
      atom: `${hostname}/feed.atom`,
    };

    // RSSフィードに <image> タグを追加するための設定
    feed.options.image = `${hostname}/android-chrome-512x512.png`;

    // RSSファイルを生成し、xmlns:atom を追加
    let rssContent = feed.rss2();
    rssContent = rssContent.replace(
      '<rss version="2.0"',
      '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"'
    );

    // atom:link を追加
    const atomLink = `<atom:link href="${hostname}/feed.rss" rel="self" type="application/rss+xml" />`;
    rssContent = rssContent.replace(
      '</channel>',
      `${atomLink}\n</channel>`
    );

    // 修正したRSSファイルを保存
    writeFileSync(path.join(config.outDir, 'feed.rss'), rssContent);
  },
});

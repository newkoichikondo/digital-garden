import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress';
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
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Privacy Policy', link: '/privacy-policy' },
    ],

    sidebar: generateSidebar({
      documentRootPath: '/docs',
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: false,
      collapsed: true,
      sortMenusByName: true,
      excludeFiles: ['privacy-policy.md'],
      excludeFolders: ['private'],
    }),

    socialLinks: [
      { icon: 'instagram', link: 'https://www.instagram.com/newkoichikondo/' },
      { icon: 'x', link: 'https://twitter.com/NewKoichiKondo' },
      { icon: 'github', link: 'https://github.com/newkoichikondo' },
    ],
    footer: {
      copyright: '© koichikondo.com'
    },
    outline: {
      label: '目次'
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    },
    docFooter: {
      prev: '←',
      next: '→'
    }
  },
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://koichikondo.com'
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap'
      }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-SBHB4KZ47S' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SBHB4KZ47S');`
    ],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.rss' }],
  ],
  vite: {
    build: {
      rollupOptions: {
        input: {
          appads: '/app-ads.txt'
        }
      }
    }
  },

  buildEnd: async (config: SiteConfig) => {
    const hostname = 'https://koichikondo.com'; // サイトのURL
    const feed = new Feed({
      title: 'Koichi Kondo',
      description: '個人の学び、思考、知識、アイデアを共有するためのウェブスペース',
      id: hostname,
      link: hostname,
      language: 'ja',
      favicon: `${hostname}/favicon.ico`,
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

    // atom:link を追加
    feed.options.feedLinks = {
      rss2: `${hostname}/feed.rss`,
      atom: `${hostname}/feed.atom`,
    };

    // RSSフィードに <image> タグを追加するための設定
    feed.options.image = `${hostname}/favicon.ico`;

    // RSSファイルを生成
    writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2());
  },
});

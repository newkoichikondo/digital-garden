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
    }),

    socialLinks: [
      { icon: 'instagram', link: 'https://www.instagram.com/newkoichikondo/' },
      { icon: 'x', link: 'https://twitter.com/NewKoichiKondo' },
      { icon: 'github', link: 'https://github.com/newkoichikondo' },
    ],
    footer: {
      copyright: `© ${new Date().getFullYear()} Koichi Kondo`,
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
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '検索',
            buttonAriaLabel: 'サイト内検索'
          },
          modal: {
            noResultsText: '一致する結果が見つかりません',
            resetButtonTitle: '検索をリセット',
            footer: {
              selectText: '選択',
              navigateText: 'ナビゲート',
              closeText: '閉じる'
            }
          }
        }
      }
    },
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
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.rss' }],
    ['link', { rel: 'stylesheet', href: '/custom.css' }], // 必要に応じて書き換え
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
  vite: {
    build: {
      rollupOptions: {
        input: {
          appads: '/app-ads.txt'
        }
      }
    },
    css: {
      preprocessorOptions: {
        // 必要に応じて設定を追加可能
      },
    },
  },

  buildEnd: async (config: SiteConfig) => {
    const hostname = 'https://koichikondo.com'; // サイトのURL
    const feed = new Feed({
      title: 'Koichi Kondo',
      description: '個人の学び、思考、知識、アイデアを共有するためのウェブスペース',
      id: hostname,
      link: hostname,
      language: 'ja',
      favicon: `${hostname}/images/android-chrome-512x512.png`,
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


    // RSSフィードに <image> タグを追加するための設定
    feed.options.image = `${hostname}/images/android-chrome-512x512.png`; // またはロゴ画像のURL

    // RSSフィードを出力
    writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2());
  },
});

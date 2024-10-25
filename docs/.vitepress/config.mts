import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Koichi's Digital Garden",
  description: "個人の学び、思考、知識、アイデアを非線形かつ進化的な形式で整理し、共有するためのウェブスペース",
  lang: "jp-JP",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Privacy Policy', link: '/privacy-policy' },
    ],

    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://github.com/jooy2/vitepress-sidebar#options
       */
      documentRootPath: '/docs',
      // scanStartPath: null,
      // resolvePath: null,
      useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: false,
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: true,
      // capitalizeEachWords: false,
      collapsed: true,
      // collapseDepth: 2,
      sortMenusByName: true,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumerically: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      excludeFiles: ['privacy-policy.md'],
      // excludeFolders: ['world-heritage/study'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
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
      // text: '最終更新',
      formatOptions: {
        dateStyle: 'medium', // 日付のスタイル
        timeStyle: 'short', // 時刻のスタイル
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
    ]
  ],
})


import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Koichi's Garden",
  description: "Koichi's デジタルガーデン",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
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
      useFolderLinkFromIndexFile: true,
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: true,
      // capitalizeEachWords: false,
      // collapsed: true,
      // collapseDepth: 2,
      sortMenusByName: true,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumerically: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFolders: ['secret-folder'],
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

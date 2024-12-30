import { createContentLoader } from 'vitepress';

export default createContentLoader('**/*.md', {
    includeSrc: false,
    transform(rawData) {
        return rawData
            .filter((page) => page.frontmatter.title && page.frontmatter.date) // タイトルと日付が存在する記事だけ取得
            .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)); // 日付順にソート
    },
});

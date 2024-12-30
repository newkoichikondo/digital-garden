import DefaultTheme from 'vitepress/theme-without-fonts';
import PostLayout from './components/PostLayout.vue';
import { h } from 'vue';

// カスタムCSSの読み込み
import './custom.css';
import './tailwind.css';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'doc-before': () => h(PostLayout), // 記事の前にヘッダーを表示
        });
    },
};
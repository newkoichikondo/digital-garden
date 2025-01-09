import DefaultTheme from 'vitepress/theme-without-fonts';
import PostLayout from './components/PostLayout.vue';
import { h, defineAsyncComponent } from 'vue';

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
    enhanceApp({ app }) {
        // Chart.js コンポーネントを登録
        app.component('Chart', defineAsyncComponent(() => import('./components/Chart.vue')));
    },
};

// .vitepress/theme/index.js

// 1) フォントを読み込まないバージョンのデフォルトテーマをインポート
import DefaultTheme from 'vitepress/theme-without-fonts';

// 2) カスタムCSSを読み込む
import './custom.css';
import './tailwind.css';

export default DefaultTheme;

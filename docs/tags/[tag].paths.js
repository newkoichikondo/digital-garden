// tags/[tag].paths.js
export default {
    async paths() {
        // ここでブログポストのデータを取得し、使用されている全タグを集計
        const posts = await fetch('https://my-api.com/posts').then(res => res.json());
        const tags = new Set(posts.flatMap(post => post.tags));

        return [...tags].map(tag => ({ params: { tag } }));
    }
}

<template>
    <div class="post-list">
        <ul>
            <li v-for="post in limitedPosts" :key="post.url" class="post-item">
                <span class="post-date">{{
                    formattedDate(post.frontmatter.date) }}</span><br />
                <a :href="post.url" class="post-title">{{
                    post.frontmatter.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { data as posts } from '../../posts.data';

// 日付フォーマットを日本語に変換する関数
const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// 新着記事を10件に制限
const limitedPosts = posts.slice(0, 10);
</script>

<style scoped>
.post-list ul {
    padding-left: 0;
}

.post-item {
    margin-bottom: 1rem;
    list-style-type: none;
}

.post-title {
    font-size: 1rem;
    color: #3b82f6;
    /* Tailwind CSSのblue-500 */
}

.post-date {
    font-size: 0.875rem;
    color: #6b7280;
    /* Tailwind CSSのgray-500 */
}
</style>

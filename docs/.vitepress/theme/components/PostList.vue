<template>
    <div class="post-list">
        <ul>
            <li v-for="post in posts" :key="post.url" class="post-item">
                <a :href="post.url" class="post-title">{{ post.frontmatter.title }}</a> - <span class="post-date">{{
                    formattedDate(post.frontmatter.date) }}</span>
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
</script>

<style scoped>
.post-list {
    padding: 1rem;
}

.post-item {
    margin-bottom: 1rem;
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
<template>
    <div class="post-header">
        <p v-if="formattedDate" class="post-date">{{ formattedDate }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

// フロントマターのデータを取得
const { frontmatter } = useData();

// 日付をフォーマット
const formattedDate = computed(() => {
    if (!frontmatter.value.date) return null;
    return new Date(frontmatter.value.date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});
</script>

<style scoped>
.post-date {
    font-size: 0.875rem;
    color: #6b7280;
    /* Tailwind CSS の gray-500 */
    margin-bottom: 0.5rem;
}

.post-header h1 {
    font-size: 2rem;
    margin-top: 0.5rem;
}
</style>
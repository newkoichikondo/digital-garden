<template>
    <article>
        <header>
            <!-- 日付を表示 -->
            <p v-if="$frontmatter.date" class="post-date">
                {{ formattedDate }}
            </p>
            <h1>{{ $frontmatter.title }}</h1>
        </header>
        <main>
            <slot />
        </main>
    </article>
</template>

<script>
export default {
    computed: {
        formattedDate() {
            return new Date(this.$frontmatter.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
    },
};
</script>

<style scoped>
.post-date {
    font-size: 0.875rem;
    color: #6b7280;
    /* Tailwind's gray-500 */
    margin-bottom: 0.5rem;
}
</style>
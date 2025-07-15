<template>
  <div class="aspect-video">
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  videoId: string;
}>();
</script>

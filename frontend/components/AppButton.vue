<template>
  <button
    class="bg-purple rounded-lg px-6 py-4 h-8 flex items-center justify-center text-white font-semibold"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<script setup lang="ts">
import { useScrollProgress } from '@/composables/useScrollProgress';
import { computed } from 'vue';

const { scrollProgress } = useScrollProgress();

// Konfigurasi SVG
const radius = 20;
const circumference = 2 * Math.PI * radius;

// Hitung stroke-dashoffset berdasarkan scroll progress
const strokeDashoffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference;
});
</script>

<template>
  <div class="fixed top-5 left-5 w-8 h-8 hidden lg:block">
    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
      <!-- Background Circle -->
      <circle
        class="text-gray-300"
        stroke="currentColor"
        stroke-width="4"
        fill="transparent"
        r="20"
        cx="25"
        cy="25"
      />
      <!-- Progress Circle -->
      <circle
        class="text-orange-500 transition-all duration-200"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        fill="transparent"
        r="20"
        cx="25"
        cy="25"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
      />
    </svg>
  </div>
</template>

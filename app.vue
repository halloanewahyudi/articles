<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-1 bg-orange-500" :style="{ width: `${progress}%` }"></div>
   <NuxtLayout >
    <NuxtPage />
   </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // This is how progress is calculated by default
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })


</script>
<style>
.slide-up-enter-active,
.slide-up-leave-active
 {
  transition: all 0.35s;
}
.slide-up-enter-from {
  opacity: 0;
  @apply translate-y-[100px];
}
.slide-up-leave-to {
  opacity: 0;
  @apply -translate-y-[100px];
}

</style>

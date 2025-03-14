import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollProgress() {
  const scrollProgress = ref(0);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  };

  onMounted(() => {
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollProgress);
  });

  return { scrollProgress };
}

<script lang="ts" setup>
import { ref, watch } from "vue";

// Definisikan slug kategori yang ingin digunakan
const categorySlug = ref("secure-mail"); // Ganti dengan slug kategori yang diinginkan
const categoryId = ref<number | null>(null);
const posts = ref<any[]>([]);
const tagsId = ref(191)
const searchQuery = ref("");
const currentPage = ref(1);
const perPage = 10;
const totalPages = ref(1);
const loading = ref(false);
const apiUrl = useRuntimeConfig().public.SUMBER_URL

// Fungsi untuk mendapatkan ID kategori berdasarkan slug
const fetchCategoryId = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/categories?slug=${categorySlug.value}`
    );
    const categories = await response.json();
    if (categories.length > 0) {
      categoryId.value = categories[0].id;
      fetchPosts();
    } else {
      console.error("Kategori tidak ditemukan!");
    }
  } catch (error) {
    console.error("Error fetching category ID:", error);
  }
};

// Fungsi untuk mengambil postingan berdasarkan kategori ID
const fetchPosts = async () => {
  if (!categoryId.value) return; // Jangan fetch jika kategori belum ditemukan

  loading.value = true;
  try {
   
    const response = await fetch(
      `${apiUrl}/posts?tags=${tagsId.value}&search=${searchQuery.value}&per_page=${perPage}&page=${currentPage.value}`
    );
    posts.value = await response.json();
    totalPages.value = Number(response.headers.get("X-WP-TotalPages"));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  loading.value = false;
};

// Fetch kategori saat komponen dimuat atau slug berubah
 watch(categorySlug, fetchCategoryId, { immediate: true });
watchEffect(() => {
  fetchPosts();
})


// Fungsi pencarian
const searchPosts = () => {
  currentPage.value = 1;
  fetchPosts();
};


</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h4 class="text-2xl font-bold mb-4 text-center text-neutral-500">Temukan solusi kendala email anda</h4>

    <!-- Search Bar -->
     <div class="relative w-full">
      <input
      v-model="searchQuery"
      @input="searchPosts"
      type="text"
      placeholder="Cari disini.."
      class="w-full rounded-full py-2 px-5 border mb-5 focus:outline-none focus:ring-2 focus:ring-neutral-500/30 focus:ring-offset-2"
    />
    <IconsSearch class="absolute top-3 right-3 text-gray-500" />
     </div>
    

    <!-- List Post -->
    <div v-if="loading" class="text-center w-full p-10 flex justify-center items-center">
      <IconsSpin class="text-6xl" />
    </div>
    <div v-else>
      <div v-if="posts.length === 0" class="text-center text-gray-500">
        Tidak ada postingan ditemukan.
      </div>
      <ul v-else>
        <li
          v-for="post in posts"
          :key="post.id"
          class="p-4 border rounded-lg mb-5 bg-white"
        >
        <NuxtLink :to="`/${post.slug}`" class="text-sm">
          <h3 class="text-xl font-semibold mb-3 hover:text-orange-500 duration-300">{{ post.title.rendered }}</h3>
        </NuxtLink>
          <p v-html="post.excerpt.rendered" class=""></p>
          <NuxtLink :to="`/${post.slug}`"  class="text-orange-500 hover:underline duration-300 text-sm">
            Selengkapnya →
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Pagination -->
     <div v-if="totalPages > perPage">
      <div class="flex justify-between pt-5">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >← </button>
      <span class="px-4 py-2">Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      > →</button>
    </div>
     </div>
   
  </div>
</template>

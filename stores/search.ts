import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchQuery: "",
    searchResults: [],
    apiUrl: useRuntimeConfig().public.SUMBER_URL, // Ambil dari runtime config
    categorySlug: "email",
    categoryId: null,
  }),
  actions: {
    async fetchCategoryId() {
      try {
        const response = await fetch(`${this.apiUrl}/categories?slug=${this.categorySlug}`);
        const categories = await response.json();
        if (categories.length > 0) {
          this.categoryId = categories[0].id;
        } else {
          console.error("Kategori tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error fetching category ID:", error);
      }
    },

    async searchPosts() {
      if (!this.categoryId) await this.fetchCategoryId(); // Pastikan categoryId tersedia

      try {
        const response = await fetch(
          `${this.apiUrl}/posts?categories=${this.categoryId}&search=${this.searchQuery}&per_page=5`
        );
        this.searchResults = await response.json();
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
  },
});

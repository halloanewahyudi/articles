<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const apiUrl = useRuntimeConfig().public.SUMBER_URL 
const loading = ref(false);
const showDropdown = ref(false);

// Fetch kategori berdasarkan search query
const fetchCategories = async () => {
  if (searchStore.search.length < 2) {
    searchStore.setCategories([]);
    showDropdown.value = false;
    return;
  }

  loading.value = true;
  try {
    const { data, error } = await useFetch(`${apiUrl}?search=${encodeURIComponent(searchStore.search)}`);
    
    // **PERBAIKAN: Pastikan data.value ada sebelum mengakses .length**
    if (!error.value && Array.isArray(data.value)) {
      searchStore.setCategories(data.value);
      showDropdown.value = data.value.length > 0;
    } else {
      searchStore.setCategories([]); // Jika data kosong atau error
      showDropdown.value = false;
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    searchStore.setCategories([]);
    showDropdown.value = false;
  }

  loading.value = false;
};

// Watch perubahan input search
watch(() => searchStore.search, fetchCategories);
</script>

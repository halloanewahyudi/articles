<template>
  <div>
    <div v-if="status === 'pending'" class="text-center w-full p-10 flex justify-center items-center">
      <IconsSpin class="text-6xl" />
    </div>
    <div v-else class="p-6">
      <div class="max-w-3xl mx-auto p-6 lg:p-10 bg-white border relative">
        <button class="absolute right-0 top-0 p-4" @click="router.back">
          <IconsClose class="text-xl text-orange-500" />
        </button>
        <h1 class="text-2xl lg:text-4xl font-bold mb-10"> {{ data[0].title.rendered }}</h1>
        <div v-html="data[0].content.rendered"></div>
        <hr class="mb-5">
        <div class="flex justify-between flex-wrap items-center">
          <span class="font-['Lora'] italic text-sm">Apakah artikel ini membantu?</span>
          <a href="https://wa.me/089636192223?text=I%27hallo..!%20Proweb%20Support%20saya%20butuh%20bantuan."
            target="_blank" class="flex gap-2 items-center ">
            <span class="font-['Lora'] italic text-sm "> atau silakan hubungi tim kami di:

            </span>
            <IconsWhatsapp class="inline-block text-green-500 text-xl" />
          </a>
        </div>
      </div>
      <div class="flex justify-end max-w-3xl mx-auto mt-5">
        <NuxtLink to="/" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"><icons-back class="inline-block mr-2" />  Kembali </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const { slug } = useRoute().params
const { data, error, status } = await useFetch(`${useRuntimeConfig().public.SUMBER_URL}/posts?slug=${slug}`)
</script>

<style></style>
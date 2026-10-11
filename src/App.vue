<template>
  <div class="min-h-screen bg-[#edf2e9] text-gray-800 font-sans antialiased flex flex-col justify-center items-center p-4 selection:bg-[#527c24] selection:text-white">
    <ToastNotification />
    <RouterView />
  </div>
</template>

<script setup>
import ToastNotification from "./components/ToastNotification.vue";
</script>

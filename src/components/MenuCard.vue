<template>
  <div
    :id="id"
    @click="$emit('click', $event)"
    class="group flex items-center justify-between p-3.5 rounded-xl border-2 border-[#547926]/60 bg-linear-to-r from-[#eef6e4] to-white hover:border-[#547926] hover:shadow-md cursor-pointer transition duration-150"
  >
    <div class="flex items-center gap-3.5">
      <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-xl shrink-0">
        <slot name="icon">
          <span>{{ icon }}</span>
        </slot>
      </div>
      <div>
        <span class="text-sm font-bold text-gray-900 group-hover:text-[#547926] transition block">
          {{ title }}
        </span>
        <span v-if="subtitle" class="text-[11px] text-[#547926] font-medium">
          {{ subtitle }}
        </span>
      </div>
    </div>
    <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "⚙️",
  },
});

defineEmits(["click"]);
</script>

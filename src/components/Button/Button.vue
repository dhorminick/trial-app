<template>
    <button
        :class="[props.active ? `bg-[${type.color}] text-white` : 'bg-white text-[#94A3B8]', 'rounded-full w-full p-[14px]']"
        @click="$emit('clicked')">
        {{ props.label }}
    </button>
</template>

<script setup lang="ts">
import useType from '@/composables/useType';

const type = useType()
const props = defineProps(['label', 'active'])
const emit = defineEmits(['clicked'])
</script>
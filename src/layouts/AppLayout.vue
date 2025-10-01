<template>
    <div :class="bgClass" class="min-h-screen flex flex-col bg-cover bg-no-repeat">
        <NavHeader />
        <div class="flex-1 border">
            <slot />
        </div>
        <NavFooter />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NavFooter from '@/components/Nav/NavFooter.vue';
import NavHeader from '@/components/Nav/NavHeader.vue';
import useType from '@/composables/useType';

const type = useType();

const bgClass = computed(() => {
    return type.type === 'recruiter' ? 'bg-[url("/images/recruiter.png")]' : 'bg-[url("/images/talent.jpg")]'
});
</script>
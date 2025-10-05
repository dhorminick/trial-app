<template>
    <div :class="['min-h-[100dvh]', 'flex', 'flex-col', 'bg-cover', 'bg-no-repeat', bgClass]">
        <Toast />
        <div class="sm:block hidden">
            <NavHeader />
        </div>
        <div class="flex-1">
            <slot />
        </div>
        <div class="sm:block hidden">
            <NavFooter />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { Toast } from 'primevue';
import NavFooter from '@/components/Nav/NavFooter.vue';
import NavHeader from '@/components/Nav/NavHeader.vue';
import useType from '@/composables/useType';

const type = useType();

const bgClass = computed(() => {
    return type.type === "recruiter" ? "bg-[url('/images/recruiter.jpg')]" : "bg-[url('/images/talent.jpg')] bg-center"
});

onBeforeMount(() => {
    const preloadImages = () => {
        const recruiter = new Image();
        recruiter.src = '/images/recruiter.jpg';

        const talent = new Image();
        talent.src = '/images/talent.jpg';
    };

    preloadImages();

})
</script>
<style>
* {
    font-size: 14px;
}
</style>
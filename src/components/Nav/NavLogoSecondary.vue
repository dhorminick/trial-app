<template>
    <div class="flex justify-center items-center sm:hidden block py-[24px]">
        <img v-if="type.type === 'talent'" src="/images/logo-secondary-talent.png" alt="Shango"
            class="w-[120px] h-[28px]" />
        <img v-if="type.type === 'recruiter'" src="/images/logo-secondary-recruiter.png" alt="Shango"
            class="w-[120px] h-[28px]" />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import useType from '@/composables/useType';
const type = useType()

onBeforeMount(() => {
    const preloadImages = () => {
        const recruiter = new Image();
        recruiter.src = '/images/logo-secondary-talent.png';

        const talent = new Image();
        talent.src = '/images/logo-secondary-recruiter.png';
    };

    preloadImages();

})
</script>
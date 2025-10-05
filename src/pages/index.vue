<template>
    <div class="relative">
        <div
            class="flex flex-col absolute sm:rounded-[24px] top-0 sm:top-[20px] right-0 sm:right-[100px] w-full sm:min-h-0 min-h-[100dvh] sm:w-[500px] bg-white p-[30px]">
            <NavLogoSecondary />
            <div class="flex-1">
                <Auth />
            </div>
            <div class="sm:hidden block w-full">
                <NavFooter />
            </div>
        </div>
    </div>
</template>
<script setup>
import Auth from '@/components/Auth/Auth.vue';
import NavFooter from '@/components/Nav/NavFooter.vue';
import NavLogoSecondary from '@/components/Nav/NavLogoSecondary.vue';
</script>
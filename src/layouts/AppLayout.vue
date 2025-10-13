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
import { computed, onBeforeMount, ref } from 'vue';
import { Toast } from 'primevue';
import NavFooter from '@/components/Nav/NavFooter.vue';
import NavHeader from '@/components/Nav/NavHeader.vue';
import useType from '@/composables/useType';

const type = useType();
const bg_recruiter = ref('/images/recruiter.jpg')
const bg_talent = ref('/images/talent.jpg')

const bgClass = computed(() => {
    return type.type === "recruiter" ? `bg-[url('${bg_recruiter.value}')]` : `bg-[url('${bg_talent.value}')] bg-center`
});

onBeforeMount(async () => {
    const preloadImages = () => {
        const recruiter = new Image();
        recruiter.src = '/images/recruiter.jpg';

        const talent = new Image();
        talent.src = '/images/talent.jpg';

        const recruiter_af = new Image();
        recruiter_af.src = '/images/zone/recruiter/recruteur_africain.png';

        const recruiter_as = new Image();
        recruiter_as.src = '/images/zone/recruiter/recruteur_americain.png';

        const recruiter_eu = new Image();
        recruiter_eu.src = '/images/zone/recruiter/recruteur_asia.png';

        const recruiter_oc = new Image();
        recruiter_oc.src = '/images/zone/recruiter/recruteur_europe.png';

        const recruiter_am = new Image();
        recruiter_am.src = '/images/zone/recruiter/recruteur_ocean.png';

        const talent_am = new Image();
        talent_am.src = '/images/zone/talent/Player_American.png';

        const talent_as = new Image();
        talent_as.src = '/images/zone/talent/Player_asian.png';

        const talent_eu = new Image();
        talent_eu.src = '/images/zone/talent/Player_european.png';

        const talent_af = new Image();
        talent_af.src = '/images/zone/talent/Player_africa.png';

        const talent_oc = new Image();
        talent_oc.src = '/images/zone/talent/Player_ocean.png';
    };

    preloadImages();

    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.continent_code) {
            switch (data.continent_code) {
                case 'AF':
                    bg_recruiter.value = '/images/zone/recruiter/recruteur_africain.png';
                    bg_talent.value = '/images/zone/talent/Player_africa.png';
                    break;

                case 'OC':
                    bg_recruiter.value = '/images/zone/recruiter/recruteur_ocean.png';
                    bg_talent.value = '/images/zone/talent/Player_ocean.png';
                    break;

                case 'AS':
                    bg_recruiter.value = '/images/zone/recruiter/recruteur_asia.png';
                    bg_talent.value = '/images/zone/talent/Player_asian.png';
                    break;

                case 'EU':
                    bg_recruiter.value = '/images/zone/recruiter/recruteur_europe.png';
                    bg_talent.value = '/images/zone/talent/Player_european.png';
                    break;

                case 'NA':
                case 'SA':
                    bg_recruiter.value = '/images/zone/recruiter/recruteur_americain.png';
                    bg_talent.value = '/images/zone/talent/Player_American.png';
                    break;

                default:
                    bg_recruiter.value = '/images/recruiter.jpg';
                    bg_talent.value = '/images/talent.jpg';
                    break;
            }
        }

    } catch (error) {
        console.error('Failed to fetch IP info', error);
    }

})
</script>
<style>
* {
    font-size: 14px;
}
</style>
<template>
    <component :is="currentComponent" @next="goNext" @back="goBack" />
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import EmailStage from '@/components/Auth/AuthEmail.vue';
import OtpStage from '@/components/Auth/AuthOtp.vue';
import PasswordStage from '@/components/Auth/AuthPassword.vue';
import SuccessStage from '@/components/Auth/AuthConfirm.vue';

const stage = ref('email');

const currentComponent = computed(() => {
    switch (stage.value) {
        case 'email': return EmailStage;
        case 'otp': return OtpStage;
        case 'password': return PasswordStage;
        case 'success': return SuccessStage;
        default: return EmailStage;
    }
});

const goNext = () => {
    if (stage.value === 'email') stage.value = 'otp';
    else if (stage.value === 'otp') stage.value = 'password';
    else if (stage.value === 'password') stage.value = 'success';
}

const goBack = () => {
    stage.value = 'email';
}

// onBeforeMount(() => {
//     if (authManager.stage) {
//         stage.value = authManager.stage;
//     }
// })
</script>
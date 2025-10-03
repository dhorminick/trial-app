<template>
    <div>
        <div class="flex gap-[10px] text-[200%] font-bold items-center mb-[10px] cursor-pointer" @click="$emit('back')">
            <i class="pi pi-arrow-left text-[14px]"></i>
            Code de vérification
        </div>

        <form @submit.prevent="_verifyOTP(authManager.user.email, otp)" class="flex flex-col gap-[15px]">
            <div>
                Entrez le code de vérification à six (06) chiffres a été envoyé à
                "{{ authManager.user.email ?? 'error' }}"
            </div>

            <div>
                <h6 class="text-[red] mb-[5px]" v-if="error">Code de vérification incorrect</h6>
                <InputOtp v-model="otp" :length="6" class="gap-[10px]" integerOnly>
                    <template #default="{ attrs, events }">
                        <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input"
                            :class="error ? 'error' : ''" />
                    </template>
                </InputOtp>
            </div>

            <div>
                <div v-if="isLoadingResendOTP" class="flex gap-[10px] items-center">
                    <i class="pi pi-spinner-dotted pi-spin text-[12px] mt-[2px]"></i>
                    Renvoie en cours ...
                </div>
                <div v-else>
                    <div v-if="countdown > 0" class="flex gap-[10px] items-center text-[14px]">
                        <i class="pi pi-clock text-[12px] mt-[2px]"></i>
                        Renvoyer dans {{ countdown }}s
                    </div>
                    <div v-else :class="`text-[${type.color}]`"
                        class="flex gap-[10px] items-center text-[14px] cursor-pointer" @click="_resendOTP">
                        <i class="pi pi-send mt-[2px]"></i>
                        Renvoyer le code
                    </div>
                </div>
            </div>
            <Button :loading="loading" label="Vérifier" type="submit"
                :class="[`!bg-[${type.color}]`, 'w-full !border-none !outline-none !py-[10px]']" />
        </form>
    </div>
</template>

<script setup lang="ts">
import useMethods from '@/composables/useMethods';
import useType from '@/composables/useType';
import Button from 'primevue/button';
import useAuthManager from '@/composables/useAuth';
import { InputOtp } from 'primevue';
import { ref, watch } from 'vue';
import { useToast } from 'primevue';

const type = useType();
const toast = useToast();
const authManager = useAuthManager();
const { verifyOTP, resendOTP } = useMethods();

const loading = ref(false);
const emit = defineEmits(['next', 'back']);

const otp = ref();
const error = ref(false);
const isLoadingResendOTP = ref(false);
const countdown = ref(0);
let countdownInterval: ReturnType<typeof setInterval> | null = null;

const startCountdown = () => {
    countdown.value = 15;
    countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearInterval(countdownInterval!);
            countdownInterval = null;
        }
    }, 1000);
};

watch(otp, (newValue) => {
    if (otp !== newValue) {
        if (error.value) error.value = false;
    }
})

const _verifyOTP = async (e: string, code: string) => {
    loading.value = true;
    const res = await verifyOTP({ email: e, otp: code });
    if (res && res.status) {
        loading.value = false;
        const status = res.status === 201 ? 'success' : 'error';
        toast.add({
            severity: status,
            summary: status.toUpperCase(), detail: res.message ?? 'An error occured', life: 3000
        });

        if (status === 'success') {
            otp.value = '';
            emit('next');
        } else {
            error.value = true;
        }
    }
}

const _resendOTP = async () => {
    if (isLoadingResendOTP.value || countdown.value > 0) return;

    isLoadingResendOTP.value = true;
    try {
        const res = await resendOTP(authManager.user.email);
        if (res && res.status) {
            const status = res.status === 200 ? 'success' : 'error';
            toast.add({
                severity: status,
                summary: status.toUpperCase(), detail: res.message ?? 'An error occured', life: 3000
            });

            if (status === 'success') {
                startCountdown();
            }
        }
    } catch (error: any) {
        console.error(error);
    } finally {
        isLoadingResendOTP.value = false;
    }
};
</script>

<style scoped>
.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 5px;
    border: 1px solid var(--p-inputtext-border-color);
    background: white;
    color: black;
    width: 100%;
}

.custom-otp-input.error {
    border: 1px solid red !important;
}
</style>
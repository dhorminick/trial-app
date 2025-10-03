<template>
    <div>
        <h2 class="text-[200%] font-bold mb-[10px]">Créer mot de passe</h2>

        <form class="flex flex-col gap-[15px]" @submit.prevent="_verifyUser">
            <div>Veuillez créer le mot de passe pour votre session.</div>
            <div>

                <Password v-model="password" fluid :invalid="isValid" :feedback="false"
                    placeholder="Entrer votre mot de passe" toggleMask />
                <div v-if="!allValid" class="flex flex-col mt-[10px]">
                    <div class="flex items-center gap-2">
                        <i class="text-[10px]"
                            :class="validLength ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
                        Au moins 12 caractères
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="text-[10px]"
                            :class="validComplexity ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
                        Au moins un chiffre et un caractère spécial (@#&_?)
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="text-[10px]"
                            :class="validPersonalInfo ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
                        Ne doit pas contenir votre nom ni votre email
                    </div>
                </div>
                <div v-if="isValid">Les caractères entrées ne sont pas identiques</div>
            </div>
            <Password v-model="confirmPassword" fluid :invalid="isValid" :feedback="false"
                placeholder="Confirmer votre mot de passe" :toggleMask="true" />
            <Button :loading="loading" label="Valider" type="submit"
                :class="[`!bg-[${type.color}]`, 'w-full !border-none !outline-none !py-[10px]']" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Password from 'primevue/password';
import Button from 'primevue/button';
import useAuthManager from '@/composables/useAuthmanager';
import { useToast } from 'primevue';
import useMethods from '@/composables/useMethods';
import useType from '@/composables/useType';

const { verifyUser } = useMethods();

const authManager = useAuthManager();
const toast = useToast();
const type = useType()

const emit = defineEmits(['next']);

const loading = ref(false);
const password = ref('');
const confirmPassword = ref('');

const validLength = ref(true);
const validComplexity = ref(true);
const validPersonalInfo = ref(true);
const isValid = ref(false)

const allValid = computed(() => validLength.value && validComplexity.value && validPersonalInfo.value);

watch(password, (newVal) => {
    validLength.value = newVal.length >= 12;
    // /[0-9]/.test(newVal) &&
    validComplexity.value = /[@#&_?]/.test(newVal);
    const lower = newVal.toLowerCase();
    //   const name = authManager.user.name?.toLowerCase() || ''; 
    const email = authManager.user.email?.toLowerCase() || '';
    // !lower.includes(name) &&
    validPersonalInfo.value = !lower.includes(email);
});

watch([password, confirmPassword], () => {
    if (isValid.value) isValid.value = false;
});

const _verifyUser = async () => {
    if (!allValid.value) return;

    if (password.value !== confirmPassword.value) {
        isValid.value = true;
        return;
    }

    loading.value = true;
    const res = await verifyUser({ email: authManager.user.email, password: password.value, userType: type.type });
    if (res && res.status) {
        loading.value = false;
        const status = res.status === 201 ? 'success' : 'error';
        toast.add({
            severity: status,
            summary: status.toUpperCase(), detail: res.message ?? 'An error occured', life: 3000
        });

        if (status === 'success') {
            password.value = '';
            confirmPassword.value = '';
            emit('next');
        }
    }
};
</script>
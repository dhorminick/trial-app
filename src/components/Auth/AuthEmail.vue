<template>
    <div>
        <h3 class="text-center font-bold text-[200%] sm:block hidden">Créer un compte</h3>
        <div class="flex border rounded-full p-[3px] my-[20px]">
            <ButtonCustom label="Je suis un talent" :active="type.type === 'recruiter' ? true : false"
                @clicked="type.switchType('recruiter')" />
            <ButtonCustom label="Je suis un recruteur" :active="type.type === 'talent' ? true : false"
                @clicked="type.switchType('talent')" />
        </div>
        <form @submit.prevent="_preRegister(email)" class="flex flex-col gap-[15px]">
            <h4>Veuillez entrer votre adresse e-mail pour créer votre compte.</h4>
            <InputText v-model="email" :invalid="!isInvalid" type="email" class="!w-full"
                placeholder="Entrez votre adresse mail" />
            <Button :loading="loading" label="Suivant" type="submit"
                :class="[`!bg-[${type.color}]`, 'w-full !border-none !outline-none !py-[10px]']" />
            <div class="text-center">
                Vous avez déjà un compte ? <span :class="`text-[${type.color}]`">Se connecter</span>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from 'vue';
import useAuthManager from '@/composables/useAuthmanager';
import useType from '@/composables/useType';
import ButtonCustom from '@/components/Button/Button.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue';
import useMethods from '@/composables/useMethods';

const type = useType()
const toast = useToast();
const authManager = useAuthManager();
const { preRegister } = useMethods()

const loading = ref(false);
const emit = defineEmits(['next']);
const email = ref('john@company.com');
const isInvalid = ref(true)

const _preRegister = async (e: string) => {
    loading.value = true;
    if (!e) { isInvalid.value = false; return; }

    const res = await preRegister(e);

    if (res && res.status) {
        loading.value = false;
        const status = res.status === 201 ? 'success' : 'error';
        toast.add({
            severity: status,
            summary: status.toUpperCase(), detail: res.message ?? 'An error occured', life: 3000
        });

        if (status === 'success') {
            email.value = '';
            emit('next');
        }
    }
}

watch(email, () => {
    if (!isInvalid.value) isInvalid.value = true;
})
</script>
<template>
    <div class="flex flex-col gap-[20px]">
        <img src="/images/done.png" class="w-full h-full" lazy />
        <h3 class="text-center font-bold text-[200%]">Félicitations</h3>
        <div class="text-center">Votre compte <strong class="capitalize">"{{ type.type }}"</strong> a été créé avec
            succès.</div>
        <Button label="Aller au tableau de bord" type="submit"
            :class="[`!bg-[${type.color}]`, 'w-full !border-none !outline-none !py-[10px]']" />
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import useType from '@/composables/useType';

const type = useType()
const emit = defineEmits(['next']);
</script>
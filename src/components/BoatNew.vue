<template>
    <BoatForm />
</template>

<script>
    import BoatForm from '@/components/BoatForm.vue'

    export default {
      name: 'BoatNew',
      props: {
        id: String
      },
      components: {
        BoatForm
      }
    }
</script>

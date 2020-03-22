<template>
    <BoatForm :id="id" />
</template>

<script>
    import BoatForm from '@/components/BoatForm.vue'

    export default {
      name: 'BoatEdit',
      props: {
        id: String
      },
      components: {
        BoatForm
      }
    }
</script>

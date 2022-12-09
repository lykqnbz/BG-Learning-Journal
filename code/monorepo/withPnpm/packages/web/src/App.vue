<script setup>
import { getUser } from '@bg/api';
import Button from '@bg/components';
getUser().then((r => {
  console.log(r)
}))

</script>

<template>
  <Button></Button>
</template>

<style scoped>

</style>

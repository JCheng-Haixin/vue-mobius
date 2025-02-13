<script setup lang="ts">
  import { MoFlex } from 'vue-mobius/components';
</script>

<template>
  <div>
    <MoFlex>
      <template #start>ABC</template>
      <template #default>MMM</template>
      <template #end>DEF</template>
    </MoFlex>
  </div>
</template>
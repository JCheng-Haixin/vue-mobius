<script setup lang="ts">
  import { MoFlex } from 'vue-mobius/components';
</script>

<template>
  <div>
    <MoFlex>
      <template #start>左</template>
      <template #default>中</template>
      <template #end>右</template>
    </MoFlex>
    <MoFlex direction="column" style="height: 200px;" :start="{ visible: false }" :main="{ visible: false }">
      <template #start>上</template>
      <template #default>中</template>
      <template #end>下</template>
    </MoFlex>
    <MoFlex direction="column" style="height: 200px;" :main="{ visible: false }">
      <template #start>上</template>
      <template #default>中</template>
      <template #end>下</template>
    </MoFlex>
  </div>
</template>

<style lang="scss" scoped>
  .mo-flex {
    // outline: 1px solid red;
    > :deep(*) {
      border: 1px solid pink;
    }
  }
</style>
<script lang="ts">
const { name } = createNamespace('flex');
export default {
  name
}
</script>

<script setup lang="ts">
  import type { StyleValue } from 'vue';
  import { createNamespace } from '../utils/namespace';

  type FlexChild = {
    visible?: boolean,
    style?: StyleValue,
    class?: any,
    animate?: boolean
  }

  withDefaults(defineProps<{
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    start?: FlexChild,
    main?: FlexChild,
    end?: FlexChild,
  }>(), { direction: 'row' })
</script>

<template>
  <div
    class="flex-layout"
    :class="`flex-layout--${direction}`"
  >
    <Transition :name="direction.includes('row') ? 'width' : 'height'">
      <div v-if="start?.visible !== false" 
        :class="start?.class"
        :style="start?.style"
        class="flex-layout-start">
        <slot name="start" />
      </div>
    </Transition>
    <Transition :name="direction.includes('row') ? 'width' : 'height'">
      <div
        v-if="main?.visible !== false"
        ref="refMain"
        :class="main?.class"
        :style="main?.style"
        class="flex-layout-main"
      >
        <slot />
      </div>
    </Transition>
    <Transition :name="direction.includes('row') ? 'width' : 'height'">
      <div v-if="end?.visible !== false" 
        :class="end?.class"
        :style="end?.style"
        class="flex-layout-end">
        <slot name="end" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .flex-layout {
    display: flex;
    flex-direction: v-bind(direction);
    box-sizing: border-box;

    & > &-main {
      flex: auto;
      flex-wrap: nowrap;
    }

    & > &-start, 
    & > &-end {
      // TODO: start & end overflow
      flex-shrink: 0;
    }

    &--row,
    &--row-reverse {
      width: 100%;
      overflow-x: auto;

      > .flex-layout-main {
        min-width: 0;
        overflow-x: auto;
      }
    }

    &--column,
    &--column-reverse {
      /**
       * 水平状态默认占据水平向 100% 空间
       * 为保持一致：垂直状态默认占据垂直向 100% 空间
       */
      height: 100%;
      overflow-y: auto;

      > .flex-layout-main {
        min-height: 0;
        overflow-y: auto;
      }
    }

    & > .width-enter-active,
    & > .width-leave-active {
      overflow: hidden;
      transition: max-width .3s linear;
    }

    & > .width-enter-to,
    & > .width-leave-from {
      max-width: 100%;
    }

    & > .width-enter-from,
    & > .width-leave-to {
      max-width: 0;
    }

    & > .fade-enter-active,
    & > .fade-leave-active {
      transition: opacity .3s ease;
    }

    & > .fade-enter-to,
    & > .fade-leave-from {
      opacity: 1;
    }

    & > .fade-enter-from,
    & > .fade-leave-to {
      opacity: 0;
    }

    & > .height-enter-active,
    & > .height-leave-active {
      overflow: hidden;
      transition: max-height .3s linear;
    }

    & > .height-enter-to,
    & > .height-leave-from {
      max-height: 100%;
    }

    & > .height-enter-from,
    & > .height-leave-to {
      max-height: 0%;
    }
  }
</style>
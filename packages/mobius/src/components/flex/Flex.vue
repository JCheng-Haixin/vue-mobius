<script lang="ts">
  const { name, bem } = createNamespace('flex');
  export default {
    name
  }
</script>

<script setup lang="ts">
  import { computed, type StyleValue } from 'vue';
  import { createNamespace } from '../utils/namespace';

  type FlexChild = {
    visible?: boolean,
    style?: StyleValue,
    class?: any,
    animate?: boolean
  }

  const props = withDefaults(defineProps<{
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    start?: FlexChild,
    main?: FlexChild,
    end?: FlexChild,
  }>(), { direction: 'row' })

  const transition = computed(() => props.direction.includes('row') ? 'width' : 'height')
</script>

<template>
  <div :class="[bem(), bem({ [direction]: true })]">
    <Transition :name="transition">
      <div v-if="start?.visible !== false" 
        :class="[bem('start'), start?.class]"
        :style="start?.style">
        <slot name="start" />
      </div>
    </Transition>
    <Transition :name="transition">
      <div
        v-if="main?.visible !== false"
        ref="refMain"
        :class="[bem('main'), main?.class]"
        :style="main?.style"
      >
        <slot />
      </div>
    </Transition>
    <Transition :name="transition">
      <div v-if="end?.visible !== false" 
        :class="[bem('end'), end?.class]"
        :style="end?.style">
        <slot name="end" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .mo-flex {
    $self: &;

    display: flex;
    flex-direction: v-bind(direction);
    box-sizing: border-box;

    & > &__main {
      flex: auto;
    }

    & > &__start, 
    & > &__end {
      // TODO: start & end overflow
      flex-shrink: 0;
    }

    &--row,
    &--row-reverse {
      width: 100%;
      overflow-x: auto;

      & > #{$self}__main {
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

      & > #{$self}__main {
        min-height: 0;
        overflow-y: auto;
      }
    }

    // 只存在 start + end 时，保持二者位置
    &:has(> #{$self}__start + #{$self}__end) {
      justify-content: space-between;
    }
    // 只存在 end 时，保持 end 位置
    &:has(> #{$self}__end:only-child) {
      justify-content: flex-end;
    }

    // ------------------------------
    // Transition
    // ------------------------------

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
<template>
  <div class="AppArrayLazy AppArray">
    <div class="AppArray__wrapper">
      <AppArrayHead
        :domain="domain"
        :fields="fields"
        :readonly="readonly"
      />

      <template v-if="records.length">
        <div class="AppArray__body">
          <slot />
        </div>
      </template>

      <template v-else>
        <div
          class="AppArray__empty"
          v-html="empty"
        />
      </template>
    </div>

    <div>
      <QBtn
        v-if="!readonly && !static"
        unelevated
        dense
        color="white"
        text-color="grey-9"
        icon="add"
        @click="addItem"
      >
        <AppTooltip>{{ $lang('agnostic.components.array.add') }}</AppTooltip>
      </QBtn>
    </div>
  </div>
</template>

<script type="text/javascript">
import { QBtn } from 'quasar'

import { AppArrayBasic, AppArrayProps, AppArrayAdd, AppArrayEmpty } from './Mixins'
import AppArrayHead from './Partials/AppArrayHead'

export default {
  /**
   */
  name: 'AppArrayLazy',
  /**
   */
  mixins: [AppArrayBasic, AppArrayProps, AppArrayEmpty, AppArrayAdd],
  /**
   */
  components: { AppArrayHead, QBtn }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
@import '~src/css/quasar.variables.styl'
@import './Partials/app-array-include.styl'

.AppArray {

  .AppArray__empty {
    @extend .AppArray__element--color
    border-width: 1px 0 0 0;
    padding: 10px;
    text-align: center;
    color: #797979;
  }

  .AppArray__wrapper {
    @extend .AppArray__element--color
    border-width: 1px;
    border-radius: 4px;

    .AppArray__body {
      .app-form__label {
        display: none;
      }
    }
  }

  .q-field__native.row.items-center {
    flex-wrap: nowrap;
  }

  .has-error {
    > div > label {
      color: $errorForeground;
    }

    & > .q-field > .q-field__inner > .q-field__control {
      color: darken($errorBackground, 25%);

      &:before {
        border-color: $errorBackground;
      }

      &:after {
        background: $errorBackground;
      }
    }
  }
}
</style>

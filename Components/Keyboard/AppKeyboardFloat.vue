<template>
  <div
    class="AppKeyboardFloat"
    :class="{ 'AppKeyboardFloat--visible': visible }"
  >
    <div class="AppKeyboardFloat__display">{{ value }}</div>
    <AppKeyboard
      :value="value"
      @input="$emit('input', $event)"
      @keypress="$emit('keypress', $event)"
    />
  </div>
</template>

<script>
import AppKeyboard from '@devitools/Components/Keyboard/AppKeyboard'

export default {
  /**
   */
  name: 'AppKeyboardFloat',
  /**
   */
  components: { AppKeyboard },
  /**
   */
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppKeyboardFloat {
  position: absolute;
  bottom: 0;
  transform: translateY(100vh)
  transition: 0.3s;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;
  z-index: 1000;

  &.AppKeyboardFloat--visible {
    transform: translateY(0)
  }

  .AppKeyboard .simple-keyboard {
    border-radius: 0;
  }

  .AppKeyboardFloat__display {
    padding: 5px 10px;
    background: #fff;
    height: 73px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    border-radius: 5px 5px 0 0;
    font-size: 2.8em;
    overflow: auto;
    width: 992px;
  }
}
</style>

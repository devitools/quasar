<template>
  <label
    class="q-field--outlined"
    :class="{ 'q-field--focused': focused }"
  >
    <div
      ref="root"
      class="AppPhoneInternational q-field__control relative-position row no-wrap"
    />
  </label>
</template>

<script>
/* https://github.com/jackocnr/intl-tel-input#getting-started */
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.min.css'
import 'intl-tel-input/build/js/utils.js'
import { uuid } from 'src/app/Util/general'

export default {
  /**
   */
  name: 'AppPhoneInternational',
  /**
   */
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  },
  data: () => ({
    identifier: '',
    dialCode: '',
    focused: false
  }),
  /**
   */
  methods: {
    /**
     * @return {string}
     */
    toValueWithoutDialCode (value) {
      if (!this.dialCode) {
        return value
      }
      return String(value).replace(new RegExp(`[+${this.dialCode}]`, 'g'), '')
    },
    /**
     * @return {string}
     */
    toValueWithDialCode (value) {
      const valueWithoutDialCode = this.toValueWithoutDialCode(value)
      return `+${this.dialCode}${valueWithoutDialCode}`
    },
    /**
     * @return {HTMLInputElement}
     */
    createIntlInput () {
      const input = document.createElement('input')
      input.id = this.identifier
      input.type = 'tel'
      input.value = this.value || ''
      input.onkeypress = function ($event) {
        return /[\d]/.test(String.fromCharCode($event.which))
      }

      // noinspection SpellCheckingInspection
      input.addEventListener('countrychange', () => {
        const { dialCode } = this.$iti.getSelectedCountryData()
        this.dialCode = dialCode
      })

      input.addEventListener('focus', () => {
        this.focused = true
      })

      input.addEventListener('blur', () => {
        this.focused = false
      })

      input.addEventListener('change', () => {
        if (!input.value) {
          return
        }
        const value = String(input.value).trim()
        this.$emit('input', this.toValueWithDialCode(value))

        if (!value) {
          return
        }

        const validationCode = this.$iti.getValidationError()
        if (validationCode === 0) {
          this.$emit('hasError', '')
          return
        }

        const validationCodes = {
          // 0: 'phone-international:IS_POSSIBLE',
          1: 'phone-international:INVALID_COUNTRY_CODE',
          2: 'phone-international:TOO_SHORT',
          3: 'phone-international:TOO_LONG',
          4: 'phone-international:IS_POSSIBLE_LOCAL_ONLY',
          5: 'phone-international:INVALID_LENGTH'
        }
        this.$emit('hasError', validationCodes[validationCode])
      })

      this.$refs.root.appendChild(input)

      return input
    },
    /**
     * @return {*}
     */
    getIntlOptions () {
      const options = {
        separateDialCode: true,
        initialCountry: process.env.VUE_APP_COUNTRY_CODE
      }

      if (!this.geoIpLookup) {
        return options
      }

      options.initialCountry = 'auto'
      const countryCode = this.$memory.get('country-code')
      if (countryCode) {
        options.initialCountry = countryCode
        return options
      }

      options.geoIpLookup = this.geoIpLookup
      return options
    }
  },
  /**
   */
  watch: {
    value (value) {
      this.$iti.setNumber(value)
    }
  },
  /**
   */
  created () {
    this.identifier = 'identifier_' + uuid().replace(/-/g, '_')
  },
  /**
   */
  mounted () {
    this.$iti = intlTelInput(this.createIntlInput(), this.getIntlOptions())
  },
  /**
   */
  beforeDestroy () {
    this.$refs.root.classList.add('AppPhoneInternational--destroyed')
    this.$iti.destroy()
  }
}
</script>

<style lang="stylus">
.AppPhoneInternational {
  height: 40px;
  padding: 1px !important;

  .iti {
    color: #909090;
  }

  .iti.iti--allow-dropdown, .iti.iti--allow-dropdown input {
    width: 100%;
  }

  .iti.iti--allow-dropdown input {
    border-radius: 4px;
    border: none;
    padding: 5px 6px 0 70px;
    font-size: 13px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.00937em;
    text-decoration: inherit;
    text-transform: inherit;
  }

  &.AppPhoneInternational--destroyed {
    border-radius: 4px;
    border: 1px solid #c2c2c2;

    height: 40px;

    & > * {
      display: none;
    }
  }

  &:after {
  }
}

</style>

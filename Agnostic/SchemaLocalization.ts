import Schema from './Schema'
import { Localization } from '../Services/Locator/contracts'

import { Payload, SchemaForm } from './Helper/interfaces'
import Locator from '../Services/Locator'

/**
 * @class {SchemaLocalization}
 */
export default abstract class SchemaLocalization extends Schema {
  /**
   * @param {Localization} localization
   * @param {string[]} fill
   */
  addLocalizationFields (localization?: Localization, fill?: string[]) {
    if (!localization) {
      localization = {
        zip: 'zip',
        state: 'state',
        city: 'city',
        neighborhood: 'neighborhood',
        address: 'address',
        complement: 'complement',
        number: 'number'
      }
    }

    if (!fill) {
      fill = [
        'state',
        'city',
        'neighborhood',
        'address'
      ]
    }

    this.addField(localization.zip)
      .fieldAsZip()
      .fieldOn('input', async function (this: SchemaForm, payload: Payload) {
        const { $event } = payload
        if (typeof $event !== 'string') {
          return
        }
        const value = $event.replace(/\D/g, '')
        if (value.length !== 8) {
          return
        }
        try {
          this.$q.loading.show({ delay: 0 })

          const response = await Locator.build().query(value) as Record<string, string>

          const map = Object.entries(localization as Record<string, string>)
            .filter(([key]) => fill?.includes(key) ?? false)
            .map(([from, to]) => ({ from, to }))

          let focus
          for (const { from, to } of map) {
            if (typeof to !== 'string') {
              continue
            }
            const value = response[from] ?? ''
            if (!value && !focus) {
              focus = to
            }
            this.$getField(to).$setValue(value)
          }

          if (!focus) {
            focus = localization?.number ?? localization?.complement ?? ''
          }

          if (focus) {
            this.$getField(focus).$fieldFormFocus()
          }
        } catch (e) {
          // silence is gold
        } finally {
          this.$q.loading.hide()
        }
      })
      .fieldFormWidth(25)

    this.addField(localization.state)
      .fieldIsSelect()
      .fieldFormWidth(30)
      .fieldFormDisabled()

    this.addField(localization.city)
      .fieldFormWidth(45)
      .fieldFormDisabled()

    this.addField(localization.neighborhood)
      .fieldFormWidth(35)

    this.addField(localization.address)
      .fieldFormWidth(50)

    if (localization.number) {
      this.addField(localization.number)
        .fieldFormWidth(15)
    }

    if (localization.complement) {
      this.addField(localization.complement)
        .fieldFormWidth(55)
    }
  }
}

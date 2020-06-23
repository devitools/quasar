import { timestamps } from 'src/settings/field'

import Skeleton from './Skeleton'

import { Provide, Timestamp, SchemaForm, SchemaTable } from './Helper/interfaces'
import { SCOPES } from './enum'

/**
 * @class {Schema}
 */
export default abstract class Schema extends Skeleton {
  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    this.configureActions()
    this.configureComponentInitialization()
    this.configureRequestRecords()
    this.configureRequestRecord()
  }

  /**
   */
  timestamps () {
    timestamps.forEach((element: Timestamp, index: number) => {
      if (this.__fields[element.name]) {
        return
      }

      this.addField(element.name)
        .fieldScopes([SCOPES.SCOPE_VIEW])
        .fieldAppendAttrs({ borderLess: true, printable: true })
        .fieldFormDisabled()
        .fieldFormHidden()
        .fieldFormWidth(index === 0 || index === 3 ? 34 : 33)
        .fieldFormOrder(200 + index)
        .setType(element.type)
    })
  }

  /**
   * @return {Provide}
   */
  provide (): Provide {
    const schema = <typeof Schema>this.constructor
    return {
      domain: schema.domain,
      primaryKey: schema.primaryKey,
      displayKey: schema.displayKey,
      groupType: schema.groupType,
      groups: () => this.getGroups(),
      fields: () => this.getFields(),
      actions: () => this.getActions(),
      hooks: () => this.getHooks(),
      watches: () => this.getWatches()
    }
  }
}

import Skeleton from './Skeleton'

import { SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaEmbed}
 */
export default abstract class SchemaEmbed extends Skeleton {
  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    // this.configureActions()
    this.configureComponentInitialization()
    this.configureRequestRecords()
    this.configureRequestRecord()
  }

  /**
   * @param {string} masterKey
   * @returns {*}
   */
  static provideEmbed (masterKey: string) {
    let build: SchemaEmbed
    const instance = () => {
      if (!build) {
        build = this.build()
      }
      return build
    }

    return {
      masterKey: masterKey,
      groupType: this.groupType,
      domain: this.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => instance().getHooks(),
      actions: () => instance().getActions(),
      groups: () => instance().getGroups(),
      fields: () => instance().getFields(),
      watches: () => instance().getWatches()
    }
  }
}

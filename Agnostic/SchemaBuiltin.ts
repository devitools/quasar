import Schema from './Schema'

import { SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaBuiltin}
 */
export default abstract class SchemaBuiltin extends Schema {
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
   * @param {Record<string, unknown>} attrs
   * @return {*}
   */
  static provideBuiltin (attrs: Record<string, unknown> = {}) {
    return {
      providing: () => this.build().provide(),
      defaults: {},
      ...attrs
    }
  }
}

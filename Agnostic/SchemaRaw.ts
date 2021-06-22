import Schema from './Schema'
import { Provide, SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaRaw}
 */
export default abstract class SchemaRaw extends Schema {
  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.configureComponentInitialization()
  }

  /**
   */
  timestamps () {
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @return {{providing: () => Provide}}
   */
  static provideRaw (attrs: Record<string, unknown> = {}): { providing: () => Provide } {
    return {
      providing: () => this.build().provide(),
      ...attrs
    }
  }
}

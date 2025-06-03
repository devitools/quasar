import Schema from './Schema'

import { Platform } from 'quasar'

import { ProvideBuiltin, SchemaForm, SchemaTable } from './Helper/interfaces'
import mixin from './Helper/mixin'
import ConfigureActionsSchemaBuiltin from './Schema/Component/ConfigureActionsSchemaBuiltin'
import { scopesBuiltin } from './enum'

/**
 * @class {SchemaBuiltin}
 */
abstract class SchemaBuiltin extends Schema {
  /**
   * @return {string[]}
   */
  initScopes (): string[] {
    return scopesBuiltin()
  }

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    this.configureActionsSchemaBuiltin()
    this.configureComponentInitialization()
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @return {ProvideBuiltin}
   */
  static provideBuiltin (attrs: Record<string, unknown> = {}): ProvideBuiltin {
    let size = attrs?.size ? Number(attrs.size) : undefined
    const { sizeAdjustment } = attrs
    if (sizeAdjustment) {
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const rowsPerPage = Math.ceil((height - Number(sizeAdjustment)) / (Platform.is.desktop ? 40 : 55))
      size = rowsPerPage > 5 ? rowsPerPage : 5
    }

    return {
      providing: () => this.build().provide(),
      defaults: {},
      debuggerAllowed: attrs?.debuggerAllowed ? Boolean(attrs.debuggerAllowed) : undefined,
      disable: attrs?.disable ? Boolean(attrs.disable) : undefined,
      height: attrs?.height ? String(attrs.height) : undefined,
      size,
      ...attrs
    }
  }
}

/**
 * @class {SchemaBuiltin}
 */
interface SchemaBuiltin extends ConfigureActionsSchemaBuiltin {
  provideBuiltin (attrs?: Record<string, unknown>): ProvideBuiltin
}

mixin(SchemaBuiltin, [ConfigureActionsSchemaBuiltin])

export default SchemaBuiltin

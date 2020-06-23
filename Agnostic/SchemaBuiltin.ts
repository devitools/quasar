import Schema from './Schema'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldValidation from './Schema/FieldValidation'
import Actions from './Schema/Actions'
import Hooks from './Schema/Hooks'
import Watches from './Schema/Watches'
import ConfigureActions from './Schema/Component/ConfigureActions'
import ConfigureComponent from './Schema/Component/ConfigureComponent'

import mixin from './Helper/mixin'
import { SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaBuiltin}
 */
abstract class SchemaBuiltin extends Schema {
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
    const that = this
    return {
      providing: () => that.build().provide(),
      defaults: {},
      ...attrs
    }
  }
}

/**
 * @interface {SchemaBuiltin}
 */
interface SchemaBuiltin extends Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  ConfigureActions,
  ConfigureComponent {
}

mixin(SchemaBuiltin, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  ConfigureActions,
  ConfigureComponent
])

export default SchemaBuiltin

import Skeleton from './Skeleton'

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
import { SchemaForm, SchemaTable } from 'app/@devitools/Agnostic/Helper/interfaces'

/**
 * @class {SchemaEmbed}
 */
abstract class SchemaEmbed extends Skeleton {
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

/**
 * @interface {SchemaEmbed}
 */
interface SchemaEmbed extends Groups,
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

mixin(SchemaEmbed, [
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

export default SchemaEmbed

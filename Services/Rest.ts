import Basic from './Rest/Basic'

import mixin from '../Agnostic/Helper/mixin'

import Create from './Rest/Create'
import Read from './Rest/Read'
import Update from './Rest/Update'
import Destroy from './Rest/Destroy'
import Search from './Rest/Search'

/**
 * @class {Rest}
 */
abstract class Rest extends Basic {
}

/**
 * @interface {Rest}
 */
interface Rest extends Create, Read, Update, Destroy, Search {}

mixin(Rest, [Create, Read, Update, Destroy, Search])

export default Rest

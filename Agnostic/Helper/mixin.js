/**
 * @param base
 * @param mixins
 */
export default function (base, mixins) {
  mixins.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(base.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name))
    })
  })
}

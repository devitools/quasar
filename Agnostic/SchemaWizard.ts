import { Component, Provider, View, WizardStep } from './Helper/interfaces'
import $performance from '../Plugins/$performance'

/**
 * @class {SchemaWizard}
 */
export default abstract class SchemaWizard {
  /**
   * @type {string}
   */
  static domain = ''

  /**
   * @private
   */
  protected schemata: WizardStep[] = []

  /**
   * @private
   */
  private __current?: WizardStep

  /**
   * @return {this}
   */
  static build () {
    // @ts-ignore
    return new this()
  }

  /**
   */
  $self () {
    return <typeof SchemaWizard>this.constructor
  }

  /**
   * SchemaWizard constructor
   */
  protected constructor () {
    const reference = `SchemaWizard.construct(${this.$self().domain})`
    $performance.start(reference)
    this.schemata = []
    this.construct()
    $performance.end(reference)
  }

  /**
   */
  abstract construct (): void

  /**
   */
  abstract finish (this: View, payload: Record<string, unknown>): void

  /**
   * @param {string} id
   * @param {Provider} provider
   * @param {string} icon
   */
  addStep (id: string, provider: Provider, icon = '') {
    if (!this.schemata) {
      this.schemata = []
    }

    const step: WizardStep = {
      id,
      icon,
      provider,
    }
    this.__current = step
    this.schemata.push(step)

    return this
  }

  /**
   * @param {Function} handler
   */
  stepPrevious (handler: Function) {
    if (!this.__current) {
      throw new Error('There is no current step')
    }
    this.__current.previous = handler
    return this
  }

  /**
   * @param {Function} handler
   */
  stepNext (handler: Function) {
    if (!this.__current) {
      throw new Error('There is no current step')
    }
    this.__current.next = handler
    return this
  }

  /**
   */
  provideWizard () {
    return {
      domain: this.$self().domain,
      schemata: this.schemata,
      finish: this.finish
    }
  }
}

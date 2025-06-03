/**
 * @param {string} title
 * @param {string} message
 * @param {function()} click
 * @param {Record<string,unknown>} details
 */
export function notify (title, message, click, details = {}) {
  const options = {
    body: message,
    ...details
  }

  Notification.requestPermission(function (result) {
    if (result !== 'granted') {
      window.alert(message)
      return
    }

    if (options.actions) {
      delete options.requireInteraction
    }

    const notification = new Notification(title, options)
    if (click) {
      notification.onclick = click
    }
  })
}

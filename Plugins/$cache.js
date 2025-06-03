import Cache from 'js-cache'

const cache = new Cache()

/**
 * Cache data or update and existing record.
 * @param {string} key Unique key identifying the cache
 * @param {*} value Cached value
 * @param {number} ttl Time to live in milliseconds (optional)
 */
export function set (key, value, ttl = undefined) {
  cache.set(key, value, ttl)
}

/**
 * Get cached value. Returns cached value (or undefined) if no callback was provided. Always returns undefined if
 * callback argument is present.
 * @param {string} key identifying the cache
 * @param {{(): void}} callback Return value in callback if record exists in memory or on external resource (optional)
 * @return {*}
 */
export function get (key, callback = undefined) {
  return cache.get(key, callback)
}

/**
 * Delete cached data. Returns true if the record existed, false if not.
 * @param {string} key identifying the cache
 * @return {boolean}
 */
export function remove (key) {
  return cache.del(key)
}

/**
 * Clear all cached data. Returns number of cleared records.
 */
export function clear () {
  return cache.clear()
}

/**
 * Returns number of cached records.
 */
export function size () {
  return cache.size()
}

/**
 * Returns internal object with cached records.
 */
export function debug () {
  return cache.debug()
}

/**
 * Returns list of cached record keys.
 */
export function keys () {
  return cache.keys()
}

/**
 * Invalidate the cache of the namespace.
 * @param {string} namespace
 * @return {number}
 */
export function invalidate (namespace) {
  let invalidated = 0
  const keys = cache.keys()
  for (const key of keys) {
    const prefix = key.split(':').shift()
    if (namespace !== prefix) {
      continue
    }
    if (!remove(key)) {
      continue
    }
    invalidated++
  }
  return invalidated
}

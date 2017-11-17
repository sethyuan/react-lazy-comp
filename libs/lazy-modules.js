import { LRUMap } from "lru_map"

// NOTE: configure cache size (num of items)
const loadedModules = new LRUMap(15)

export default async function lazyLoad(modules) {
  let debugging = false
  try {
    debugging = DEBUG
  } catch (e) {
    // ignore and defaults to false
  }
  const entries = await Promise.all(
    Object.entries(modules).map(async ([k, importFn]) => {
      if (debugging) {
        return [k, (await importFn()).default]
      } else {
        if (!loadedModules.find(k)) {
          loadedModules.set(k, (await importFn()).default)
        }
        return [k, loadedModules.get(k)]
      }
    }),
  )
  return entries.reduce((obj, [k, mod]) => {
    obj[k] = mod
    return obj
  }, {})
}

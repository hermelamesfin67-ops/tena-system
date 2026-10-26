export { cn } from "cn"

export function hasObjectsDifferentValues(obj1: object, obj2: object) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}
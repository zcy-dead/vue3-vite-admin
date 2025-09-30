/** 判断是否为外链 */
export function isExternal(path: string) {
  const regex = /^(https?:|mailto:|tel:)/
  return regex.test(path)
}

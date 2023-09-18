export function getDescendantProp(
  obj: {
    [x: string]: any
  },
  desc: string
): any {
  const arr = desc.split(".")
  while (arr.length && (obj = obj[arr.shift() ?? ""]));
  return obj
}

export function setDescendantProp(
  obj: {
    [x: string]: any
  },
  fields: string,
  value: any
): void {
  const fieldsArray = fields.split(".")

  let cur = obj
  const last = fieldsArray.pop()

  fieldsArray.forEach(function (field) {
    cur = cur[field]
  })

  console.log(fields)
  console.log(last)
  if (last) {
    cur[last] = value
  }
}

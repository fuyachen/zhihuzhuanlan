// interface TestProps {
//   _id: string
//   name: string
// }
// const testData: TestProps[] = [
//   { _id: "1", name: "a" },
//   { _id: "2", name: "b" },
// ]

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
// const result = arrToObj(testData)
// console.log(result)
export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key])
}
// const testData2: { [key: string]: TestProps } = {
//   1: { _id: "1", name: "a" },
//   2: { _id: "2", name: "b" },
// }

// const result2 = objToArr(testData2)
// console.log(result2)

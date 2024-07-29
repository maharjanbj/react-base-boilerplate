

// export const getCustomOrderSort = ({data, sortBy, sortField}: any) => {
//     const sortByObject = sortBy.reduce((obj: any, item: any, index: any) => {
//         return {
//             ...obj,
//             [item]: index,
//         };
//     }, {});
//     return data.sort(
//         (a: any, b: any) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
//     );
// };

export const getCustomOrderSort = (
    array: readonly string[],
    sortOrder: readonly string[],
) => {
    const temp = [...array].sort(
        (x, y) => sortOrder.indexOf(x) - sortOrder.indexOf(y),
    )
    return temp
}

export const generatePageArray = (limit: number, count: number): number[] => {
    let val: number[] = []
    const pageNum = Math.ceil(count / limit)
    for (let i = 0; i <= pageNum; i++) {
        val = [...val, i]
    }
    return val
}

export const rearrangeAttributes = (variants: any, attributeOrder: any) => {
    return variants.map((variant: any) => {
        const reorderedValue: any = {}
        attributeOrder.forEach((attribute: any) => {
            reorderedValue[attribute.title] = variant.value[attribute.title]
        })
        return { ...variant, value: reorderedValue }
    })
}



export const formatPrice = (cost: any) => {
    if (cost > 10000) {
        const thousands = Math.floor(cost / 1000)
        const formattedValue = (thousands * 1000).toFixed(2)
        const truncatedValue =
            parseFloat(formattedValue) === parseInt(formattedValue)
                ? parseInt(formattedValue)
                : parseFloat(formattedValue)
        return `${truncatedValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}k`
    } else {
        const formattedValue = cost?.toFixed(2)
        const truncatedValue =
            parseFloat(formattedValue) === parseInt(formattedValue)
                ? parseInt(formattedValue)
                : parseFloat(formattedValue)
        return truncatedValue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}

export const addCommasToPrice = (cost: any) => {
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatDecimal = (number: number) => {
    const decimalPlaces =
        number % 1 !== 0
            ? Math.min(
                  2,
                  number.toString().split('.').length > 1
                      ? number.toString().split('.')[1].length
                      : 0,
              )
            : 0
    const formattedNumber =
        decimalPlaces >= 2
            ? number.toFixed(decimalPlaces)
            : number.toFixed(decimalPlaces || 0)
    return parseFloat(formattedNumber).toLocaleString()
}

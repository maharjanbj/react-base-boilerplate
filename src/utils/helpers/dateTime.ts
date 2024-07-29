

import moment from 'moment'

export const getCurrentDate = () => {
    const date = new Date()
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return {
        day,
        month,
        year,
    }
}

export const getSubsTime = () => {
    const { day, month, year } = getCurrentDate()
    const schedule = new Date(`${year}/${month}/${day} 04:00 PM`).getTime(),
        currentTime = new Date().getTime()
    return schedule - currentTime
}

export const getWkSeries = () => {
    let wk: readonly string[] = []
    for (let i = 1; i <= 52; i++) {
        wk = [...wk, 'wk' + i.toString()]
    }
    return wk
}

export const generateDateRange = (startDate: any, endDate: any) => {
    const dateRange = []
    const currentDate: any = moment(new Date(startDate))

    while (currentDate.isSameOrBefore(moment(new Date(endDate)))) {
        dateRange.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate.add(1, 'days') // Increment the date by 1 day
    }

    return dateRange
}

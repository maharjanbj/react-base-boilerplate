

import { read, utils, writeFile } from 'xlsx'

export const handleExport = (
    headers: any,
    data: any,
    type: string,
    reportType: string,
) => {
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, [headers])
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')

    if (type === 'xlsx') {
        writeFile(wb, reportType + '.xlsx')
    } else {
        writeFile(wb, reportType + '.csv')
    }
}

export const handleUpload = (file: any) => {
    const f = file
    let dataParse: any = []
    const reader = new FileReader()
    reader.onload = (e: any) => {
        const data = e.target.result
        const readedData = read(data, { type: 'binary' })
        const wsname = readedData.SheetNames[0]
        const ws = readedData.Sheets[wsname]

        /* Convert array to json*/
        dataParse = utils.sheet_to_json(ws, { header: 1 })
    }
    reader.readAsBinaryString(f)
    return dataParse
}

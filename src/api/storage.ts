

import { DeleteRequest, PostRequest } from '../plugins/https'

export const APIUploadFile = (data: any) => {
    return PostRequest('/upload-file', data)
}

export const APIDeleteFile = (data: string) => {
    return DeleteRequest('/deleteFile/' + data)
}

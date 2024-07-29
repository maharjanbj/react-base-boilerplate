

export interface IUsersTableRow {
    id: string
    label: string
    price: number
    qte: number
    sold: number
    brand: string
    status: number
    img: string
    createdAt: string
    shipping: boolean
    currency: string
}

export interface IUserDetails {
    id: string
    label: string
    description: string
    price: number
    qte: number
    img: string
    sold: string
    brand: string
    status: number
    createdAt: string
    shipping: boolean
    collect: boolean
    currency: string
    symbole: string
    ownerId: string
    tagId: string
}

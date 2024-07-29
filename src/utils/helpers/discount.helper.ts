

export const getDiscountBadge = (disc: any) => {
    return (
        disc?.value +
        (disc?.type === 'flat' ? ` ${disc?.currency} FLAT` : '%') +
        (disc?.above > 0 ? ` above ${disc?.above}` : '' + ' off')
    )
}

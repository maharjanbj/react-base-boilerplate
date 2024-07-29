

export const getInitials = (str1 = '', str2 = '') => {
    return str1[0] ?? 'N/' + str2[0] ?? 'A'
}

export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

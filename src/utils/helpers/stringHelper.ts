

export const formatName = (firstName: string, lastName: string) => {
    return !!firstName && !!lastName
        ? (
              firstName.charAt(0).toUpperCase() +
              firstName.slice(1) +
              ' ' +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1)
          ).trim()
        : '-'
}

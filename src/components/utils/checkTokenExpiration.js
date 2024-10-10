export const checkTokenExpiration = () => {
    const expire = localStorage.getItem('expire')
    if (!expire) return false

    const expireDate = new Date(expire)
    const currentDate = new Date()

    return currentDate < expireDate
}


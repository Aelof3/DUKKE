
export const addUrlBase = (url) => {
    return `${import.meta.env.BASE_URL}${url}`
}

export const randomHexColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
}


export const addUrlBase = (url) => {
    return `${import.meta.env.BASE_URL}${url}`
}

export const randomHexColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
}

export const getRandomColorName = () => {
    const colors = ['aqua', 'bisque', 'black', 'blue', 'brown', 'burlywood', 'chocolate', 'coral', 'crimson', 'cyan', 'darkgoldenrod', 'darkkhaki', 'darkolivegreen', 'darkorange', 'darkorchid', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dodgerblue', 'firebrick', 'forestgreen', 'fuchsia', 'gold', 'goldenrod', 'green', 'greenyellow', 'hotpink', 'indianred', 'indigo', 'lavender', 'lawngreen', 'lime', 'limegreen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mistyrose', 'moccasin', 'navy', 'olive', 'orange', 'orangered', 'orchid', 'peru', 'pink', 'plum', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'sienna', 'slateblue', 'slategray', 'springgreen', 'steelblue', 'teal', 'tomato', 'turquoise', 'violet', 'wheat', 'yellow', 'yellowgreen']

    return colors[Math.floor(Math.random() * colors.length)]
}
const isArrayEquals = (array1, array2) => {
    if (array1.length !== array2.length) {
        return console.error(`Array has different length`)
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return console.error(`Array has different values`)
        }
    }
    return true
}

module.exports = {isArrayEquals}
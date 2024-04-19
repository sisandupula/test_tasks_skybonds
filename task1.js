const {isArrayEquals} = require('./helpers.js')

const convertToPercent = (values) => {
    if (values.length === 0) {
        return []
    }
    const summOfValues = values.reduce((acc, val) => acc + parseFloat(val), 0)
    
    return values.map(value => {
        const percantage = ((parseFloat(value) * 100) / summOfValues).toFixed(3)
        return percantage
    })
}

const test = () => {
    const errorText = `Incorrect work of 'convertToPercent' function`
        const testCase1 = () => {
        const data = ['1.5', '3', '6', '1.5']
        const expectedData = ['12.500', '25.000', '50.000', '12.500']
        const percentage = convertToPercent(data)
        if (!isArrayEquals(percentage, expectedData)) {
            throw new Error(errorText)
        }
        console.log(`Test #1 passed`)
    }
    
    const testCase2 = () => {
        const percentage = convertToPercent([])
        if (!isArrayEquals(percentage, [])) {
            throw new Error(errorText)
        }
        console.log(`Test #2 passed`)
    }
    
    const testCase3 = () => {
        const data = ['1.5']
        const expectedData = ['100.000']
        const percentage = convertToPercent(data)
        if (!isArrayEquals(percentage, expectedData)) {
            throw new Error(errorText)
        }
        console.log(`Test #3 passed`)
    }

    testCase1()
    testCase2()
    testCase3()
}

test()

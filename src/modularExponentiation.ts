export const modularExponentiation = (base: bigint, exponent: bigint, module: bigint) => {
    base = base % module
    let result = BigInt(1)
    let x = base
    while (exponent > 0) {
        // when a number is odd leastSignificantBit is 1 and 0 for an even number
        const leastSignificantBit = exponent % BigInt(2)
        // division by 2
        exponent = exponent >> BigInt(1)

        if (leastSignificantBit == BigInt(1)) {
            result = (result * x) % module
        }

        x = (x * x) % module
    }
    return result
}

// console.log(modularExponentiation(BigInt(101), BigInt(200), BigInt(7)))
// console.log(BigInt(101) ** BigInt(200) % BigInt(7))

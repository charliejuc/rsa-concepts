import crypto from 'crypto'

// const bytes = crypto.randomBytes(2048)
// const number = bytes.readBigUInt64BE()

// console.log(bytes.readBigUInt64BE())
// console.log(number)

// ! DOC: https://www.geeksforgeeks.org/how-to-generate-large-prime-numbers-for-rsa-algorithm/

function randomNumberOfNBits(n: number) {
    // Returns a random number
    // between 2**(n-1)+1 and 2**n-1'''
    const max = BigInt(2) ** BigInt(n) - BigInt(1)
    const min = BigInt(2) ** BigInt(n - 1) + BigInt(1)
    const randomMultiplier = 100000000
    const random = BigInt(Math.floor(Math.random() * randomMultiplier))

    return (random * (max - min) + min) / BigInt(randomMultiplier)
}

console.log(randomNumberOfNBits(4096))

// This code is contributed by phasing17.

// console.log(crypto.generatePrimeSync(4096))

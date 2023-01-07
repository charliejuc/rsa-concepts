// ! DOC: https://www.geeksforgeeks.org/how-to-generate-large-prime-numbers-for-rsa-algorithm/

import crypto from 'crypto'
import { firstsPrimes } from './config'

// most significant bit and last significant bit to 1
const msbAndLsbTo1 = (n: bigint) => {
    return n | BigInt(1)
}

const _precision = 1_000_000
const randomNumberOfNBits = (bits: number) => {
    const bytes = Math.floor(bits / 8)
    const randomBytesSize = Math.floor(bytes / 10)
    const randomBytes = crypto.randomBytes(randomBytesSize)
    const _randomString = randomBytes.toString('binary')

    return () => {
        const randomString =
            _randomString + crypto.pseudoRandomBytes(bytes - randomBytesSize).toString('binary')
        const randomBinary = randomString
            .split('')
            .reduce((binary, char) => `${binary}${char.charCodeAt(0).toString(2)}`, '0b')
        const randomBigInt = BigInt(randomBinary)

        return msbAndLsbTo1(randomBigInt)
    }
}

// console.log('INT 1024 BITS', randomNumberOfNBits(1024))
// console.log()
// console.log('INT 2048 BITS', randomNumberOfNBits(2048))
// console.log()
// console.log('INT 4096 BITS', randomNumberOfNBits(4096))
// console.log()
// console.log('INT 8192 BITS', randomNumberOfNBits(8192))
// console.log()
// console.log('INT 16384 BITS', randomNumberOfNBits(16384))

const modularExponentiation = (base: bigint, exponent: bigint, module: bigint) => {
    base = base % module
    let result = BigInt(1)
    let x = base
    while (exponent > 0) {
        let leastSignificantBit = exponent % BigInt(2)
        exponent = exponent / BigInt(2)

        if (leastSignificantBit == BigInt(1)) {
            result = result * x
            result = result % module
        }

        x = (x * x) % module
    }
    return result
}

// console.log(modularExponentiation(BigInt(101), BigInt(200), BigInt(7)))
// console.log(BigInt(101) ** BigInt(200) % BigInt(7))

const divisibilityTest = (n: bigint) => {
    for (const prime of firstsPrimes) {
        if (n % prime == BigInt(0)) {
            return false
        }
    }

    return true
}

function fermatTest(n: bigint) {
    // excluded corner cases

    const a = BigInt(2)

    // Fermat's little theorem
    if (modularExponentiation(a, n - BigInt(1), n) != BigInt(1)) {
        return false
    }

    return true
}

const millerRabinPrimalityTest = (d: bigint, s: bigint, n: bigint, _base?: number) => {
    const random = BigInt(Math.floor(Math.random() * _precision))
    const base =
        _base == null ? (random * (n - BigInt(3))) / BigInt(_precision) + BigInt(2) : BigInt(_base)

    let x = modularExponentiation(base, d, n)

    if (x == BigInt(1) || x == n - BigInt(1)) {
        return true
    }

    for (let i = 1; i < s; i++) {
        x = (x * x) % n

        if (x == n - BigInt(1)) {
            return true
        }
    }

    return false
}

const isPrime = (n: bigint, iterations: number, base?: number) => {
    if (n == BigInt(2) || n == BigInt(3)) {
        return true
    }

    if (!divisibilityTest(n) || !fermatTest(n)) {
        return false
    }

    let s = BigInt(0)
    let d = n - BigInt(1) // coprime of n
    // return when find an odd divisor of d
    while (d % BigInt(2) === BigInt(0)) {
        d = d / BigInt(2)
        ++s
    }

    while (iterations > 0) {
        if (!millerRabinPrimalityTest(d, s, n, base)) {
            return false
        }

        --iterations
    }

    return true
}

export const generateRandomPrimeNumber = (options?: {
    bits?: number
    iterations?: number
}): bigint => {
    const _options = {
        bits: 2048,
        iterations: 128,
        ...options
    }
    const _randomNumberOfNBits = randomNumberOfNBits(_options.bits)

    while (true) {
        const candidate = _randomNumberOfNBits()

        if (isPrime(candidate, _options.iterations)) {
            return candidate
        }
    }
}

// console.log(crypto.generatePrimeSync(4096, { bigint: true }))

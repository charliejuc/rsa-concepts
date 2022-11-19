import crypto from 'crypto'
import { isPrime } from './isPrime'

const randomNumberOfNBits = (bits: number) => {
    const bytes = bits / 8

    const _randomNumber = (): bigint => {
        const randomBigInt = BigInt(`0x${crypto.randomBytes(bytes).toString('hex')}`)

        // less significant bit to 1 to get only odd numbers
        return randomBigInt | BigInt(1)
    }

    return _randomNumber
}

let prime: bigint | null = null
const bits = 2048
const _randomNumberOfNBits = randomNumberOfNBits(bits)
let tries = 0
const maxTries = 10_000
let candidate = _randomNumberOfNBits()
while (true) {
    if (isPrime(candidate, 128)) {
        prime = candidate
        break
    }

    if (tries > maxTries) {
        tries = 0
        candidate = _randomNumberOfNBits()
        continue
    }

    candidate = candidate + BigInt(2)
    ++tries
}

console.log(prime)

// console.log(crypto.generatePrimeSync(4096, { bigint: true, safe: true }))

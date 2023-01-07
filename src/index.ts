import { generateRandomPrimeNumber } from './prime'

const p = generateRandomPrimeNumber({ bits: 256 })
const q = generateRandomPrimeNumber({ bits: 256 })

console.log({ p, q })

const n = p * q
// const fiN = (p - BigInt(1)) * (q - BigInt(1))
// standard 65637, we can use any number with greatest common divisor(gcd) between e and fiN => ϕ(n)
const e = BigInt(65_637)

console.log({ e, n })

const generatePublicKeyRaw = (e: bigint, n: bigint) => {
    return e * n
}

const publicKeyRaw = generatePublicKeyRaw(e, n)

console.log({ publicKeyRaw })

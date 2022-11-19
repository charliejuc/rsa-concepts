import { modularExponentiation } from './modularExponentiation'

const _precision = 1_000_000
export const millerRabinPrimalityTest = (d: bigint, s: bigint, n: bigint) => {
    const random = BigInt(Math.floor(Math.random() * _precision))
    // select random base in range [2, n-1]; n - 3 comes from: n - 1 - 2
    const base = (random * (n - BigInt(3))) / BigInt(_precision) + BigInt(2)

    let x = modularExponentiation(base, d, n)

    if (x == BigInt(1) || x == n - BigInt(1)) {
        return true
    }

    for (let i = 1; i < s; i++) {
        x = modularExponentiation(x, BigInt(2), n)

        if (x == n - BigInt(1)) {
            return true
        }
    }

    return false
}

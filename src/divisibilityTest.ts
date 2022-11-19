import { sieveOfEratosthenes } from './sieveOfErastosthenes'

const firstsPrimes = sieveOfEratosthenes(200_000)

export const divisibilityTest = (n: bigint) => {
    for (const prime of firstsPrimes) {
        // check if is divisible
        if (n % BigInt(prime) == BigInt(0)) {
            return false
        }
    }

    return true
}

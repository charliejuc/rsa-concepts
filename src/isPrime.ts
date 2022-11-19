import { divisibilityTest } from './divisibilityTest'
import { millerRabinPrimalityTest } from './millerRabinTest'

export const isPrime = (n: bigint, iterations: number) => {
    // excluded corner cases

    if (!divisibilityTest(n)) {
        return false
    }

    let s = BigInt(0)
    let d = n - BigInt(1) // coprime of n
    // return when find an odd divisor of d
    while ((d & BigInt(1)) == BigInt(0)) {
        d = d >> BigInt(1)
        ++s
    }

    while (iterations > 0) {
        if (!millerRabinPrimalityTest(d, s, n)) {
            return false
        }

        --iterations
    }

    return true
}

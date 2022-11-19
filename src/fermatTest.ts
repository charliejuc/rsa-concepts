import { modularExponentiation } from './modularExponentiation'

export const fermatTest = (n: bigint) => {
    // excluded corner cases

    const a = BigInt(2)

    // Fermat's little theorem
    if (modularExponentiation(a, n - BigInt(1), n) != BigInt(1)) {
        return false
    }

    return true
}

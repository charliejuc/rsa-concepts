export const sieveOfEratosthenes = (n: number, options: { start: number } = { start: 0 }) => {
    const primesFlag: Record<number, number> = {}
    const first = 3
    const isNotPrime = 1

    primesFlag[0] = isNotPrime
    for (let i = first; i <= Math.sqrt(n); i += 2) {
        if (primesFlag[Math.floor(i / 2)] == isNotPrime) {
            continue
        }

        for (let j = i * i; j <= n; j += 2 * i) {
            primesFlag[Math.floor(j / 2)] = isNotPrime
        }
    }

    const start = options.start > first ? options.start : first
    const primes = options.start >= 3 ? [] : [2].filter((n) => n > options.start)
    for (let i = start; i <= n; i += 2) {
        if (primesFlag[Math.floor(i / 2)] != isNotPrime) {
            primes.push(i)
        }
    }

    return primes
}

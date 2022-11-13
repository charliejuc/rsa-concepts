const sieveOfEratosthenes = (n: number, options: { start: number } = { start: 0 }) => {
    const primesFlag: Record<number, number> = {}
    const first = 3
    const isNotPrime = 1

    primesFlag[0] = isNotPrime
    for (let i = first; i ** 2 <= n; i += 2) {
        if (primesFlag[Math.floor(i / 2)] === 1) {
            continue
        }

        for (let j = first * i; j <= n; j += 2 * i) {
            primesFlag[Math.floor(j / 2)] = isNotPrime
        }
    }

    const start = options.start > first ? options.start : first
    const primes = options.start > 3 ? [] : [2].filter((n) => n > options.start)
    for (let i = start; i <= n; i++) {
        if (i % 2 === 1 && primesFlag[Math.floor(i / 2)] !== isNotPrime) {
            primes.push(i)
        }
    }

    return primes
}

console.log(sieveOfEratosthenes(100002000, { start: 100001000 }))

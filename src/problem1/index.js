// three ways to sum to n

const n = 5

function sumToN1(n) {
    return n * (n + 1) / 2
}

function sumToN2(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0)
}

function sumToN3(n) {
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

console.log(sumToN1(n))
console.log(sumToN2(n))
console.log(sumToN3(n))


const Rx = require('rxjs')
console.log(Rx)

// 어레이부터 말들기 (from)
const deliveries = ['delivery1', 'delivery2', 'delivery3']

const stream = Rx.from(deliveries)

stream.subscribe({
    next: (data) => {
        console.log(data)
    },
    complete: () => {
        console.log('completed')
    },
    error: (err) => {}
})

// 프로미스부터 만들기 (from)
function makePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('delivery')
        }, 3000)
    })
}

Rx.from(makePromise).subscribe({
    next: (data) => {
        console.log(data)
    }
})

// 싱글 여러 데이터로부터 만들기 (of)
Rx.of('delivery1', '두번째 택배', '세번재 택배').subscribe({
    next: (data) => {
        console.log(data)
    }
})
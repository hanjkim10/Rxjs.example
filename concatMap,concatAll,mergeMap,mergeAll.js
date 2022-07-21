const Rx = require('rxjs')
const {take, tap, filter, map, reduce, concatMap, concatAll} = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4])

// concat map
function openBox(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, '상품 개봉')
            resolve(data)
        }, 5000
        )
    })
}

function checkBox(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, '상품 검사')
            resolve(data)
        }, 5000
        )
    })
}

function useProduct(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, '상품 사용')
            resolve(data)
        }, 5000
        )
    })
}

// 프로미스 변환
async function userTask(data) {
    await openBox(data)
    await checkBox(data)
    await useProduct(data)
}

stream.pipe(
    concatMap((data) => Rx.from(userTask(data)))
).subscribe()

// concatAll
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream3 = Rx.of(stream1, stream2)

stream3.pipe(
    concatAll()
).subscribe()

// mergeMap
stream.pipe(
    mergeMap(data => Rx.from(userTask(data)))
).subscribe()

// mergeAll
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream6 = Rx.of(stream4, stream5)

stream6.pipe(
    mergeAll()
).subscribe()
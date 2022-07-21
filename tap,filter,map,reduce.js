const Rx = require('rxjs')
const { take, tap, filter, map, reduce } = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4])

// tap
stream.pipe(
    tap(data => {
        console.log('read once', data)
    }),
    tap(data => {
        console.log('read twice', data)
    }),
    tap()
).subscribe({
    next: () => { }
})

// filter
stream.pipe(
    filter(data => data > 1),
    filter(data => data > 3)
).subscribe(console.log)

// map
stream.pipe(
    map(data => data * 2),
    map(data => data * 2)
).subscribe(console.log)

// reduce
stream.pipe(
    reduce((accu, data) => {
        return accu+data
    })
).subscribe(console.log)
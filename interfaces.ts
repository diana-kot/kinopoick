// function identity<T>(arg: T): T {
// 	return arg
// }

// const s: string = 'Hello'
// const n: number = 10

// const r1 = identity(s)
// const r2 = identity(n)

//state

// interface State<T> {
// 	loading: boolean
// 	error: Error | null
// 	data: T | null
// }

// interface User {
// 	id: number
// 	text: string
// }

// type UserState = State<User>

// const userState: UserState = {
// 	loading: false,
// 	error: null,
// 	data: {
// 		id: 1,
// 		text: 'Hello',
// 	},
// }

/////// generic random

// const getRandomElement = <T>(items: T[]): T => {
// 	const randomIndex = Math.floor(Math.random() * items.length)
// 	return items[randomIndex]
// }

// const el1 = getRandomElement([1, 2, 3, 4, 5])

/// generic object

// const merge = <T, U>(o1: T, o2: U): U & T => {
// 	return {
// 		...o1,
// 		...o2,
// 	}
// }

// const r33 = merge({ a: 1 }, { b: 2 })

//Promise generic
// const fetchFnc = async () => {
// 	return 2
// }

// const b = fetchFnc()

// type Obj = Record<string, number>

//ограничения generic

// const len = <T extends { length: any }>(coll: T): T => {
// 	return coll.length
// }

// const r7 = len([1, 2, 3])
// const r73 = len('Hello')
// // const r737 = len(4)

/////фнк возвращает св-во

// const getValue = <T extends object, U extends keyof T>(o: T, prop: U) => {
// 	return o[prop]
// }

// const ff = getValue(
// 	{
// 		name: 'Max',
// 	},
// 	'name'
// )

/////фнк возвращает ключ

// const getKey =<T extends object, U extends keyof T> (obj: T, value: T[U]): null | U {
// 	const key = (Object.keys(obj) as Array<U>).find(k=> obj[k] === value )
// 	return key || null
// }

// const jj = getKey({a: 1, n: 8}, 8)

// меняем свойство в объекте с ограничением возможного типа

// const patchFieled = <T extends object, U extends keyof T, V extends T[U]>(
// 	obj: T,
// 	filed: U,
// 	val: V
// ) => {}

// const g = patchFieled({ name: 'Max' }, 'name', 'Mike')

//компонент React.FC

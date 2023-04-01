export type shuffleValues<T> = {
		realId: number
		val: T
}
export const shuffleArray = <T>(source:T[]):shuffleValues<T>[] =>{
	const res: shuffleValues<T>[] =[]
	for (let i=0; i < source.length ; i++) {
		// get random from 0 to i inclusive
		const j = Math.floor(Math.random() * (i+1))
		res[i] = {} as shuffleValues<T>
		// next two line for cases then j does not take some i values
		res[i].val = res[j].val
		res[i].realId = res[j].realId
		// set val and realId 
		res[j].val = source[i]
		res[j].realId = i
	}
	return res
}

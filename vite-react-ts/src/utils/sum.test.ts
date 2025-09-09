import { sum } from './sum'

describe('sum', () => {
    it('cộng 2 số bình thường', () => {
        expect(sum(2, 3)).toBe(5)
    })

    it('cộng với số âm', () => {
        expect(sum(2, -3)).toBe(-1)
    })
})
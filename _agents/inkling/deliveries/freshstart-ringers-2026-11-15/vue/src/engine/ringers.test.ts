import { describe, expect, it } from 'vitest'
import { playMatch } from './ringers'

describe('cardboard ringers engine', () => {
  it('is deterministic for a fixed seed', () => {
    expect(playMatch(2027)).toEqual(playMatch(2027))
  })

  it('produces 24 events and 6 player lines', () => {
    const r = playMatch(2027)
    expect(r.events).toHaveLength(24)
    expect(r.lines).toHaveLength(6)
  })

  it('declares a winner consistent with the score', () => {
    const r = playMatch(2027)
    if (r.score.AUR === r.score.BRB) {
      expect(r.winner === 'DRAW' || r.winner === 'AUR' || r.winner === 'BRB').toBe(true)
    } else {
      expect(r.winner).toBe(r.score.AUR > r.score.BRB ? 'AUR' : 'BRB')
    }
  })
})

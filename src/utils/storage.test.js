import { describe, it, expect } from 'vitest'
import { parseStoredObject } from './storage.js'

describe('parseStoredObject', () => {
  it('reads missing data as empty', () => {
    expect(parseStoredObject(null)).toEqual({})
  })

  it.each(['', '{not json', 'undefined'])('reads %j, which is not JSON, as empty', (text) => {
    expect(parseStoredObject(text)).toEqual({})
  })

  it.each(['null', '42', '"text"', 'true', '[1, 2]'])(
    'reads %s, which is JSON but not a record, as empty',
    (text) => {
      expect(parseStoredObject(text)).toEqual({})
    },
  )

  it('returns a valid record unchanged', () => {
    const record = { '2026-03-20': ['morning'], '2026-03-21': ['evening', 'sleep'] }

    expect(parseStoredObject(JSON.stringify(record))).toEqual(record)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNotes } from './useNotes'
import { MAX_PINNED_NOTES } from '@/constants/colors'

// ローカルストレージのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useNotes', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('初期状態では付箋が空であること', () => {
    const { result } = renderHook(() => useNotes())
    expect(result.current.notes).toHaveLength(0)
  })

  it('付箋を追加できること', () => {
    const { result } = renderHook(() => useNotes())
    act(() => { result.current.addNote('sunshine') })
    expect(result.current.notes).toHaveLength(1)
    expect(result.current.notes[0].color).toBe('sunshine')
  })

  it('付箋の内容を更新できること', () => {
    const { result } = renderHook(() => useNotes())
    let id: string
    act(() => { id = result.current.addNote() })
    act(() => { result.current.updateNote(id!, 'テストメモ') })
    expect(result.current.notes[0].content).toBe('テストメモ')
  })

  it('付箋を削除できること', () => {
    const { result } = renderHook(() => useNotes())
    let id: string
    act(() => { id = result.current.addNote() })
    act(() => { result.current.deleteNote(id!) })
    expect(result.current.notes).toHaveLength(0)
  })

  it('付箋の位置を更新できること', () => {
    const { result } = renderHook(() => useNotes())
    let id: string
    act(() => { id = result.current.addNote() })
    act(() => { result.current.updatePosition(id!, { x: 200, y: 300 }) })
    expect(result.current.notes[0].position).toEqual({ x: 200, y: 300 })
  })

  it('付箋をピン留めできること', () => {
    const { result } = renderHook(() => useNotes())
    let id: string
    act(() => { id = result.current.addNote() })
    act(() => { result.current.togglePin(id!, MAX_PINNED_NOTES) })
    expect(result.current.notes[0].isPinned).toBe(true)
  })

  it(`ピン留めは最大${MAX_PINNED_NOTES}枚まで`, () => {
    const { result } = renderHook(() => useNotes())
    const ids: string[] = []
    act(() => {
      for (let i = 0; i <= MAX_PINNED_NOTES; i++) {
        ids.push(result.current.addNote())
      }
    })
    act(() => {
      ids.forEach(id => result.current.togglePin(id, MAX_PINNED_NOTES))
    })
    const pinnedCount = result.current.notes.filter(n => n.isPinned).length
    expect(pinnedCount).toBe(MAX_PINNED_NOTES)
  })

  it('ローカルストレージに保存されること', () => {
    const { result } = renderHook(() => useNotes())
    act(() => { result.current.addNote('sky') })
    const stored = JSON.parse(localStorageMock.getItem('sticky_notes') ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].color).toBe('sky')
  })
})

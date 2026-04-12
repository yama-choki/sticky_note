import { useState, useEffect, useCallback } from 'react'
import type { Note, ColorValue } from '@/types/note'

// ローカルストレージのキー
const STORAGE_KEY = 'sticky_notes'

// 一意のIDを生成する
const generateId = (): string => {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [maxZIndex, setMaxZIndex] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: Note[] = JSON.parse(stored)
        return parsed.length > 0 ? Math.max(...parsed.map(n => n.zIndex)) : 0
      }
    } catch {
      // パース失敗時は0を返す
    }
    return 0
  })

  // ローカルストレージへの保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  // 付箋を追加する
  const addNote = useCallback((color: ColorValue = 'sunshine') => {
    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)

    // 少しランダムにずらして重ならないようにする
    const offset = notes.length * 20
    const newNote: Note = {
      id: generateId(),
      content: '',
      color,
      position: {
        x: Math.min(120 + offset, window.innerWidth - 320),
        y: Math.min(120 + offset, window.innerHeight - 250),
      },
      isPinned: false,
      zIndex: newZIndex,
      createdAt: Date.now(),
    }
    setNotes(prev => [...prev, newNote])
    return newNote.id
  }, [notes.length, maxZIndex])

  // 付箋の内容を更新する
  const updateNote = useCallback((id: string, content: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, content } : n))
  }, [])

  // 付箋の色を変更する
  const updateColor = useCallback((id: string, color: ColorValue) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, color } : n))
  }, [])

  // 付箋の位置を更新する
  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, position } : n))
  }, [])

  // 付箋を前面に移動する
  const bringToFront = useCallback((id: string) => {
    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)
    setNotes(prev => prev.map(n => n.id === id ? { ...n, zIndex: newZIndex } : n))
  }, [maxZIndex])

  // 付箋を削除する
  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  // ピン留めを切り替える（最大3枚まで）
  const togglePin = useCallback((id: string, maxPinned: number) => {
    setNotes(prev => {
      const note = prev.find(n => n.id === id)
      if (!note) return prev

      if (!note.isPinned) {
        const pinnedCount = prev.filter(n => n.isPinned).length
        if (pinnedCount >= maxPinned) return prev // 上限に達している
      }

      return prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n)
    })
  }, [])

  return { notes, addNote, updateNote, updateColor, updatePosition, bringToFront, deleteNote, togglePin }
}

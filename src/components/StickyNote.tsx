import { useState, useRef, useCallback, useEffect } from 'react'
import { Pin, Trash2, Palette } from 'lucide-react'
import type { Note } from '@/types/note'
import { COLORS, MAX_PINNED_NOTES } from '@/constants/colors'
import { ColorPicker } from './ColorPicker'
import { cn } from '@/lib/utils'

// 付箋コンポーネントのプロパティ
interface StickyNoteProps {
  note: Note
  pinnedCount: number
  onUpdate: (id: string, content: string) => void
  onUpdateColor: (id: string, color: Note['color']) => void
  onUpdatePosition: (id: string, pos: { x: number; y: number }) => void
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string, max: number) => void
}

// ドラッグ状態の型
interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  startNoteX: number
  startNoteY: number
}

// 個別の付箋コンポーネント
export function StickyNote({
  note,
  pinnedCount,
  onUpdate,
  onUpdateColor,
  onUpdatePosition,
  onBringToFront,
  onDelete,
  onTogglePin,
}: StickyNoteProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startNoteX: 0,
    startNoteY: 0,
  })
  const noteRef = useRef<HTMLDivElement>(null)

  const colorConfig = COLORS.find(c => c.value === note.color) ?? COLORS[0]
  const canPin = !note.isPinned && pinnedCount >= MAX_PINNED_NOTES

  // ドラッグ開始（マウス）
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, textarea')) return
    e.preventDefault()
    onBringToFront(note.id)
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startNoteX: note.position.x,
      startNoteY: note.position.y,
    }
    setIsDragging(true)
  }, [note.id, note.position, onBringToFront])

  // ドラッグ開始（タッチ）
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, textarea')) return
    const touch = e.touches[0]
    onBringToFront(note.id)
    dragRef.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      startNoteX: note.position.x,
      startNoteY: note.position.y,
    }
    setIsDragging(true)
  }, [note.id, note.position, onBringToFront])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      const newX = Math.max(0, dragRef.current.startNoteX + dx)
      const newY = Math.max(0, dragRef.current.startNoteY + dy)
      onUpdatePosition(note.id, { x: newX, y: newY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDragging) return
      e.preventDefault()
      const touch = e.touches[0]
      const dx = touch.clientX - dragRef.current.startX
      const dy = touch.clientY - dragRef.current.startY
      const newX = Math.max(0, dragRef.current.startNoteX + dx)
      const newY = Math.max(0, dragRef.current.startNoteY + dy)
      onUpdatePosition(note.id, { x: newX, y: newY })
    }

    const handleDragEnd = () => {
      if (!dragRef.current.isDragging) return
      dragRef.current.isDragging = false
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleDragEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [note.id, onUpdatePosition])

  return (
    <div
      ref={noteRef}
      data-testid="sticky-note"
      className={cn(
        'absolute w-72 min-h-44 rounded-2xl border backdrop-blur-sm',
        'transition-shadow duration-200 ease-out',
        colorConfig.class,
        isDragging ? 'cursor-grabbing shadow-2xl scale-105' : 'cursor-grab shadow-lg hover:shadow-xl hover:scale-[1.02]',
        note.isPinned && 'ring-2 ring-offset-1',
      )}
      style={{
        left: note.position.x,
        top: note.position.y,
        zIndex: note.zIndex,
        boxShadow: isDragging
          ? `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px ${colorConfig.accent}33`
          : `0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px ${colorConfig.accent}22`,
        ...(note.isPinned ? { ringColor: colorConfig.accent } : {}),
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* ピン留めバッジ */}
      {note.isPinned && (
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: colorConfig.accent }}
        >
          <Pin className="w-3 h-3 text-white fill-white" />
        </div>
      )}

      {/* ヘッダー（ツールバー） */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1 gap-1">
        {/* カラーボタン */}
        <div className="relative">
          <button
            title="色を変更"
            className="group p-1.5 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-200 hover:scale-110 shadow-sm"
            onClick={() => setShowColorPicker(v => !v)}
          >
            <Palette className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>
          {showColorPicker && (
            <ColorPicker
              currentColor={note.color}
              onSelect={color => onUpdateColor(note.id, color)}
              onClose={() => setShowColorPicker(false)}
            />
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* ピン留めボタン */}
          <button
            title={note.isPinned ? 'ピン留めを解除' : canPin ? `ピン留めは最大${MAX_PINNED_NOTES}枚まで` : 'ピン留め'}
            className={cn(
              'group p-1.5 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-110 shadow-sm',
              note.isPinned
                ? 'bg-white/60 border-white/50 hover:bg-white/80'
                : canPin
                  ? 'bg-white/20 border-white/20 opacity-40 cursor-not-allowed'
                  : 'bg-white/40 hover:bg-white/60 border-white/30 hover:border-white/50'
            )}
            onClick={() => onTogglePin(note.id, MAX_PINNED_NOTES)}
            disabled={canPin}
          >
            <Pin
              className={cn(
                'w-3.5 h-3.5 transition-colors',
                note.isPinned ? 'text-gray-800 fill-gray-800' : 'text-gray-600 group-hover:text-gray-900'
              )}
            />
          </button>

          {/* 削除ボタン */}
          <button
            title="削除"
            className="group p-1.5 rounded-xl bg-white/40 hover:bg-red-100/80 backdrop-blur-sm border border-white/30 hover:border-red-200/50 transition-all duration-200 hover:scale-110 shadow-sm"
            onClick={() => onDelete(note.id)}
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* テキストエリア */}
      <textarea
        className="w-full px-4 pb-4 pt-1 bg-transparent resize-none text-gray-800 placeholder-gray-400/70 text-sm leading-relaxed focus:outline-none min-h-32"
        placeholder="メモを入力..."
        value={note.content}
        onChange={e => onUpdate(note.id, e.target.value)}
        rows={5}
        style={{ cursor: 'text' }}
      />
    </div>
  )
}

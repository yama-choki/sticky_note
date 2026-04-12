import { useCallback } from 'react'
import { useNotes } from '@/hooks/useNotes'
import { Header } from '@/components/Header'
import { StickyNote } from '@/components/StickyNote'
import { EmptyState } from '@/components/EmptyState'

// メインアプリコンポーネント
function App() {
  const {
    notes,
    addNote,
    updateNote,
    updateColor,
    updatePosition,
    bringToFront,
    deleteNote,
    togglePin,
  } = useNotes()

  const pinnedCount = notes.filter(n => n.isPinned).length

  const handleAddNote = useCallback(() => {
    addNote()
  }, [addNote])

  return (
    // ベースグラデーション背景
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden relative">
      {/* 装飾レイヤー */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <Header noteCount={notes.length} pinnedCount={pinnedCount} onAddNote={handleAddNote} />

      {/* キャンバス */}
      <main className="relative w-full" style={{ minHeight: '100vh', paddingTop: '64px' }}>
        {notes.length === 0 ? (
          <EmptyState onAddNote={handleAddNote} />
        ) : (
          notes.map(note => (
            <StickyNote
              key={note.id}
              note={note}
              pinnedCount={pinnedCount}
              onUpdate={updateNote}
              onUpdateColor={updateColor}
              onUpdatePosition={updatePosition}
              onBringToFront={bringToFront}
              onDelete={deleteNote}
              onTogglePin={togglePin}
            />
          ))
        )}
      </main>
    </div>
  )
}

export default App

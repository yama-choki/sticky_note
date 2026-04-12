import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StickyNote } from './StickyNote'
import type { Note } from '@/types/note'

// テスト用のサンプル付箋データ
const mockNote: Note = {
  id: 'test-1',
  content: 'テストメモ',
  color: 'sunshine',
  position: { x: 100, y: 100 },
  isPinned: false,
  zIndex: 1,
  createdAt: Date.now(),
}

const defaultProps = {
  note: mockNote,
  pinnedCount: 0,
  onUpdate: vi.fn(),
  onUpdateColor: vi.fn(),
  onUpdatePosition: vi.fn(),
  onBringToFront: vi.fn(),
  onDelete: vi.fn(),
  onTogglePin: vi.fn(),
}

describe('StickyNote', () => {
  it('メモの内容が表示されること', () => {
    render(<StickyNote {...defaultProps} />)
    expect(screen.getByDisplayValue('テストメモ')).toBeInTheDocument()
  })

  it('削除ボタンをクリックするとonDeleteが呼ばれること', () => {
    render(<StickyNote {...defaultProps} />)
    fireEvent.click(screen.getByTitle('削除'))
    expect(defaultProps.onDelete).toHaveBeenCalledWith('test-1')
  })

  it('ピン留めボタンをクリックするとonTogglePinが呼ばれること', () => {
    render(<StickyNote {...defaultProps} />)
    fireEvent.click(screen.getByTitle('ピン留め'))
    expect(defaultProps.onTogglePin).toHaveBeenCalledWith('test-1', 3)
  })

  it('テキストを編集するとonUpdateが呼ばれること', () => {
    render(<StickyNote {...defaultProps} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: '新しいメモ' } })
    expect(defaultProps.onUpdate).toHaveBeenCalledWith('test-1', '新しいメモ')
  })

  it('ピン留め上限時はピン留めボタンが無効化されること', () => {
    render(<StickyNote {...defaultProps} pinnedCount={3} />)
    const pinBtn = screen.getByTitle(`ピン留めは最大3枚まで`)
    expect(pinBtn).toBeDisabled()
  })
})

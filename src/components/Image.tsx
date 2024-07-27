import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'

import { IImageGallery } from '../types/global.types'
import Checkbox from './ui/Icons/Checkbox'
import EmptyCheckbox from './ui/Icons/EmptyCheckbox'

interface IImage extends IImageGallery {
  className?: string
  onClick?: (id: string | number) => void
}

export const Image = ({
  id,
  url,
  isSelected,
  onClick,
  className = '',
}: IImage) => {
  const {
    index,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
    gridRow: index === 0 ? 'span 2' : 'span 1',
    gridColumn: index === 0 ? 'span 2' : 'span 1',
    transformOrigin: '0 0',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={twMerge(
        'group relative z-0 aspect-square overflow-hidden rounded-lg border border-gray-300 object-cover',
        className,
      )}
    >
      <button
        {...listeners}
        {...attributes}
        className={twMerge(
          'absolute inset-0 z-50 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-40',
          isSelected && '!opacity-0',
        )}
      />
      <button
        className={twMerge(
          'absolute left-2 top-2 z-50 transition-opacity duration-500',
          'group-hover:opacity-100',
          isSelected ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClick && (() => onClick(id))}
      >
        {isSelected ? <Checkbox color="black" /> : <EmptyCheckbox />}
      </button>
      <div
        className={twMerge(
          'flex h-full items-center justify-center',
          isSelected && 'opacity-60',
        )}
      >
        <img src={url} alt={url} className="block h-full w-full object-cover" />
      </div>
    </div>
  )
}

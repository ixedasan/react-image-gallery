import { useSortable } from '@dnd-kit/sortable'

import { IImageGallery } from '../types/global.types'

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

  return (
    <div>
      <img src={url} alt="" />
    </div>
  )
}

import { twMerge } from 'tailwind-merge'

import { IImageGallery } from '../types/global.types'

interface IOverlay extends Partial<IImageGallery> {
  className?: string
  onClick?: (id: string | number) => void
}

export const Overlay = ({ url, className = '' }: IOverlay) => {
  return (
    <div
      className={twMerge(
        'flex h-full items-center justify-center overflow-hidden rounded-lg border border-gray-300',
        className,
      )}
    >
      <img
        src={url || './images/image-1.webp'}
        alt={url || 'Default image'}
        className="block h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

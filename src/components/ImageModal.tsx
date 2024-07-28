import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface IImageModal {
  open: boolean
  handleClose: () => void
  children: ReactNode
  modalId: string
}

export const ImageModal = ({
  open,
  handleClose,
  children,
  modalId,
}: IImageModal) => {
  if (!open) return null

  return createPortal(
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
      )}
      onClick={handleClose}
    >
      <div
        className={twMerge(
          'relative rounded-lg bg-white shadow-lg',
          'max-h-[95vh] w-[680px] max-w-[95vw] overflow-auto',
        )}
        id={modalId}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

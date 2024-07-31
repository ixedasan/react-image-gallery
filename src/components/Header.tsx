import { IImageGallery } from '../types/global.types'
import Checkbox from './ui/Icons/Checkbox'

interface IHeader {
  onDelete: (selectedItems: IImageGallery[]) => void
  data: IImageGallery[]
}

export const Header = ({ onDelete, data }: IHeader) => {
  const selectedItems = data.filter(item => item.isSelected)
  const selectedCount = selectedItems.length

  return (
    <div className="flex items-center justify-between gap-4 p-5">
      {selectedCount > 0 ? (
        <>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 md:text-2xl">
            <Checkbox color="black" />
            <span>
              {selectedCount}{' '}
              {selectedCount > 1 ? 'Files Selected' : 'File Selected'}
            </span>
          </h2>
          <button
            className="text-base font-semibold text-red-500 hover:underline md:text-lg"
            onClick={() => onDelete(selectedItems)}
          >
            Delete {selectedCount > 1 ? 'Files' : 'File'}
          </button>
        </>
      ) : (
        <p className="text-2xl font-semibold text-gray-800">Gallery</p>
      )}
    </div>
  )
}

import { useState } from 'react'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'

import { IImageGallery } from '../types/global.types'
import { ImageModal } from './ImageModal'
import Close from './ui/Icons/Close'
import ImageIcon from './ui/Icons/ImageIcon'

interface IAddImageCard {
  setData: React.Dispatch<React.SetStateAction<IImageGallery[]>>
}

export const AddImageCard = ({ setData }: IAddImageCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const imageUrl = event.currentTarget['image-url'].value
    const imageFiles = event.currentTarget['image-files'].files

    if (imageFiles.length > 0) {
      Array.from(imageFiles).forEach(imageFile => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setData(prev => [
            ...prev,
            {
              id: nanoid(),
              url: reader.result as string,
              isSelected: false,
            },
          ])
        }
        reader.readAsDataURL(imageFile as Blob)
      })
    } else if (imageUrl) {
      setData(prev => [
        ...prev,
        {
          id: nanoid(),
          url: imageUrl,
          isSelected: false,
        },
      ])
    }

    setIsModalOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={twMerge(
          'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 transition-colors duration-500 hover:bg-gray-100',
        )}
      >
        <ImageIcon />
        <p className="whitespace-nowrap text-xs font-semibold md:text-base">
          Add Images
        </p>
      </button>
      <ImageModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        modalId="addImageModal"
      >
        <form
          className="relative max-h-[95vh] w-[680px] max-w-[95vw] rounded bg-neutral-50 p-6"
          onSubmit={handleImageSubmit}
        >
          <Close
            onClick={() => setIsModalOpen(false)}
            width={31}
            className="absolute right-4 top-4 cursor-pointer text-gray-600 transition-all hover:text-black"
          />
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Add New Image
          </h2>
          <input
            type="url"
            name="image-url"
            className="w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="https://example.com/image.png"
          />
          <p className="my-2 text-center font-semibold">or</p>
          <input
            type="file"
            name="image-files"
            accept="image/*"
            multiple
            className="w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded bg-gray-700 px-8 py-2.5 text-white transition-colors hover:bg-black"
            >
              Add Images
            </button>
          </div>
        </form>
      </ImageModal>
    </>
  )
}

import { useState } from 'react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import { Image } from './components/Image'
import { initialImageData } from './data/data'
import { IImageGallery } from './types/global.types'

function App() {
  const [data, setData] = useState<IImageGallery[]>(initialImageData)
  const [activeItem, setActiveItem] = useState<IImageGallery | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const currentItem = data.find(item => item.id === event.active.id)
    setActiveItem(currentItem || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null)
    const { active, over } = event

    if (over && active.id !== over.id) {
      setData(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSelectImage = (id: string | number) => {
    setData(items =>
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isSelected: !item.isSelected,
          }
        }
        return item
      }),
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="my-8 grid max-w-5xl divide-y rounded-lg bg-white shadow">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-5">
              <SortableContext items={data} strategy={rectSortingStrategy}>
                {data.map(item => (
                  <Image
                    key={item.id}
                    id={item.id}
                    url={item.url}
                    isSelected={item.isSelected}
                    onClick={handleSelectImage}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default App

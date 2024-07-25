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
                {data.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative flex h-32 w-full cursor-move items-center justify-center rounded-lg bg-gray-200 ${activeItem?.id === item.id ? 'bg-blue-200' : ''}`}
                  >
                    <img
                      src={item.url}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
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

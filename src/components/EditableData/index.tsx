import React from 'react';
import { getID } from '../../helper.js';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import Editor from './components/Editor/index.tsx';

export interface EditableDataItemType {
  id: number;
  content: string;
}

export default function EditableData() {
  const [canvasItem, setCanvasItem] = React.useState<EditableDataItemType[]>([{
    id: 1,
    content: '<h2>you can start from here</h2>'
  }]);

  function addCanvasItem(tag: string, index: number) {
    canvasItem.splice(index + 1, 0, { id: getID(), content: `<${tag}></${tag}>` })
    setCanvasItem([...canvasItem,]);
  }

  function updateCanvasItem(content: string, index: number) {
    canvasItem[index].content = content
    setCanvasItem([...canvasItem])

  }
  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const [removed] = canvasItem.splice(result.source.index, 1);
    canvasItem.splice(result.destination.index, 0, removed);
    setCanvasItem([...canvasItem])
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1" direction="vertical" >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >

              {canvasItem.map(({ content, id }, index) =>
                <Draggable draggableId={`${id}`} key={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}

                    >
                      <Editor
                        dragHandleProps={provided.dragHandleProps}
                        content={content}
                        key={index}
                        index={index}
                        onAdd={addCanvasItem}
                        onUpdate={updateCanvasItem}
                      />
                    </div>
                  )}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

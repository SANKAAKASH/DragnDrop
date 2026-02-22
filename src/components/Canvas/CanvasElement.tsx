import { Rnd } from 'react-rnd';
import { useDesignerStore } from '../../store/designerStore';
import type { DesignerElement } from '../../types/designer';
import { ElementRenderer } from './ElementRenderer';

interface CanvasElementProps {
  element: DesignerElement;
  zoom: number;
}

export function CanvasElement({ element, zoom }: CanvasElementProps) {
  const { selectedElementId, selectElement, updateElement } = useDesignerStore();
  const isSelected = selectedElementId === element.id;

  return (
    <Rnd
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      bounds="parent"
      scale={zoom}
      onDragStop={(_, data) => updateElement(element.id, { x: data.x, y: data.y })}
      onResizeStop={(_, __, ref, ___, position) => {
        updateElement(element.id, {
          x: position.x,
          y: position.y,
          width: Number(ref.style.width.replace('px', '')),
          height: Number(ref.style.height.replace('px', '')),
        });
      }}
      onMouseDown={() => selectElement(element.id)}
      className={isSelected ? 'canvas-element selected' : 'canvas-element'}
    >
      <ElementRenderer element={element} />
    </Rnd>
  );
}

import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CanvasElement } from './CanvasElement';
import { useDesignerStore } from '../../store/designerStore';
import type { DesignerElementType } from '../../types/designer';

interface CanvasProps {
  zoom: number;
}

interface ToolboxDragItem {
  elementType: DesignerElementType;
}

export function Canvas({ zoom }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { elements, addElement, selectElement, snapToGrid, gridSize } = useDesignerStore();

  const [, dropRef] = useDrop(
    () => ({
      accept: 'TOOLBOX_ELEMENT',
      drop: (item: ToolboxDragItem, monitor) => {
        const canvas = canvasRef.current;
        const clientOffset = monitor.getClientOffset();

        if (!canvas || !clientOffset) {
          return;
        }

        const bounds = canvas.getBoundingClientRect();
        const x = (clientOffset.x - bounds.left) / zoom;
        const y = (clientOffset.y - bounds.top) / zoom;
        addElement(item.elementType, x, y);
      },
    }),
    [addElement, zoom],
  );

  return (
    <div className="canvas-wrapper">
      <div className="canvas-toolbar">Drop elements here • Click to select • Drag to move • Resize handles enabled</div>
      <div
        ref={(node) => {
          canvasRef.current = node;
          dropRef(node);
        }}
        className="designer-canvas"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          backgroundSize: snapToGrid ? `${gridSize}px ${gridSize}px` : 'none',
        }}
        onMouseDown={() => selectElement(null)}
      >
        {elements.map((element) => (
          <CanvasElement key={element.id} element={element} zoom={zoom} />
        ))}
      </div>
    </div>
  );
}

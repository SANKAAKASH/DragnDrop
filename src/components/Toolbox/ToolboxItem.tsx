import { useDrag } from 'react-dnd';
import type { DesignerElementType } from '../../types/designer';

interface ToolboxItemProps {
  type: DesignerElementType;
  label: string;
}

export function ToolboxItem({ type, label }: ToolboxItemProps) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'TOOLBOX_ELEMENT',
      item: { elementType: type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [type],
  );

  return (
    <button
      ref={dragRef}
      className="toolbox-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      type="button"
    >
      {label}
    </button>
  );
}

import type { DesignerElement } from '../../types/designer';

interface ElementRendererProps {
  element: DesignerElement;
}

export function ElementRenderer({ element }: ElementRendererProps) {
  if (element.type === 'text') {
    return <div style={element.style}>{element.value}</div>;
  }

  if (element.type === 'barcode') {
    return (
      <div className="barcode-placeholder">
        <div className="barcode-bars" />
        <span>{element.value}</span>
      </div>
    );
  }

  return <div className="image-placeholder">🖼 {element.value}</div>;
}

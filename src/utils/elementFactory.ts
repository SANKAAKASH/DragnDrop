import type { DesignerElement, DesignerElementType } from '../types/designer';

const defaultsByType: Record<DesignerElementType, Pick<DesignerElement, 'width' | 'height' | 'value'>> = {
  text: { width: 140, height: 40, value: 'Sample Text' },
  barcode: { width: 180, height: 70, value: '123456789012' },
  image: { width: 120, height: 90, value: 'Image Placeholder' },
};

export function createElement(type: DesignerElementType, x: number, y: number): DesignerElement {
  const defaults = defaultsByType[type];
  return {
    id: crypto.randomUUID(),
    type,
    x,
    y,
    width: defaults.width,
    height: defaults.height,
    value: defaults.value,
    style: { fontSize: 14, color: '#111827' },
  };
}

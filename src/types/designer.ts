export type DesignerElementType = 'text' | 'barcode' | 'image';

export interface DesignerElementStyle {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export interface DesignerElement {
  id: string;
  type: DesignerElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  style: DesignerElementStyle;
}

export interface CanvasSettings {
  zoom: number;
  snapToGrid: boolean;
  gridSize: number;
}

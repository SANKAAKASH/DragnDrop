import { create } from 'zustand';
import { createElement } from '../utils/elementFactory';
import type { DesignerElement, DesignerElementType } from '../types/designer';

interface DesignerState {
  elements: DesignerElement[];
  selectedElementId: string | null;
  zoom: number;
  snapToGrid: boolean;
  gridSize: number;
  addElement: (type: DesignerElementType, x: number, y: number) => void;
  updateElement: (id: string, updates: Partial<DesignerElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  toggleGridSnap: () => void;
  exportToJSON: () => string;
  loadFromJSON: (serialized: string) => void;
  exportToZPL: () => string;
}

function applyGrid(value: number, gridSize: number, snap: boolean): number {
  return snap ? Math.round(value / gridSize) * gridSize : value;
}

export const useDesignerStore = create<DesignerState>((set, get) => ({
  elements: [],
  selectedElementId: null,
  zoom: 1,
  snapToGrid: false,
  gridSize: 10,

  addElement: (type, x, y) =>
    set((state) => ({
      elements: [...state.elements, createElement(type, x, y)],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((element) => {
        if (element.id !== id) return element;

        const nextX = updates.x ?? element.x;
        const nextY = updates.y ?? element.y;
        const nextWidth = updates.width ?? element.width;
        const nextHeight = updates.height ?? element.height;

        return {
          ...element,
          ...updates,
          x: applyGrid(nextX, state.gridSize, state.snapToGrid),
          y: applyGrid(nextY, state.gridSize, state.snapToGrid),
          width: Math.max(20, applyGrid(nextWidth, state.gridSize, state.snapToGrid)),
          height: Math.max(20, applyGrid(nextHeight, state.gridSize, state.snapToGrid)),
        };
      }),
    })),

  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),

  selectElement: (id) => set({ selectedElementId: id }),

  setZoom: (zoom) => set({ zoom: Math.min(2, Math.max(0.5, zoom)) }),

  toggleGridSnap: () => set((state) => ({ snapToGrid: !state.snapToGrid })),

  exportToJSON: () => JSON.stringify({ elements: get().elements }, null, 2),

  loadFromJSON: (serialized) => {
    try {
      const parsed = JSON.parse(serialized) as { elements?: DesignerElement[] };
      if (Array.isArray(parsed.elements)) {
        set({ elements: parsed.elements, selectedElementId: null });
      }
    } catch {
      // no-op: caller can add toast handling later
    }
  },

  exportToZPL: () => {
    const { elements } = get();
    const lines = ['^XA'];

    for (const element of elements) {
      if (element.type === 'text') {
        lines.push(`^FO${Math.round(element.x)},${Math.round(element.y)}^A0N,${Math.round(element.height)},${Math.round(element.width / 2)}^FD${element.value}^FS`);
      }
      if (element.type === 'barcode') {
        lines.push(`^FO${Math.round(element.x)},${Math.round(element.y)}^BY2^BCN,${Math.round(element.height)},Y,N,N^FD${element.value}^FS`);
      }
      if (element.type === 'image') {
        lines.push(`^FO${Math.round(element.x)},${Math.round(element.y)}^GB${Math.round(element.width)},${Math.round(element.height)},2^FS`);
      }
    }

    lines.push('^XZ');
    return lines.join('\n');
  },
}));

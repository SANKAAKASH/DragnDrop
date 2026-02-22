import { useDesignerStore } from '../../store/designerStore';

export function PropertiesPanel() {
  const { elements, selectedElementId, updateElement, deleteElement, loadFromJSON } = useDesignerStore();
  const selected = elements.find((element) => element.id === selectedElementId);

  if (!selected) {
    return (
      <div>
        <h3>Properties</h3>
        <p>Select an element to edit x, y, width, height, and value.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Properties</h3>
      <p>
        <strong>Type:</strong> {selected.type}
      </p>

      <label className="field-row">
        Value
        <input
          type="text"
          value={selected.value}
          onChange={(event) => updateElement(selected.id, { value: event.target.value })}
        />
      </label>

      <label className="field-row">
        X
        <input
          type="number"
          value={Math.round(selected.x)}
          onChange={(event) => updateElement(selected.id, { x: Number(event.target.value) })}
        />
      </label>

      <label className="field-row">
        Y
        <input
          type="number"
          value={Math.round(selected.y)}
          onChange={(event) => updateElement(selected.id, { y: Number(event.target.value) })}
        />
      </label>

      <label className="field-row">
        Width
        <input
          type="number"
          value={Math.round(selected.width)}
          onChange={(event) => updateElement(selected.id, { width: Number(event.target.value) })}
        />
      </label>

      <label className="field-row">
        Height
        <input
          type="number"
          value={Math.round(selected.height)}
          onChange={(event) => updateElement(selected.id, { height: Number(event.target.value) })}
        />
      </label>

      <button type="button" onClick={() => deleteElement(selected.id)}>
        Delete Element
      </button>

      <details>
        <summary>Load JSON Layout</summary>
        <textarea
          rows={8}
          placeholder='{"elements":[]}'
          onBlur={(event) => loadFromJSON(event.target.value)}
        />
      </details>
    </div>
  );
}

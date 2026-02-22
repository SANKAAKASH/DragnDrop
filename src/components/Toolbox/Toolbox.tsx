import { useMemo, useState } from 'react';
import { ToolboxItem } from './ToolboxItem';
import { useDesignerStore } from '../../store/designerStore';
import { buildLabelaryPreviewUrl } from '../../utils/labelary';

export function Toolbox() {
  const { zoom, setZoom, snapToGrid, toggleGridSnap, exportToJSON, exportToZPL } = useDesignerStore();

  const [dpmm, setDpmm] = useState(8);
  const [widthInches, setWidthInches] = useState(4);
  const [heightInches, setHeightInches] = useState(6);
  const [index, setIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');

  const zplOutput = exportToZPL();

  const items = useMemo(
    () => [
      { type: 'text' as const, label: 'Text' },
      { type: 'barcode' as const, label: 'Barcode' },
      { type: 'image' as const, label: 'Image' },
    ],
    [],
  );

  const handleGeneratePreview = () => {
    const url = buildLabelaryPreviewUrl(zplOutput, {
      dpmm,
      widthInches,
      heightInches,
      index,
    });
    setPreviewUrl(url);
  };

  return (
    <div>
      <h3>Toolbox</h3>
      <div className="toolbox-list">
        {items.map((item) => (
          <ToolboxItem key={item.type} type={item.type} label={item.label} />
        ))}
      </div>

      <h4>Canvas Settings</h4>
      <label className="field-row">
        Zoom
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
        />
      </label>
      <label className="field-row checkbox">
        <input type="checkbox" checked={snapToGrid} onChange={toggleGridSnap} />
        Snap to Grid
      </label>

      <h4>ZPL / Labelary Preview</h4>
      <div className="preview-config-grid">
        <label className="field-row">
          DPMM
          <input type="number" min={6} value={dpmm} onChange={(event) => setDpmm(Number(event.target.value))} />
        </label>
        <label className="field-row">
          Width (in)
          <input
            type="number"
            step={0.1}
            min={1}
            value={widthInches}
            onChange={(event) => setWidthInches(Number(event.target.value))}
          />
        </label>
        <label className="field-row">
          Height (in)
          <input
            type="number"
            step={0.1}
            min={1}
            value={heightInches}
            onChange={(event) => setHeightInches(Number(event.target.value))}
          />
        </label>
        <label className="field-row">
          Index
          <input type="number" min={0} value={index} onChange={(event) => setIndex(Number(event.target.value))} />
        </label>
      </div>

      <div className="preview-actions">
        <button type="button" onClick={handleGeneratePreview}>
          Preview Label (Generate URL)
        </button>
        {previewUrl ? (
          <a href={previewUrl} target="_blank" rel="noreferrer">
            Open Labelary Preview URL
          </a>
        ) : null}
      </div>

      {previewUrl ? <img className="preview-image" src={previewUrl} alt="Generated label preview" /> : null}

      <details>
        <summary>Generated Labelary URL</summary>
        <pre>{previewUrl || 'Click "Preview Label" to generate the API URL.'}</pre>
      </details>

      <h4>Export</h4>
      <details>
        <summary>JSON Layout</summary>
        <pre>{exportToJSON()}</pre>
      </details>
      <details>
        <summary>ZPL Output</summary>
        <pre>{zplOutput}</pre>
      </details>
    </div>
  );
}

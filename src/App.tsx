import { Canvas } from './components/Canvas/Canvas';
import { PropertiesPanel } from './components/Properties/PropertiesPanel';
import { Toolbox } from './components/Toolbox/Toolbox';
import { useDesignerStore } from './store/designerStore';

export function App() {
  const zoom = useDesignerStore((state) => state.zoom);

  return (
    <div className="app-shell">
      <header className="app-header">Enterprise Label Designer</header>
      <main className="app-layout">
        <aside className="panel panel-left">
          <Toolbox />
        </aside>
        <section className="panel panel-center">
          <Canvas zoom={zoom} />
        </section>
        <aside className="panel panel-right">
          <PropertiesPanel />
        </aside>
      </main>
    </div>
  );
}

import { useState } from "react";
import { PrepModule } from "@/components/prep-module";
import { HypeDocsModule } from "@/components/hype-docs-module";
import { ReflectionModule } from "@/components/reflection-module";

type ModuleType = 'prep' | 'hype' | 'reflection';

export default function Home() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('prep');

  const handleModuleSwitch = (module: ModuleType) => {
    setCurrentModule(module);
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" data-testid="logo">CareerSync</div>
            <nav className="nav-tabs">
              <button 
                className={`nav-tab ${currentModule === 'prep' ? 'active' : ''}`}
                onClick={() => handleModuleSwitch('prep')}
                data-testid="nav-tab-prep"
              >
                1:1 Prep
              </button>
              <button 
                className={`nav-tab ${currentModule === 'hype' ? 'active' : ''}`}
                onClick={() => handleModuleSwitch('hype')}
                data-testid="nav-tab-hype"
              >
                Hype Docs
              </button>
              <button 
                className={`nav-tab ${currentModule === 'reflection' ? 'active' : ''}`}
                onClick={() => handleModuleSwitch('reflection')}
                data-testid="nav-tab-reflection"
              >
                Reflection
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className={`module ${currentModule === 'prep' ? 'active' : ''}`} data-testid="prep-module">
            <PrepModule />
          </div>

          <div className={`module ${currentModule === 'hype' ? 'active' : ''}`} data-testid="hype-module">
            <HypeDocsModule />
          </div>

          <div className={`module ${currentModule === 'reflection' ? 'active' : ''}`} data-testid="reflection-module">
            <ReflectionModule />
          </div>
        </div>
      </main>
    </div>
  );
}

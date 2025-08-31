import { HypeDocsModule } from "@/components/hype-docs-module";

export default function HypePage() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" data-testid="logo">CareerSync</div>
            <nav className="nav-tabs">
              <a 
                className="nav-tab"
                href="/"
                data-testid="nav-tab-prep"
              >
                1:1 Prep
              </a>
              <a 
                className="nav-tab active"
                href="/hype"
                data-testid="nav-tab-hype"
              >
                Hype Docs
              </a>
              <a 
                className="nav-tab"
                href="/reflection"
                data-testid="nav-tab-reflection"
              >
                Reflection
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <HypeDocsModule />
        </div>
      </main>
    </div>
  );
}
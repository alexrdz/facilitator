export default function NotFound() {
  return (
    <div style={{ 
      minBlockSize: '100vh', 
      inlineSize: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--color-surface)'
    }}>
      <div className="card" style={{ maxInlineSize: '400px', marginInline: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBlockEnd: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '2rem', color: 'var(--color-error)' }}>⚠️</span>
          <h1>404 Page Not Found</h1>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Did you forget to add the page to the router?
        </p>
      </div>
    </div>
  );
}

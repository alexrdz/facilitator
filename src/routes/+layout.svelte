<script lang="ts">
        import '../app.css';
        
        let { children } = $props();
</script>

<div class="app-layout">
  <header class="header">
    <div class="container">
      <div class="header-content">
        <h1 class="logo">1:1 Career Companion</h1>
        <div class="header-actions">
          <button class="icon-button" aria-label="User Profile">
            👤
          </button>
          <button class="icon-button" aria-label="Settings">
            ⚙️
          </button>
        </div>
      </div>
    </div>
  </header>

  <main class="main-content">
    <div class="container">
      {@render children?.()}
    </div>
  </main>
</div>

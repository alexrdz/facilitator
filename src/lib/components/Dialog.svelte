<script lang="ts">
  // Props (runes)
  let {
    title = 'Example modal',
    open = $bindable(false),                 // two-way bindable
    preventBackdropClose = false,

    // callbacks (optional)
    onopenchange,
    onclose,
    onconfirm,
    oncancel,

    // snippet props (fallbacks below)
    header,
    children,
    footer
  } = $props<{
    title?: string;
    open?: boolean;
    preventBackdropClose?: boolean;
    onopenchange?: (open: boolean) => void;
    onclose?: (reason?: string) => void;
    onconfirm?: () => void;
    oncancel?: () => void;
    header?: () => any;
    children?: (args?: { close: (reason?: string) => void }) => any;
    footer?: (args?: { close: (reason?: string) => void }) => any;
  }>();

  // simple SSR-safe id
  let _id = 0; // instance-local
  const uid = `dlg-${++_id}`;

  let el: HTMLDialogElement;

  export function show() { open = true; }
  export function hide(reason?: string) { if (el?.open) el.close(reason); open = false; }

  function close(reason = 'close') {
    if (el?.open) el.close(reason);
  }

  // keep <dialog> synced with state
  $effect(() => {
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    onopenchange?.(open);
  });

  function handleClose() {
    const reason = el?.returnValue || 'close';
    if (reason === 'confirm') onconfirm?.();
    if (reason === 'cancel') oncancel?.();
    onclose?.(reason);
    open = false;
  }

  function handleCancel(e: Event) {
    if (preventBackdropClose) e.preventDefault();
    oncancel?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) {
      if (preventBackdropClose) return;
      close('cancel');
    }
  }
</script>

<dialog
  bind:this={el}
  aria-labelledby={uid + '-title'}
  aria-describedby={uid + '-desc'}
  on:close={handleClose}
  on:cancel={handleCancel}
  on:click={handleBackdropClick}
>
  {#if header}
    {@render header()}
  {:else}
    <div class="modal__header">
      <h2 id={uid + '-title'} class="modal__title">{title}</h2>
      <button class="icon-btn" aria-label="Close" on:click={() => close('cancel')}>✕</button>
    </div>
  {/if}

  <div id={uid + '-desc'} class="modal__body">
    {@render children?.({ close })}
  </div>

  {#if footer}
    {@render footer({ close })}
  {:else}
    <div class="modal__footer">
      <form method="dialog">
        <button type="button" class="btn btn-ghost btn-default" value="cancel">Cancel</button>
        <button type="submit" class="btn btn-primary btn-default" form="achievement-form">Confirm</button>
      </form>
    </div>
  {/if}
</dialog>

<style>
  :root { --radius: 14px; }

  dialog {
    border: none; border-radius: var(--radius); padding: 0;
    max-width: 32rem; width: 90vw;
    box-shadow: 0 20px 60px rgba(0,0,0,.25);
    font: 500 16px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  }
  dialog[open] { animation: pop .18s ease-out; }
  @keyframes pop { from { transform: translateY(6px); opacity: 0; } }

  dialog::backdrop {
    background: rgba(0,0,0,.55);
    backdrop-filter: blur(2px);
  }

  .modal__header {
    display:flex; align-items:center; justify-content:space-between;
    padding:1rem 1rem .5rem; border-bottom:1px solid #e5e7eb;
  }
  .modal__title { margin:0; font-size:1.125rem; }
  .modal__body { padding:1rem; }
  .modal__footer { display:flex; gap:.5rem; padding:.75rem 1rem 1rem; }

  .btn { border:1px solid #d1d5db; background:#fff; border-radius:10px; padding:.55rem .85rem; cursor:pointer; }
  .btn--primary { border-color:transparent; background:#111827; color:#fff; }
  .icon-btn { border:none; background:transparent; cursor:pointer; padding:.25rem; line-height:1; border-radius:8px; }
  .icon-btn:focus-visible, .btn:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
</style>

<script lang="ts">
	let { showModal = $bindable() } = $props();

	function handleClose() {
		showModal = false;
	}

	function handleKeydown(e: KeyboardEvent) {
    console.log(e);
		if (e.key === 'Escape') handleClose();
	}
</script>

{#if showModal}
	<div class="modal-backdrop" on:click={handleClose} on:keydown={handleKeydown}>
		<div class="modal-content" on:click={e => e.stopPropagation()}>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		background: var(--shell-bg);
		padding: var(--spacing-xl);
		border-radius: var(--border-radius-lg);
		max-width: 32rem;
		width: 90%;
	}

	:global(.modal__header) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-md);
		border-bottom: 1px solid var(--border-color);
	}

	:global(.modal__title) {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 500;
	}

	:global(.modal__body) {
		padding: var(--spacing-xl);
	}

	:global(.modal__footer) {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: flex-end;
		padding: var(--spacing-lg) var(--spacing-xl);
		border-top: 1px solid var(--border-color);
	}
</style>

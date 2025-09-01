<script lang="ts">
	type Props = {
		showModal: boolean;
		onclose?: () => void;
	};

	let { showModal, onclose }: Props = $props();

	function handleClose() {
		showModal = false;
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}

  $effect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

{#if showModal}
	<div class="modal-backdrop" on:click={handleClose}>
		<div class="modal-content" on:click|stopPropagation>
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
		background-color: rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(5px);
		z-index: 100;
	}

	.modal-content {
    --shadow-color: rgba(61, 71, 81, 0.1);
		--radius-lg: 2rem;
		--shadow-xl: 0 10px 30px var(--shadow-color);

		background-color: var(--shell-bg);
		padding: var(--spacing-xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		width: 90%;
		max-width: 500px;
	}
</style>

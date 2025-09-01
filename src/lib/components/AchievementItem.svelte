<script lang="ts">
	import type { Achievement } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	export let achievement: Achievement;

	const dispatch = createEventDispatcher();

	function handleEdit() {
		dispatch('edit', achievement);
	}

	function handleDelete() {
		dispatch('delete', achievement.id);
	}

	const categories = achievement.category ? achievement.category.split(',').map((category) => category.trim()) : [];
</script>

<div class="achievement-item">
	<div class="achievement-header">
		<div class="achievement-meta">
			<div class="achievement-date">{achievement.date}</div>
			<h3 class="achievement-title">{achievement.title}</h3>
		</div>
		<div class="achievement-actions">
			<button class="btn btn-ghost btn-small" on:click={handleEdit}>Edit</button>
			<button
				class="btn btn-ghost btn-small btn-danger"
				on:click={handleDelete}>Delete</button
			>
		</div>
	</div>

	<div class="achievement-section">
		{achievement.description}
	</div>

	<div class="achievement-categories">
		{#each categories as category}
			<span class="tag">{category}</span>
		{/each}
	</div>
</div>

<style>
	.achievement-item {
		background-color: var(--shell-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		padding: var(--spacing-lg);
		margin-bottom: var(--spacing-md);
		transition: box-shadow 0.2s ease;
	}

	.achievement-item:hover {
		box-shadow: var(--shadow-md);
	}

	.achievement-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-md);
	}

  .achievement-categories {
    display: flex;
    gap: var(--spacing-sm);
    margin-block-start: var(--spacing-md);
  }
</style>

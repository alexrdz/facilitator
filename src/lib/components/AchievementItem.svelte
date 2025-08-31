<script lang="ts">
	import type { Achievement } from '$lib/stores';

	export let achievement: Achievement;
	export let handleEdit: (achievement: Achievement) => void;
	export let handleDelete: (id: string) => void;
</script>

<div class="achievement-item">
	<div class="achievement-header">
		<div class="achievement-meta">
			<div class="achievement-date">{achievement.date}</div>
			<div class="achievement-title">{achievement.title}</div>
		</div>
		<div class="achievement-actions">
			<button class="btn btn-ghost btn-small" on:click={() => handleEdit(achievement)}>Edit</button>
			<button
				class="btn btn-ghost btn-small btn-danger"
				on:click={() => handleDelete(achievement.id)}>Delete</button
			>
		</div>
	</div>

	<div class="achievement-section">
		<strong>Description:</strong> {achievement.description}
	</div>
</div>

<style>
	.achievement-item {
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
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
</style>

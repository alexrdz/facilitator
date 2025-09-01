<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import AchievementForm from '$lib/components/AchievementForm.svelte';
	import AchievementItem from '$lib/components/AchievementItem.svelte';
	import { achievements, achievementActions, getTodayDate, type Achievement } from '$lib/stores';

	let showModal = $state(false);
	let editingAchievement = $state<Achievement | null>(null);

	function handleShowAddForm() {
		editingAchievement = null;
		showModal = true;
	}

	function handleEditAchievement(achievement: Achievement) {
		editingAchievement = achievement;
		showModal = true;
	}

	function handleDeleteAchievement(id: string) {
		if (confirm('Are you sure you want to delete this achievement?')) {
			achievementActions.delete(id);
		}
	}

	function handleCloseModal() {
		showModal = false;
	}
</script>

<div class="page-header">
	<div>
		<h1>Hype Docs</h1>
		<p>Your personal record of accomplishments and impact.</p>
	</div>
	<button class="btn btn-primary btn-default" onclick={() => showModal = true}>Add New</button>
</div>

<div class="achievements-list">
	{#if $achievements.length === 0}
		<div class="empty-state">
			<h3>No achievements yet</h3>
			<p>Start building your career narrative by adding your first accomplishment!</p>
		</div>
	{:else}
		{#each $achievements as achievement (achievement.id)}
			<AchievementItem
				{achievement}
				on:edit={() => handleEditAchievement(achievement)}
				on:delete={() => handleDeleteAchievement(achievement.id)}
			/>
		{/each}
	{/if}
</div>

<!-- <Modal bind:showModal>

</Modal> -->

<Dialog bind:open={showModal}>
  <div class="modal-header">
		<h2 class="modal-title">Add Achievement</h2>
	</div>
	<div class="modal-body">
		<form id="achievement-form">
			<AchievementForm bind:editingAchievement />
		</form>
	</div>
  {#snippet footer()}
	<!-- <form method="dialog" class="modal-footer">
		<button type="button" class="btn btn-ghost btn-default" value="cancel" onclick={handleCloseModal}>Cancel</button>
		<button type="submit" class="btn btn-primary btn-default" form="achievement-form">Save Achievement</button>
	</form> -->
  {/snippet}
</Dialog>

<style>
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-lg);
	}
	.modal-title {
		margin: 0;
		font-size: 1.25rem;
	}
</style>

<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import AchievementForm from '$lib/components/AchievementForm.svelte';
	import AchievementItem from '$lib/components/AchievementItem.svelte';
	import { achievements, achievementActions, getTodayDate, type Achievement } from '$lib/stores';
	console.log($achievements);

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
	<button class="btn btn-primary btn-default" on:click={handleShowAddForm}>Add New</button>
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

<Modal bind:showModal on:close={handleCloseModal}>
	<AchievementForm bind:editingAchievement handleClose={handleCloseModal} />
</Modal>

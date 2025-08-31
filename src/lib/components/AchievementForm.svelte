<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Achievement } from '$lib/stores';

	export let handleClose: () => void;
	export let editingAchievement: Achievement | null;

	let title = '';
	let category = '';
	let description = '';

	$: if (editingAchievement) {
		title = editingAchievement.title;
		category = 'Project Milestone'; // Placeholder logic
		description = `${editingAchievement.action} ${editingAchievement.context} ${editingAchievement.impact}`;
	} else {
		title = '';
		category = '';
		description = '';
	}
</script>

<h3>{editingAchievement ? 'Edit Hype Doc' : 'Create New Hype Doc'}</h3>
<form method="POST" action="?/save" use:enhance on:submit={handleClose}>
	<input type="hidden" name="id" value={editingAchievement?.id || ''} />

	<div class="form-group">
		<label class="form-label" for="title">Title</label>
		<input
			name="title"
			id="title"
			type="text"
			placeholder="e.g. Launched New Feature"
			bind:value={title}
		/>
	</div>
	<div class="form-group">
		<label class="form-label" for="category">Category</label>
		<input
			name="category"
			id="category"
			type="text"
			placeholder="e.g. Project Milestone"
			bind:value={category}
		/>
	</div>

	<div class="form-group">
		<label class="form-label" for="description">Description</label>
		<textarea
			name="description"
			id="description"
			placeholder="Describe your accomplishment and its impact."
			bind:value={description}
		></textarea>
	</div>

	<div class="form-actions">
		<button class="btn btn-ghost btn-default" on:click|preventDefault={handleClose}>
			Cancel
		</button>
		<button type="submit" class="btn btn-primary btn-default">Save</button>
	</div>
</form>

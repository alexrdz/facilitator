<script lang="ts">
	import { achievementActions, type Achievement } from '$lib/stores';

	type Props = {
		handleClose: () => void;
		editingAchievement: Achievement | null;
	};

	let { handleClose, editingAchievement }: Props = $props();

	let title = $state('');
	let category = $state('');
	let description = $state('');

	$effect(() => {
		if (editingAchievement) {
			title = editingAchievement.title;
			category = editingAchievement.category;
			description = editingAchievement.description;
		} else {
			title = '';
			category = '';
			description = '';
		}
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!title || !category || !description) {
			alert('Please fill in all fields.');
			return;
		}

		const achievementData = {
			title,
			date: new Date().toISOString().split('T')[0],
			description,
			category,
		};

		if (editingAchievement) {
			achievementActions.update(editingAchievement.id, achievementData);
		} else {
			achievementActions.add(achievementData);
		}

		handleClose();
	}
</script>

<h3>{editingAchievement ? 'Edit Hype Doc' : 'Create New Hype Doc'}</h3>
<form on:submit={handleSubmit}>
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
    <button type="submit" class="btn btn-primary btn-default">Save</button>
		<button class="btn btn-ghost btn-default" on:click|preventDefault={handleClose}>
			Cancel
		</button>
	</div>
</form>

<script lang="ts">
	import { reflections, reflectionActions, getTodayDate, type Reflection } from '$lib/stores';
	import { onMount } from 'svelte';
	
	let reflectionList: Reflection[] = [];
	let showAddForm = false;
	
	// Form state
	let date = '';
	let rating = 0;
	let takeaways = '';
	let feedback = '';
	let actionItems = '';

	onMount(() => {
		const unsubscribe = reflections.subscribe(value => {
			reflectionList = value;
		});
		return unsubscribe;
	});

	function handleShowReflectionForm() {
		clearForm();
		showAddForm = true;
		date = getTodayDate();
	}

	function handleCancelForm() {
		showAddForm = false;
		clearForm();
	}

	function clearForm() {
		date = '';
		rating = 0;
		takeaways = '';
		feedback = '';
		actionItems = '';
	}

	function handleSaveReflection() {
		if (!takeaways || rating === 0) {
			alert('Please provide a rating and key takeaways');
			return;
		}

		const reflectionData = {
			date,
			rating,
			takeaways,
			feedback: feedback || undefined,
			actionItems: actionItems || undefined,
		};

		reflectionActions.add(reflectionData);
		handleCancelForm();
	}

	function handleDeleteReflection(id: string) {
		if (confirm('Are you sure you want to delete this reflection?')) {
			reflectionActions.delete(id);
		}
	}

	function setRating(newRating: number) {
		rating = newRating;
	}
</script>

<!-- Navigation Back -->
<a href="/" class="nav-pill">
	<span class="icon">←</span>
	Back to Dashboard
</a>

<div class="card">
	<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg)">
		<h2>Meeting Reflections</h2>
		<button class="btn btn-primary" on:click={handleShowReflectionForm}>
			Add New Reflection
		</button>
	</div>

	{#if showAddForm}
		<div style="margin-bottom: var(--spacing-xl)">
			<h3>New Meeting Reflection</h3>
			
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl)">
				<div class="form-group">
					<label class="form-label" for="reflection-date">Meeting Date</label>
					<input 
						type="date" 
						class="form-input" 
						id="reflection-date"
						bind:value={date}
					/>
				</div>
				<div class="form-group">
					<label class="form-label">Meeting Rating</label>
					<div style="display: flex; gap: var(--spacing-sm); align-items: center">
						<div style="display: flex; gap: var(--spacing-xs)">
							{#each [1, 2, 3, 4, 5] as starRating}
								<span
									style="width: 24px; height: 24px; cursor: pointer; color: {starRating <= rating ? 'var(--color-warning)' : 'var(--color-border)'}; transition: color 0.2s ease; font-size: 24px; line-height: 1; user-select: none"
									on:click={() => setRating(starRating)}
									role="button"
									tabindex="0"
									on:keydown={(e) => e.key === 'Enter' && setRating(starRating)}
								>
									★
								</span>
							{/each}
						</div>
						<span style="color: var(--color-text-secondary)">
							{rating > 0 ? ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating] : 'Click to rate'}
						</span>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label class="form-label" for="key-takeaways">Key Takeaways</label>
				<textarea 
					class="form-textarea" 
					id="key-takeaways" 
					placeholder="Main points and decisions from the meeting..."
					bind:value={takeaways}
				></textarea>
			</div>

			<div class="form-group">
				<label class="form-label" for="manager-feedback">Manager Feedback</label>
				<textarea 
					class="form-textarea" 
					id="manager-feedback" 
					placeholder="Feedback received from your manager..."
					bind:value={feedback}
				></textarea>
			</div>

			<div class="form-group">
				<label class="form-label" for="action-items">Action Items</label>
				<textarea 
					class="form-textarea" 
					id="action-items" 
					placeholder="Follow-up tasks and commitments..."
					bind:value={actionItems}
				></textarea>
			</div>

			<div style="display: flex; gap: var(--spacing-md)">
				<button class="btn btn-primary" on:click={handleSaveReflection}>
					Save Reflection
				</button>
				<button class="btn btn-ghost" on:click={handleCancelForm}>
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<div>
		{#if reflectionList.length === 0}
			<div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary)">
				<h3>No reflections yet</h3>
				<p>Start tracking your 1:1 meetings by adding your first reflection!</p>
			</div>
		{:else}
			{#each reflectionList as reflection}
				<div class="achievement-item">
					<div class="achievement-header">
						<div>
							<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); font-weight: 500">{reflection.date}</div>
							<div style="font-weight: 600; margin-bottom: var(--spacing-sm)">
								Meeting Rating: {'★'.repeat(reflection.rating)}{'☆'.repeat(5 - reflection.rating)}
							</div>
						</div>
						<div style="display: flex; gap: var(--spacing-sm)">
							<button 
								class="btn btn-ghost" 
								style="padding: var(--spacing-sm) var(--spacing-md); font-size: var(--font-size-sm); color: var(--color-error)"
								on:click={() => handleDeleteReflection(reflection.id)}
							>
								Delete
							</button>
						</div>
					</div>
					<div style="margin-bottom: var(--spacing-sm)">
						<strong>Key Takeaways:</strong> {reflection.takeaways}
					</div>
					{#if reflection.feedback}
						<div style="margin-bottom: var(--spacing-sm)">
							<strong>Manager Feedback:</strong> {reflection.feedback}
						</div>
					{/if}
					{#if reflection.actionItems}
						<div>
							<strong>Action Items:</strong> {reflection.actionItems}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
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
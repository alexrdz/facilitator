<script lang="ts">
	import { achievements, prepAgendaActions, getTodayDate, type Achievement } from '$lib/stores';
	import { onMount } from 'svelte';
	
	let achievementList: Achievement[] = [];
	let selectedAchievements: string[] = [];
	let helpNeeded = '';
	let growthGoals = '';
	let managerQuestions = '';
	let additionalNotes = '';
	let showAgenda = false;

	onMount(() => {
		const unsubscribe = achievements.subscribe(value => {
			achievementList = value;
		});
		return unsubscribe;
	});

	function handleAchievementToggle(achievementId: string) {
		if (selectedAchievements.includes(achievementId)) {
			selectedAchievements = selectedAchievements.filter(id => id !== achievementId);
		} else {
			selectedAchievements = [...selectedAchievements, achievementId];
		}
	}

	function generateAgenda() {
		const agendaData = {
			date: getTodayDate(),
			selectedAchievements,
			helpNeeded: helpNeeded || undefined,
			growthGoals: growthGoals || undefined,
			managerQuestions: managerQuestions || undefined,
			additionalNotes: additionalNotes || undefined,
		};

		prepAgendaActions.add(agendaData);
		showAgenda = true;
	}

	function clearForm() {
		selectedAchievements = [];
		helpNeeded = '';
		growthGoals = '';
		managerQuestions = '';
		additionalNotes = '';
		showAgenda = false;
	}

	$: selectedAchievementData = achievementList.filter(achievement => 
		selectedAchievements.includes(achievement.id)
	);

	const today = new Date().toLocaleDateString('en-US', { 
		weekday: 'long', 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric' 
	});
</script>

<!-- Navigation Back -->
<a href="/" class="nav-pill">
	<span class="icon">←</span>
	Back to Dashboard
</a>

<div class="card">
	<h2>1:1 Meeting Preparation</h2>
	<p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-xl)">
		Prepare for your upcoming 1:1 by selecting accomplishments and adding discussion points.
	</p>

	<div style="margin-bottom: var(--spacing-xl)">
		<h3>Select Accomplishments to Discuss</h3>
		<div style="max-height: 300px; overflow-y: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--spacing-md); background-color: var(--color-surface)">
			{#if achievementList.length === 0}
				<div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary)">
					<p>No accomplishments added yet. Go to Hype Docs to add some!</p>
				</div>
			{:else}
				{#each achievementList as achievement}
					<div style="display: flex; align-items: flex-start; gap: var(--spacing-sm); padding: var(--spacing-sm); border-radius: var(--radius-sm); margin-bottom: var(--spacing-sm); cursor: pointer" class:hover-bg={true}>
						<input 
							type="checkbox" 
							id="achievement-{achievement.id}"
							checked={selectedAchievements.includes(achievement.id)}
							on:change={() => handleAchievementToggle(achievement.id)}
							style="margin-top: var(--spacing-xs)"
						/>
						<label for="achievement-{achievement.id}" style="cursor: pointer">
							<strong>{achievement.title}</strong><br />
							<small style="color: var(--color-text-secondary)">{achievement.date}</small>
						</label>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl)">
		<div class="form-group">
			<label class="form-label" for="help-needed">What I Need Help With</label>
			<textarea 
				class="form-textarea" 
				id="help-needed" 
				placeholder="Areas where you need guidance or support..."
				bind:value={helpNeeded}
			></textarea>
		</div>

		<div class="form-group">
			<label class="form-label" for="growth-goals">My Learning/Growth Goals</label>
			<textarea 
				class="form-textarea" 
				id="growth-goals" 
				placeholder="Skills you want to develop or goals you're working toward..."
				bind:value={growthGoals}
			></textarea>
		</div>

		<div class="form-group">
			<label class="form-label" for="manager-questions">Questions for My Manager</label>
			<textarea 
				class="form-textarea" 
				id="manager-questions" 
				placeholder="Specific questions you want to ask..."
				bind:value={managerQuestions}
			></textarea>
		</div>

		<div class="form-group">
			<label class="form-label" for="additional-notes">Additional Discussion Points</label>
			<textarea 
				class="form-textarea" 
				id="additional-notes" 
				placeholder="Other topics you want to discuss..."
				bind:value={additionalNotes}
			></textarea>
		</div>
	</div>

	<div style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-xl)">
		<button class="btn btn-primary" on:click={generateAgenda}>
			Generate Agenda
		</button>
		<button class="btn btn-ghost" on:click={clearForm}>
			Clear Form
		</button>
	</div>
</div>

{#if showAgenda}
	<div style="background-color: var(--color-background); padding: var(--spacing-2xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); margin-top: var(--spacing-xl)">
		<h2>1:1 Meeting Agenda - {today}</h2>
		
		{#if selectedAchievementData.length > 0}
			<h3>Recent Accomplishments</h3>
			{#each selectedAchievementData as achievement}
				<div style="margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-lg); border-bottom: 1px solid var(--color-border)">
					<h4>{achievement.title}</h4>
					<p><strong>What:</strong> {achievement.action}</p>
					<p><strong>Why:</strong> {achievement.context}</p>
					<p><strong>Impact:</strong> {achievement.impact}</p>
				</div>
			{/each}
		{/if}
		
		{#if helpNeeded}
			<h3>What I Need Help With</h3>
			<p>{helpNeeded}</p>
		{/if}
		
		{#if growthGoals}
			<h3>My Learning/Growth Goals</h3>
			<p>{growthGoals}</p>
		{/if}
		
		{#if managerQuestions}
			<h3>Questions for My Manager</h3>
			<p>{managerQuestions}</p>
		{/if}
		
		{#if additionalNotes}
			<h3>Additional Discussion Points</h3>
			<p>{additionalNotes}</p>
		{/if}
	</div>
{/if}

<style>
	.hover-bg:hover {
		background-color: var(--color-muted);
	}
</style>
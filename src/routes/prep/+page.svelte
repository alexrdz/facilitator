<script lang="ts">
  import {
    achievements,
    prepAgendaActions,
    getTodayDate,
    type Achievement,
  } from "$lib/stores";
  import { onMount } from "svelte";

  let achievementList: Achievement[] = [];
  let selectedAchievements: string[] = [];
  let helpNeeded = "";
  let growthGoals = "";
  let managerQuestions = "";
  let additionalNotes = "";
  let showAgenda = false;

  onMount(() => {
    const unsubscribe = achievements.subscribe((value) => {
      achievementList = value;
    });
    return unsubscribe;
  });

  function handleAchievementToggle(achievementId: string) {
    if (selectedAchievements.includes(achievementId)) {
      selectedAchievements = selectedAchievements.filter(
        (id) => id !== achievementId,
      );
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
    helpNeeded = "";
    growthGoals = "";
    managerQuestions = "";
    additionalNotes = "";
    showAgenda = false;
  }

  $: selectedAchievementData = achievementList.filter((achievement) =>
    selectedAchievements.includes(achievement.id),
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<!-- Navigation Back -->
<a href="/" class="nav-pill">
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    class="back-icon"
  >
    <path d="M19 12H5" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
  Back to Dashboard
</a>

<div class="card">
  <h2>1:1 Meeting Preparation</h2>
  <p class="page-description">
    Prepare for your upcoming 1:1 by selecting accomplishments and adding
    discussion points.
  </p>

  <section class="accomplishments-section">
    <h3>Select Accomplishments to Discuss</h3>
    <div class="accomplishments-container">
      {#if achievementList.length === 0}
        <div class="empty-state">
          <p>No accomplishments added yet. Go to Hype Docs to add some!</p>
        </div>
      {:else}
        {#each achievementList as achievement}
          <div class="accomplishment-item">
            <input
              type="checkbox"
              id="achievement-{achievement.id}"
              checked={selectedAchievements.includes(achievement.id)}
              on:change={() => handleAchievementToggle(achievement.id)}
              class="accomplishment-checkbox"
            />
            <label
              for="achievement-{achievement.id}"
              class="accomplishment-label"
            >
              <strong>{achievement.title}</strong><br />
              <small class="accomplishment-date">{achievement.date}</small>
            </label>
          </div>
        {/each}
      {/if}
    </div>
  </section>

  <div class="form-grid">
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
      <label class="form-label" for="growth-goals"
        >My Learning/Growth Goals</label
      >
      <textarea
        class="form-textarea"
        id="growth-goals"
        placeholder="Skills you want to develop or goals you're working toward..."
        bind:value={growthGoals}
      ></textarea>
    </div>

    <div class="form-group">
      <label class="form-label" for="manager-questions"
        >Questions for My Manager</label
      >
      <textarea
        class="form-textarea"
        id="manager-questions"
        placeholder="Specific questions you want to ask..."
        bind:value={managerQuestions}
      ></textarea>
    </div>

    <div class="form-group">
      <label class="form-label" for="additional-notes"
        >Additional Discussion Points</label
      >
      <textarea
        class="form-textarea"
        id="additional-notes"
        placeholder="Other topics you want to discuss..."
        bind:value={additionalNotes}
      ></textarea>
    </div>
  </div>

  <div class="form-actions">
    <button class="btn btn-primary" on:click={generateAgenda}>
      Generate Agenda
    </button>
    <button class="btn btn-ghost" on:click={clearForm}> Clear Form </button>
  </div>
</div>

{#if showAgenda}
  <section class="agenda-display">
    <h2>1:1 Meeting Agenda - {today}</h2>

    {#if selectedAchievementData.length > 0}
      <div class="agenda-section">
        <h3>Recent Accomplishments</h3>
        {#each selectedAchievementData as achievement}
          <div class="achievement-detail">
            <h4>{achievement.title}</h4>
            <p><strong>What:</strong> {achievement.description}</p>
            <p><strong>Why:</strong> {achievement.context}</p>
            <p><strong>Impact:</strong> {achievement.impact}</p>
          </div>
        {/each}
      </div>
    {/if}

    {#if helpNeeded}
      <div class="agenda-section">
        <h3>What I Need Help With</h3>
        <p>{helpNeeded}</p>
      </div>
    {/if}

    {#if growthGoals}
      <div class="agenda-section">
        <h3>My Learning/Growth Goals</h3>
        <p>{growthGoals}</p>
      </div>
    {/if}

    {#if managerQuestions}
      <div class="agenda-section">
        <h3>Questions for My Manager</h3>
        <p>{managerQuestions}</p>
      </div>
    {/if}

    {#if additionalNotes}
      <div class="agenda-section">
        <h3>Additional Discussion Points</h3>
        <p>{additionalNotes}</p>
      </div>
    {/if}
  </section>
{/if}

<style>
  .back-icon {
    margin-right: var(--spacing-xs);
  }

  .page-description {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  .accomplishments-section {
    margin-bottom: var(--spacing-xl);
  }

  .accomplishments-section h3 {
    margin-bottom: var(--spacing-md);
  }

  .accomplishments-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    background-color: var(--color-surface);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-text-secondary);
  }

  .accomplishment-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    margin-bottom: var(--spacing-sm);
    cursor: pointer;
  }

  .accomplishment-item:hover {
    background-color: var(--color-muted);
  }

  .accomplishment-checkbox {
    margin-top: var(--spacing-xs);
  }

  .accomplishment-label {
    cursor: pointer;
    flex: 1;
  }

  .accomplishment-date {
    color: var(--color-text-secondary);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }

  .form-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
  }

  .agenda-display {
    background-color: var(--color-background);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    margin-top: var(--spacing-xl);
  }

  .agenda-display h2 {
    margin-bottom: var(--spacing-xl);
  }

  .agenda-section {
    margin-bottom: var(--spacing-lg);
  }

  .agenda-section h3 {
    margin-bottom: var(--spacing-md);
    color: var(--color-primary);
  }

  .agenda-section p {
    margin-bottom: var(--spacing-sm);
    line-height: 1.6;
  }

  .achievement-detail {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
  }

  .achievement-detail:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .achievement-detail h4 {
    margin-bottom: var(--spacing-sm);
    color: var(--color-text);
  }

  .achievement-detail p {
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-secondary);
  }
</style>

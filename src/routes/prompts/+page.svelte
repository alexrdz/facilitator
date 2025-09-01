<script lang="ts">
  import {
    achievements,
    reflections,
    type Achievement,
    type Reflection,
  } from "$lib/stores";
  import { onMount } from "svelte";

  let achievementList: Achievement[] = [];
  let reflectionList: Reflection[] = [];
  let selectedAchievements: string[] = [];
  let selectedReflections: string[] = [];
  let generatedPrompt = "";
  let showPrompt = false;

  onMount(() => {
    const unsubAchievements = achievements.subscribe((value) => {
      achievementList = value;
    });
    const unsubReflections = reflections.subscribe((value) => {
      reflectionList = value;
    });
    return () => {
      unsubAchievements();
      unsubReflections();
    };
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

  function handleReflectionToggle(reflectionId: string) {
    if (selectedReflections.includes(reflectionId)) {
      selectedReflections = selectedReflections.filter(
        (id) => id !== reflectionId,
      );
    } else {
      selectedReflections = [...selectedReflections, reflectionId];
    }
  }

  function generatePrompt(type: "performance" | "bio" | "email") {
    const selectedAchievementData = achievementList.filter((achievement) =>
      selectedAchievements.includes(achievement.id),
    );
    const selectedReflectionData = reflectionList.filter((reflection) =>
      selectedReflections.includes(reflection.id),
    );

    let systemPrompt = "";
    let userData = "";

    // Build the user data section
    if (selectedAchievementData.length > 0) {
      userData += "\n## MY ACCOMPLISHMENTS:\n";
      selectedAchievementData.forEach((achievement, index) => {
        userData += `\n### Achievement ${index + 1}: ${achievement.title}\n`;
        userData += `**Date:** ${achievement.date}\n`;
        userData += `**What I Did:** ${achievement.action}\n`;
        userData += `**Context/Why:** ${achievement.context}\n`;
        userData += `**Impact/Results:** ${achievement.impact}\n`;
      });
    }

    if (selectedReflectionData.length > 0) {
      userData += "\n## MY MEETING REFLECTIONS:\n";
      selectedReflectionData.forEach((reflection, index) => {
        userData += `\n### Meeting ${index + 1} (${reflection.date})\n`;
        userData += `**Rating:** ${"★".repeat(reflection.rating)}${"☆".repeat(5 - reflection.rating)}\n`;
        userData += `**Key Takeaways:** ${reflection.takeaways}\n`;
        if (reflection.feedback) {
          userData += `**Manager Feedback:** ${reflection.feedback}\n`;
        }
        if (reflection.actionItems) {
          userData += `**Action Items:** ${reflection.actionItems}\n`;
        }
      });
    }

    // Generate appropriate system prompt based on type
    switch (type) {
      case "performance":
        systemPrompt = `Based on the provided information, draft a concise and impactful performance review summary for me.

The summary should:
- Highlight key accomplishments with specific examples and quantifiable impact
- Demonstrate growth and learning from meeting feedback
- Show alignment with company goals and values
- Be professional yet confident in tone
- Include specific metrics and outcomes where available
- Structure the content to flow logically from achievements to growth areas
- Be suitable for submission as part of a formal performance review process

Please organize the content into clear sections and ensure it presents a compelling case for my contributions and professional development.`;
        break;
      case "bio":
        systemPrompt = `Using my accomplishments and goals, write a professional bio for my LinkedIn profile.

The bio should:
- Be engaging and highlight my unique value proposition
- Include specific achievements and quantifiable results
- Showcase my expertise and technical skills
- Demonstrate career progression and growth mindset
- Be written in first person with a confident, approachable tone
- Be concise but comprehensive (aim for 2-3 paragraphs)
- Include relevant keywords for my field
- End with a call-to-action or contact invitation
- Appeal to potential employers, clients, or professional connections

Make it compelling and memorable while maintaining professionalism.`;
        break;
      case "email":
        systemPrompt = `Please help me draft a compelling email to my manager outlining my contributions and requesting a clear path to promotion.

The email should:
- Open with a clear, professional subject line suggestion
- Begin with appreciation and context
- Present my accomplishments in a compelling narrative
- Quantify impact and value delivered to the organization
- Reference positive feedback and growth demonstrated
- Make a clear, confident request for promotion discussion
- Suggest next steps (meeting, formal review, etc.)
- Maintain a professional, collaborative tone
- Be concise but thorough
- Show initiative and forward-thinking mindset

Structure it as a complete email ready to send, including suggested subject line.`;
        break;
    }

    generatedPrompt = systemPrompt + userData;
    showPrompt = true;

    // Auto-copy to clipboard
    navigator.clipboard.writeText(generatedPrompt).catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
  }

  function copyToClipboard() {
    navigator.clipboard
      .writeText(generatedPrompt)
      .then(() => {
        alert("Prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
        alert("Failed to copy to clipboard");
      });
  }

  function clearSelections() {
    selectedAchievements = [];
    selectedReflections = [];
    showPrompt = false;
    generatedPrompt = "";
  }
</script>

<div class="page-header">
  <div>
    <h1>Prompt Generation</h1>
    <p>
      Generate AI prompts using your accomplishments and meeting reflections.
    </p>
  </div>
</div>

<div class="selection-grid">
  <!-- Accomplishments Selection -->
  <section class="selection-section">
    <h3>Select Accomplishments</h3>
    <div class="selection-container">
      {#if achievementList.length === 0}
        <div class="empty-state">
          <p>
            No accomplishments found. <a href="/hype" class="link"
              >Add some Hype Docs</a
            > first!
          </p>
        </div>
      {:else}
        {#each achievementList as achievement}
          <div class="selection-item">
            <input
              type="checkbox"
              id="achievement-{achievement.id}"
              checked={selectedAchievements.includes(achievement.id)}
              on:change={() => handleAchievementToggle(achievement.id)}
              class="selection-checkbox"
            />
            <label for="achievement-{achievement.id}" class="selection-label">
              <strong>{achievement.title}</strong><br />
              <small class="item-date">{achievement.date}</small>
            </label>
          </div>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Reflections Selection -->
  <section class="selection-section">
    <h3>Select Meeting Reflections</h3>
    <div class="selection-container">
      {#if reflectionList.length === 0}
        <div class="empty-state">
          <p>
            No reflections found. <a href="/reflection" class="link"
              >Add some reflections</a
            > first!
          </p>
        </div>
      {:else}
        {#each reflectionList as reflection}
          <div class="selection-item">
            <input
              type="checkbox"
              id="reflection-{reflection.id}"
              checked={selectedReflections.includes(reflection.id)}
              on:change={() => handleReflectionToggle(reflection.id)}
              class="selection-checkbox"
            />
            <label for="reflection-{reflection.id}" class="selection-label">
              <strong>Meeting {reflection.date}</strong><br />
              <small class="item-rating">
                {"★".repeat(reflection.rating)}{"☆".repeat(
                  5 - reflection.rating,
                )}
              </small>
            </label>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</div>

<!-- Prompt Generation Buttons -->
<section class="generator-section">
  <h3>Generate Prompt</h3>
  <div class="generator-buttons">
    <button
      class="btn btn-primary btn-default"
      on:click={() => generatePrompt("performance")}
      disabled={selectedAchievements.length === 0 &&
        selectedReflections.length === 0}
    >
      Performance Review
    </button>
    <button
      class="btn btn-primary btn-default"
      on:click={() => generatePrompt("bio")}
      disabled={selectedAchievements.length === 0 &&
        selectedReflections.length === 0}
    >
      Professional Bio
    </button>
    <button
      class="btn btn-primary btn-default"
      on:click={() => generatePrompt("email")}
      disabled={selectedAchievements.length === 0 &&
        selectedReflections.length === 0}
    >
      Email to Manager
    </button>
    <button class="btn btn-ghost btn-default" on:click={clearSelections}>
      Clear All
    </button>
  </div>
</section>

<!-- Generated Prompt Display -->
{#if showPrompt}
  <section class="prompt-display">
    <header class="prompt-header">
      <h3>Generated Prompt</h3>
      <button class="btn btn-ghost btn-default" on:click={copyToClipboard}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="copy-icon"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy to Clipboard
      </button>
    </header>
    <div class="prompt-content">
      {generatedPrompt}
    </div>
    <div class="prompt-success">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="copy-icon"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      Prompt automatically copied to clipboard
    </div>
  </section>
{/if}

<style>
  .selection-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-md);
  }

  .selection-section h3 {
    margin-bottom: var(--spacing-md);
  }

  .selection-container {
    max-block-size: 40vh;
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

  .link {
    color: var(--color-primary);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .selection-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    margin-bottom: var(--spacing-sm);
    cursor: pointer;
  }

  .selection-item:hover {
    background-color: var(--color-muted);
  }

  .selection-checkbox {
    margin-top: var(--spacing-xs);
  }

  .selection-label {
    cursor: pointer;
    flex: 1;
  }

  .item-date,
  .item-rating {
    color: var(--color-text-secondary);
  }

  .generator-section {
    margin-bottom: var(--spacing-xl);
  }

  .generator-section h3 {
    margin-bottom: var(--spacing-md);
  }

  .generator-buttons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  .prompt-display {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin-top: var(--spacing-xl);
  }

  .prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .prompt-header h3 {
    margin: 0;
  }

  .copy-icon {
    margin-inline-end: var(--spacing-sm);
  }

  .prompt-content {
    background-color: var(--color-surface);
    border-radius: var(--radius-sm);
    padding: var(--spacing-md);
    font-family: monospace;
    font-size: var(--font-size-sm);
    line-height: 1.5;
    white-space: pre-wrap;
    max-block-size: 400px;
    overflow-y: auto;
  }

  .prompt-success {
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm);
    background-color: var(--color-muted);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

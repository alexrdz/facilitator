<script lang="ts">
  import Dialog from "$lib/components/Dialog.svelte";
  import Chart from "$lib/components/Chart.svelte";
  import {
    reflections,
    reflectionActions,
    getTodayDate,
    type Reflection,
  } from "$lib/stores";

  let showModal = $state(false);
  let showChart = $state(false);

  // Form state
  let date = $state("");
  let rating = $state(0);
  let takeaways = $state("");
  let feedback = $state("");
  let actionItems = $state("");

  function handleShowReflectionForm() {
    clearForm();
    date = getTodayDate();
    showModal = true;
  }

  function handleCloseModal() {
    showModal = false;
  }

  function clearForm() {
    date = "";
    rating = 0;
    takeaways = "";
    feedback = "";
    actionItems = "";
  }

  function handleSaveReflection(e: SubmitEvent) {
    e.preventDefault();
    if (!takeaways || rating === 0) {
      alert("Please provide a rating and key takeaways");
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
    handleCloseModal();
  }

  function handleDeleteReflection(id: string) {
    if (confirm("Are you sure you want to delete this reflection?")) {
      reflectionActions.delete(id);
    }
  }

  function setRating(newRating: number) {
    rating = newRating;
  }

  // Chart data
  let chartData = $derived(
    $reflections
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((reflection) => ({
        date: reflection.date,
        rating: reflection.rating,
      })),
  );
</script>

<div class="page-header">
  <div>
    <h1>Reflection</h1>
    <p>Track meeting satisfaction and identify patterns over time.</p>
  </div>
  <button class="btn btn-primary btn-default" onclick={handleShowReflectionForm}
    >Add Reflection</button
  >
</div>

<!-- Chart Section -->
<div class="chart-card">
  <div class="chart-container">
    <h3>Meeting Rating Over Time</h3>
    <label for="show-chart" class="chart-toggle">
      <input
        type="checkbox"
        name="show-chart"
        id="show-chart"
        bind:checked={showChart}
      />
      Show Chart
    </label>

    {#if showChart}
      <Chart
        type="line"
        data={{
          labels: chartData.map((d) => d.date),
          datasets: [
            {
              label: "Rating",
              data: chartData.map((d) => d.rating),
              borderColor: "#f59e0b",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
              min: 1,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
        plugins={[]}
        responsive={true}
        maintainAspectRatio={false}
        updateMode="active"
        className=""
        style=""
        onReady={() => {}}
      />
      <div class="chart-legend">
        <div class="legend-item">
          <div class="legend-color"></div>
          <span>rating</span>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Past Reflections Section -->
<div class="reflections-section">
  <h3>Past Reflections</h3>

  {#if $reflections.length === 0}
    <div class="empty-state">
      <h3>No reflections yet</h3>
      <p>Start tracking your 1:1 meetings by adding your first reflection!</p>
    </div>
  {:else}
    {#each $reflections as reflection (reflection.id)}
      <div class="reflection-item">
        <div class="reflection-header">
          <div class="reflection-date">{reflection.date}</div>
          <div class="reflection-rating">
            {#each Array(reflection.rating) as _}
              <span class="star filled">★</span>
            {/each}
            {#each Array(5 - reflection.rating) as _}
              <span class="star">★</span>
            {/each}
          </div>
        </div>
        <div class="reflection-content">
          {reflection.takeaways}
        </div>
        {#if reflection.feedback}
          <div class="reflection-feedback">
            <strong>Feedback:</strong>
            {reflection.feedback}
          </div>
        {/if}
        {#if reflection.actionItems}
          <div class="reflection-actions">
            <strong>Action Items:</strong>
            {reflection.actionItems}
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<!-- Modal for adding reflections -->
<Dialog bind:open={showModal}>
  <div class="modal-header">
    <h2 class="modal-title">Add Reflection</h2>
  </div>
  <div class="modal-body">
    <form id="reflection-form" onsubmit={handleSaveReflection}>
      <div class="form-group">
        <label class="form-label" for="reflection-date">Meeting Date</label>
        <input type="date" id="reflection-date" bind:value={date} required />
      </div>

      <div class="form-group">
        <label class="form-label" for="rating-input">Meeting Rating</label>
        <div class="rating-input" id="rating-input">
          {#each [1, 2, 3, 4, 5] as starRating}
            <span
              class="rating-star {starRating <= rating ? 'active' : ''}"
              onclick={() => setRating(starRating)}
              role="button"
              tabindex="0"
              onkeydown={(e) => e.key === "Enter" && setRating(starRating)}
            >
              ★
            </span>
          {/each}
          <span class="rating-text">
            {rating > 0
              ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]
              : "Click to rate"}
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="key-takeaways">Key Takeaways</label>
        <textarea
          id="key-takeaways"
          placeholder="Main points and decisions from the meeting..."
          bind:value={takeaways}
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label" for="manager-feedback"
          >Manager Feedback (Optional)</label
        >
        <textarea
          id="manager-feedback"
          placeholder="Feedback received from your manager..."
          bind:value={feedback}
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label" for="action-items"
          >Action Items (Optional)</label
        >
        <textarea
          id="action-items"
          placeholder="Follow-up tasks and commitments..."
          bind:value={actionItems}
        ></textarea>
      </div>
    </form>
  </div>
  <form method="dialog" class="modal-footer">
    <button
      type="submit"
      class="btn btn-primary btn-default"
      form="reflection-form">Save Reflection</button
    >
    <button
      type="button"
      class="btn btn-ghost btn-default"
      value="cancel"
      onclick={handleCloseModal}>Cancel</button
    >
  </form>
  {#snippet footer()}{/snippet}
</Dialog>

<style>
  .chart-card {
    background: var(--shell-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  .chart-card h3 {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-color);
  }

  .chart-container {
    position: relative;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-md);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--text-color-secondary);
  }

  .legend-color {
    width: 12px;
    block-size: 3px;
    background: #f59e0b;
    border-radius: 2px;
  }

  .reflections-section {
    margin-top: var(--spacing-xl);
  }

  .reflections-section h3 {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-color);
  }

  .reflection-item {
    background: var(--shell-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }

  .reflection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .reflection-date {
    font-weight: 600;
    color: var(--text-color);
  }

  .reflection-rating {
    display: flex;
    gap: var(--spacing-xs);
  }

  .star {
    color: #e5e7eb;
    font-size: var(--font-size-lg);
  }

  .star.filled {
    color: #f59e0b;
  }

  .reflection-content {
    color: var(--text-color);
    line-height: 1.5;
    margin-bottom: var(--spacing-sm);
  }

  .reflection-feedback,
  .reflection-actions {
    color: var(--text-color-secondary);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-sm);
  }

  .rating-input {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .rating-star {
    font-size: 24px;
    color: #e5e7eb;
    cursor: pointer;
    transition: color 0.2s ease;
    user-select: none;
  }

  .rating-star:hover,
  .rating-star.active {
    color: #f59e0b;
  }

  .rating-text {
    color: var(--text-color-secondary);
    font-size: var(--font-size-sm);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--text-color-secondary);
  }

  .empty-state h3 {
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
</style>

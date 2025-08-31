<script lang="ts">
        import { achievements, achievementActions, getTodayDate, type Achievement } from '$lib/stores';
        import { onMount } from 'svelte';
        
        let achievementList: Achievement[] = [];
        let showAddForm = false;
        let editingId: string | null = null;
        
        // Form state
        let title = '';
        let date = '';
        let action = '';
        let context = '';
        let impact = '';

        onMount(() => {
                const unsubscribe = achievements.subscribe(value => {
                        achievementList = value;
                });
                return unsubscribe;
        });

        function handleShowAddForm() {
                clearForm();
                showAddForm = true;
                editingId = null;
                date = getTodayDate();
        }

        function handleCancelForm() {
                showAddForm = false;
                editingId = null;
                clearForm();
        }

        function clearForm() {
                title = '';
                date = '';
                action = '';
                context = '';
                impact = '';
        }

        function handleSaveAchievement() {
                if (!title || !action || !context || !impact) {
                        alert('Please fill in all fields');
                        return;
                }

                const achievementData = {
                        title,
                        date,
                        action,
                        context,
                        impact,
                };

                if (editingId) {
                        achievementActions.update(editingId, achievementData);
                } else {
                        achievementActions.add(achievementData);
                }

                handleCancelForm();
        }

        function handleEditAchievement(achievement: Achievement) {
                title = achievement.title;
                date = achievement.date;
                action = achievement.action;
                context = achievement.context;
                impact = achievement.impact;
                editingId = achievement.id;
                showAddForm = true;
        }

        function handleDeleteAchievement(id: string) {
                if (confirm('Are you sure you want to delete this achievement?')) {
                        achievementActions.delete(id);
                }
        }
</script>

<!-- Navigation Back -->
<a href="/" class="nav-pill">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: var(--spacing-xs)">
                <path d="M19 12H5"/>
                <polyline points="12,19 5,12 12,5"/>
        </svg>
        Back to Dashboard
</a>

<div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg)">
                <h2>Hype Docs - Career Accomplishments</h2>
                <button class="btn btn-primary" on:click={handleShowAddForm}>
                        Add New Achievement
                </button>
        </div>

        {#if showAddForm}
                <div style="margin-bottom: var(--spacing-xl)">
                        <h3>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl)">
                                <div class="form-group">
                                        <label class="form-label" for="achievement-title">Title</label>
                                        <input 
                                                type="text" 
                                                class="form-input" 
                                                id="achievement-title" 
                                                placeholder="Brief, descriptive title"
                                                bind:value={title}
                                        />
                                </div>
                                <div class="form-group">
                                        <label class="form-label" for="achievement-date">Date</label>
                                        <input 
                                                type="date" 
                                                class="form-input" 
                                                id="achievement-date"
                                                bind:value={date}
                                        />
                                </div>
                                <div class="form-group">
                                        <label class="form-label" for="achievement-action">The What (Action)</label>
                                        <textarea 
                                                class="form-textarea" 
                                                id="achievement-action" 
                                                placeholder="Detailed description of the work performed..."
                                                bind:value={action}
                                        ></textarea>
                                </div>
                                <div class="form-group">
                                        <label class="form-label" for="achievement-context">The Why (Context)</label>
                                        <textarea 
                                                class="form-textarea" 
                                                id="achievement-context" 
                                                placeholder="Problem solved or business need addressed..."
                                                bind:value={context}
                                        ></textarea>
                                </div>
                        </div>
                        <div class="form-group">
                                <label class="form-label" for="achievement-impact">The Result (Impact)</label>
                                <textarea 
                                        class="form-textarea" 
                                        id="achievement-impact" 
                                        placeholder="Quantifiable outcomes, metrics, or results..."
                                        bind:value={impact}
                                ></textarea>
                        </div>
                        <div style="display: flex; gap: var(--spacing-md)">
                                <button class="btn btn-primary" on:click={handleSaveAchievement}>
                                        {editingId ? 'Update Achievement' : 'Save Achievement'}
                                </button>
                                <button class="btn btn-ghost" on:click={handleCancelForm}>
                                        Cancel
                                </button>
                        </div>
                </div>
        {/if}

        <div>
                {#if achievementList.length === 0}
                        <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary)">
                                <h3>No achievements yet</h3>
                                <p>Start building your career narrative by adding your first accomplishment!</p>
                        </div>
                {:else}
                        {#each achievementList as achievement}
                                <div class="achievement-item">
                                        <div class="achievement-header">
                                                <div>
                                                        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); font-weight: 500">{achievement.date}</div>
                                                        <div style="font-weight: 600; margin-bottom: var(--spacing-sm)">{achievement.title}</div>
                                                </div>
                                                <div style="display: flex; gap: var(--spacing-sm)">
                                                        <button 
                                                                class="btn btn-ghost" 
                                                                style="padding: var(--spacing-sm) var(--spacing-md); font-size: var(--font-size-sm)"
                                                                on:click={() => handleEditAchievement(achievement)}
                                                        >
                                                                Edit
                                                        </button>
                                                        <button 
                                                                class="btn btn-ghost" 
                                                                style="padding: var(--spacing-sm) var(--spacing-md); font-size: var(--font-size-sm); color: var(--color-error)"
                                                                on:click={() => handleDeleteAchievement(achievement.id)}
                                                        >
                                                                Delete
                                                        </button>
                                                </div>
                                        </div>
                                        <div style="margin-bottom: var(--spacing-sm)">
                                                <strong>What:</strong> {achievement.action}
                                        </div>
                                        <div style="margin-bottom: var(--spacing-sm)">
                                                <strong>Why:</strong> {achievement.context}
                                        </div>
                                        <div>
                                                <strong>Impact:</strong> {achievement.impact}
                                        </div>
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
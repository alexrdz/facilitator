<script lang="ts">
        import { achievements, prepAgendas, reflections } from '$lib/stores';
        import { onMount } from 'svelte';
        
        let showHypeModal = false;
        let recentAchievements: any[] = [];
        let recentPreps: any[] = [];

        onMount(() => {
                // Subscribe to stores to get recent data
                const unsubAchievements = achievements.subscribe(value => {
                        recentAchievements = value.slice(0, 2);
                });
                
                const unsubPreps = prepAgendas.subscribe(value => {
                        recentPreps = value.slice(0, 1);
                });
                
                return () => {
                        unsubAchievements();
                        unsubPreps();
                };
        });
</script>

<!-- Navigation Pill -->
<a href="/prep" class="nav-pill">
        <span class="icon">○</span>
        1:1 Prep
</a>

<!-- Module Navigation -->
<div class="module-nav">
        <a href="/prep" class="module-nav-item">
                <div class="module-icon prep">📋</div>
                <div class="module-label">1:1 Prep</div>
        </a>
        
        <a href="/hype" class="module-nav-item">
                <div class="module-icon hype">🏆</div>
                <div class="module-label">Hype Docs</div>
        </a>
        
        <a href="/reflection" class="module-nav-item">
                <div class="module-icon reflection">💭</div>
                <div class="module-label">Reflection</div>
        </a>
        
        <a href="/prompts" class="module-nav-item">
                <div class="module-icon llm">⚡</div>
                <div class="module-label">Prompt<br>Generation</div>
        </a>
</div>

<!-- Main Content Grid -->
<div class="card-grid">
        <div>
                <!-- Welcome Card -->
                <div class="card welcome-card">
                        <h2>Welcome Back!</h2>
                        <p style="color: var(--color-text-secondary)">Your journey over your next career path begins here.</p>
                </div>
                
                <!-- Recent Activity -->
                <div class="activity-section">
                        <div class="activity-grid">
                                <div class="activity-card">
                                        <h3>Recent Activity</h3>
                                        <h4>1:1 Prep</h4>
                                        {#if recentPreps.length > 0}
                                                {#each recentPreps as prep}
                                                        <div class="activity-item">
                                                                <div>Meeting with Alex -</div>
                                                                <div>Tomorrow</div>
                                                        </div>
                                                {/each}
                                        {:else}
                                                <div class="activity-item">No recent preps</div>
                                        {/if}
                                        <button class="view-all-btn">View All</button>
                                </div>
                                
                                <div class="activity-card">
                                        <h3>Hype Docs</h3>
                                        <h4>Hype Docs</h4>
                                        {#if recentAchievements.length > 0}
                                                {#each recentAchievements as achievement}
                                                        <div class="activity-item">
                                                                <div>{achievement.title} -</div>
                                                                <div>{achievement.date}</div>
                                                        </div>
                                                {/each}
                                        {:else}
                                                <div class="activity-item">
                                                        <div>Project X Launch -</div>
                                                        <div>Q3 Review</div>
                                                </div>
                                                <div class="activity-item">
                                                        <div>Weekly Wins -</div>
                                                        <div>Last Friday</div>
                                                </div>
                                        {/if}
                                        <button class="view-all-btn">View All</button>
                                </div>
                        </div>
                </div>
        </div>
        
        <!-- Quick Actions Sidebar -->
        <div class="quick-actions">
                <h3>Quick Actions</h3>
                <button class="btn btn-primary" on:click={() => showHypeModal = true}>
                        Add New Hype Doc
                </button>
                <button class="btn btn-secondary">
                        Generate Prompt
                </button>
        </div>
</div>

<!-- Hype Doc Modal -->
{#if showHypeModal}
        <div class="modal-overlay" on:click={() => showHypeModal = false}>
                <div class="modal" on:click|stopPropagation>
                        <h2>Create New Hype Doc</h2>
                        <form on:submit|preventDefault={() => showHypeModal = false}>
                                <div class="form-group">
                                        <label class="form-label" for="title">Title</label>
                                        <input type="text" id="title" class="form-input" placeholder="Brief, descriptive title" />
                                </div>
                                
                                <div class="form-group">
                                        <label class="form-label" for="category">Category</label>
                                        <input type="text" id="category" class="form-input" placeholder="e.g., Project, Achievement, Skill" />
                                </div>
                                
                                <div class="form-group">
                                        <label class="form-label" for="description">Description</label>
                                        <textarea id="description" class="form-textarea" placeholder="Detailed description of your accomplishment..."></textarea>
                                </div>
                                
                                <div class="modal-actions">
                                        <button type="button" class="btn btn-ghost" on:click={() => showHypeModal = false}>Cancel</button>
                                        <button type="submit" class="btn btn-primary">Save</button>
                                </div>
                        </form>
                </div>
        </div>
{/if}

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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: var(--spacing-xs)">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        1:1 Prep
</a>

<!-- Module Navigation -->
<div class="module-nav">
        <a href="/prep" class="module-nav-item">
                <div class="module-icon prep">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                        </svg>
                </div>
                <div class="module-label">1:1 Prep</div>
        </a>
        
        <a href="/hype" class="module-nav-item">
                <div class="module-icon hype">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                                <path d="M4 22h16"/>
                                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                </div>
                <div class="module-label">Hype Docs</div>
        </a>
        
        <a href="/reflection" class="module-nav-item">
                <div class="module-icon reflection">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12l2 2 4-4"/>
                                <path d="M21 12c.552 0 1-.448 1-1V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6c0 .552.448 1 1 1"/>
                                <path d="M3 12h6l3 3 3-3h6"/>
                        </svg>
                </div>
                <div class="module-label">Reflection</div>
        </a>
        
        <a href="/prompts" class="module-nav-item">
                <div class="module-icon llm">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                                <path d="M8 12l2 2 4-4"/>
                                <path d="M12 6v6l4 2"/>
                        </svg>
                </div>
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

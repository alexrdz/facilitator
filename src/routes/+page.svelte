<script lang="ts">
        let topics = [
                { id: '1', title: 'Review Q3 project goals', completed: true },
                { id: '2', title: 'Discuss career path opportunities', completed: false },
                { id: '3', title: 'Feedback on recent presentation', completed: false },
        ];
        let newTopic = '';

        function handleAddTopic(e: SubmitEvent) {
                e.preventDefault();
                if (newTopic.trim()) {
                        topics = [...topics, { id: Date.now().toString(), title: newTopic, completed: false }];
                        newTopic = '';
                }
        }

        function toggleComplete(id: string) {
                topics = topics.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        }

        function deleteTopic(id: string) {
                topics = topics.filter(t => t.id !== id);
        }
</script>

<div id="top-nav">
        <div class="nav-icons">
                <button class="nav-item active">
                        <div class="nav-icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                        </div>
                        <div class="nav-item-label">1:1 Prep</div>
                </button>
                
                <a href="/hype" class="nav-item">
                        <div class="nav-icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M15.75 4.5c0-1.38-1.007-2.5-2.25-2.5s-2.25 1.12-2.25 2.5m4.5 0c0 1.38-1.007 2.5-2.25 2.5s-2.25-1.12-2.25-2.5m4.5 0v.75a2.25 2.25 0 01-4.5 0V4.5m0 0h-4.5" />
                                </svg>
                        </div>
                        <div class="nav-item-label">Hype Docs</div>
                </a>
                
                <a href="/reflection" class="nav-item">
                        <div class="nav-icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                        </div>
                        <div class="nav-item-label">Reflection</div>
                </a>
                
                <a href="/prompts" class="nav-item">
                        <div class="nav-icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                        </div>
                        <div class="nav-item-label">Prompt Generation</div>
                </a>
        </div>
        
        <div class="nav-active-indicator">
                <button class="nav-active-button active">1:1 Prep</button>
        </div>
</div>

<div class="page-header">
        <h1>1:1 Prep</h1>
        <p>Get ready for your next meeting.</p>
</div>

<div class="card">
        <div class="card-header">
                <div class="card-title">Upcoming Meeting Topics</div>
        </div>
        <div class="card-content">
                <form on:submit={handleAddTopic} class="prep-form">
                        <input
                                type="text"
                                bind:value={newTopic}
                                placeholder="Add a new discussion topic..."
                                class="prep-input"
                        />
                        <button type="submit" class="btn btn-primary btn-default icon-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span>Add Topic</span>
                        </button>
                </form>
                
                <ul class="prep-list">
                        {#each topics as topic (topic.id)}
                                <li class="prep-item">
                                        <div class="prep-item-main">
                                                <input
                                                        type="checkbox"
                                                        checked={topic.completed}
                                                        on:change={() => toggleComplete(topic.id)}
                                                />
                                                <span class="prep-item-title" class:completed={topic.completed}>
                                                        {topic.title}
                                                </span>
                                        </div>
                                        <button on:click={() => deleteTopic(topic.id)} class="prep-item-delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                        </button>
                                </li>
                        {/each}
                </ul>
        </div>
</div>

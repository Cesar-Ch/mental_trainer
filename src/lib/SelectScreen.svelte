<script>
  let { onstart = () => {} } = $props();

  const topics = [
    { id: "mult", icon: "✕", name: "Multiplicaciones", soon: false },
    { id: "periodic", icon: "Li", name: "Tabla periódica", soon: false },
    { id: "roots", icon: "√", name: "Raíces", soon: false },
    { id: "integrals", icon: "∫", name: "Integrales", soon: true },
  ];

  const times = [10, 20, 30, 45, 60];

  let selectedTopic = $state("mult");
  let selectedSecs = $state(20);

  function start() {
    onstart({ topic: selectedTopic, secs: selectedSecs });
  }
</script>

<div class="container">
  <span class="logo-tag">mental trainer</span>
  <h1>¿Qué quieres <span class="accent">practicar?</span></h1>

  <div class="topics-grid">
    {#each topics as topic}
      <button
        class="topic-card"
        class:selected={selectedTopic === topic.id}
        class:disabled={topic.soon}
        disabled={topic.soon}
        onclick={() => (selectedTopic = topic.id)}
      >
        {#if topic.soon}<span class="soon-badge">próximo</span>{/if}
        <span class="topic-icon">{topic.icon}</span>
        <span class="topic-name">{topic.name}</span>
      </button>
    {/each}
  </div>

  <div class="time-section">
    <p class="section-label">tiempo por pregunta</p>
    <div class="time-pills">
      {#each times as t}
        <button
          class="time-pill"
          class:selected={selectedSecs === t}
          onclick={() => (selectedSecs = t)}
        >
          {t}s
        </button>
      {/each}
    </div>
  </div>

  <button class="btn-start" onclick={start}> Empezar práctica → </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2.5rem 1rem;
    max-width: 480px;
    margin: 0 auto;
  }

  .logo-tag {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888;
    border: 0.5px solid #ccc;
    padding: 4px 10px;
    border-radius: 99px;
  }

  h1 {
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    line-height: 1.2;
  }

  .accent {
    color: #e24b4a;
  }

  .topics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
  }

  .topic-card {
    border: 0.5px solid #ddd;
    border-radius: 12px;
    padding: 1rem 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    background: white;
    position: relative;
    transition:
      border-color 0.15s,
      background 0.15s;
    font-family: inherit;
  }

  .topic-card:hover:not(.disabled) {
    border-color: #aaa;
    background: #f9f9f9;
  }
  .topic-card.selected {
    border: 1.5px solid #e24b4a;
  }
  .topic-card.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .topic-icon {
    font-size: 22px;
  }
  .topic-name {
    font-size: 12px;
    font-weight: 600;
    text-align: center;
  }

  .soon-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 9px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: #f0f0f0;
    color: #999;
    padding: 2px 6px;
    border-radius: 99px;
  }

  .time-section {
    width: 100%;
  }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 10px;
  }

  .time-pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .time-pill {
    padding: 6px 14px;
    border-radius: 99px;
    border: 0.5px solid #ddd;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    background: white;
    font-family: inherit;
    transition: all 0.12s;
  }

  .time-pill:hover {
    background: #f5f5f5;
    border-color: #aaa;
  }
  .time-pill.selected {
    background: #e24b4a;
    border-color: #e24b4a;
    color: white;
  }

  .btn-start {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: #e24b4a;
    color: white;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition:
      opacity 0.15s,
      transform 0.1s;
  }

  .btn-start:hover {
    opacity: 0.88;
  }
  .btn-start:active {
    transform: scale(0.98);
  }
</style>

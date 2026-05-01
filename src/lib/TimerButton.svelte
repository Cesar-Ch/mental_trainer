<script>
  import { onDestroy } from "svelte";

  let { secs = 20, onreveal = () => {} } = $props();

  const CIRCUMFERENCE = 251.2;

  let timeLeft = $state(0);
  let revealed = $state(false);
  let interval = null;

  function start() {
    timeLeft = secs;
    revealed = false;
    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        revealed = true;
        onreveal();
      }
    }, 1000);
  }

  export function reset() {
    clearInterval(interval);
    revealed = false;
    timeLeft = secs;
    start();
  }

  function handleClick() {
    if (revealed) return;
    clearInterval(interval);
    revealed = true;
    onreveal();
  }

  let progress = $derived(
    revealed ? CIRCUMFERENCE : ((secs - timeLeft) / secs) * CIRCUMFERENCE,
  );

  onDestroy(() => clearInterval(interval));

  start();
</script>

<button class="wrapper" onclick={handleClick} disabled={revealed}>
  <svg class="ring" width="88" height="88" viewBox="0 0 88 88">
    <circle class="track" cx="44" cy="44" r="40" />
    <circle
      class="fill"
      cx="44"
      cy="44"
      r="40"
      stroke-dasharray={CIRCUMFERENCE}
      stroke-dashoffset={progress}
      style="transition: stroke-dashoffset {revealed
        ? '0.3s ease'
        : '1s linear'}"
    />
  </svg>
  <div class="inner">
    {#if revealed}
      <span class="check">✓</span>
    {:else}
      <span class="seconds">{timeLeft}</span>
      <span class="hint">ver resp.</span>
    {/if}
  </div>
</button>

<style>
  .wrapper {
    position: relative;
    width: 88px;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
  }

  .wrapper:not(:disabled) {
    cursor: pointer;
  }
  .wrapper:disabled {
    cursor: default;
  }

  .ring {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
  }

  .track {
    fill: none;
    stroke: #eee;
    stroke-width: 4;
  }

  .fill {
    fill: none;
    stroke: #e24b4a;
    stroke-width: 4;
    stroke-linecap: round;
  }

  .inner {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #f5f5f5;
    border: 0.5px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    z-index: 1;
  }

  .seconds {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }

  .hint {
    font-size: 9px;
    color: #999;
    text-align: center;
    line-height: 1.2;
  }

  .check {
    font-size: 22px;
    color: #e24b4a;
    font-weight: 700;
  }
</style>

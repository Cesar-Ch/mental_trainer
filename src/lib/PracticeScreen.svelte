<script>
  import { onDestroy } from 'svelte'
  import TimerButton from './TimerButton.svelte'

  let { config = { topic: 'mult', secs: 20 }, onback = () => {} } = $props()

  let a = $state(0)
  let b = $state(0)
  let answer = $state(null)
  let timerBtn = $state(null)
  let nextTimeout = null
  let showNextBar = $state(false)
  let nextBarWidth = $state(0)
  let nextCountdown = $state(5)

  function genQuestion() {
    a = Math.floor(Math.random() * 88) + 11
    b = Math.floor(Math.random() * 88) + 11
    answer = null
    showNextBar = false
    nextBarWidth = 0
  }

  function handleReveal() {
    answer = a * b
    showNextBar = true
    nextCountdown = 5
    setTimeout(() => nextBarWidth = 100, 30)

    const countInterval = setInterval(() => {
      nextCountdown--
      if (nextCountdown <= 0) clearInterval(countInterval)
    }, 1000)

    nextTimeout = setTimeout(() => nextQuestion(), 5000)
  }

  function nextQuestion() {
    clearTimeout(nextTimeout)
    genQuestion()
    if (timerBtn) timerBtn.reset()
  }

  function goBack() {
    clearTimeout(nextTimeout)
    onback()
  }

  onDestroy(() => clearTimeout(nextTimeout))

  genQuestion()
</script>

<div class="container">
  <button class="btn-back" onclick={goBack}>← cambiar tema</button>

  <div class="question">{a} × {b}</div>

  <TimerButton bind:this={timerBtn} secs={config.secs} onreveal={handleReveal} />

  <div class="answer" class:visible={answer !== null}>
    = {answer ?? ''}
  </div>

  <div class="next-label">
    {#if showNextBar}siguiente en {nextCountdown}s...{/if}
  </div>

  <div class="next-bar" class:active={showNextBar}>
    <div class="next-bar-fill" style="width: {nextBarWidth}%; transition: width {showNextBar ? '5s' : '0s'} linear"></div>
  </div>
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

  .btn-back {
    align-self: flex-start;
    font-size: 12px;
    color: #999;
    background: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0;
    font-family: inherit;
  }

  .btn-back:hover { color: #555; }

  .question {
    font-size: 56px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .answer {
    font-size: 36px;
    font-weight: 700;
    color: transparent;
    transition: color 0.2s ease;
    min-height: 48px;
  }

  .answer.visible { color: #E24B4A; }

  .next-label {
    font-size: 11px;
    color: #aaa;
    min-height: 16px;
  }

  .next-bar {
    width: 100%;
    height: 3px;
    background: #eee;
    border-radius: 99px;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .next-bar.active { opacity: 1; }

  .next-bar-fill {
    height: 100%;
    background: #E24B4A;
    border-radius: 99px;
  }
</style>
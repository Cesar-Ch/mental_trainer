<script>
  import { onDestroy } from "svelte";
  import TimerButton from "./TimerButton.svelte";
  import MathDisplay from "./MathDisplay.svelte";
  import { elements } from "./data/elements.js";
  import { genRootQuestion } from "./data/roots.js";

  let { config = { topic: "mult", secs: 20 }, onback = () => {} } = $props();

  // estado de la pregunta
  let question = $state({
    type: "",
    a: 0,
    b: 0,
    el: null,
    degree: 2,
    radicand: 0,
    result: 0,
  });
  let answer = $state(null);
  let timerBtn = $state(null);
  let nextTimeout = null;
  let showNextBar = $state(false);
  let nextBarWidth = $state(0);
  let nextCountdown = $state(5);

  // --- generadores ---
  function genQuestion() {
    answer = null;
    showNextBar = false;
    nextBarWidth = 0;

    if (config.topic === "mult") {
      const a = Math.floor(Math.random() * 89) + 10;
      const b = Math.floor(Math.random() * 89) + 10;
      question = {
        type: "mult",
        a,
        b,
        el: null,
        degree: 2,
        radicand: 0,
        result: 0,
      };
    } else if (config.topic === "periodic") {
      const el = elements[Math.floor(Math.random() * elements.length)];
      question = {
        type: "periodic",
        a: 0,
        b: 0,
        el,
        degree: 2,
        radicand: 0,
        result: 0,
      };
    } else if (config.topic === "roots") {
      const r = genRootQuestion();
      question = { type: "roots", a: 0, b: 0, el: null, ...r };
    }
  }

  // --- latex para raíces ---
  function rootLatex(degree, radicand) {
    if (degree === 2) return `\\sqrt{${radicand}}`;
    return `\\sqrt[${degree}]{${radicand}}`;
  }

  // --- reveal ---
  function handleReveal() {
    if (config.topic === "mult") {
      answer = `${question.a * question.b}`;
    } else if (config.topic === "periodic") {
      answer = `${question.el.number} — ${question.el.name}`;
    } else if (config.topic === "roots") {
      answer = `${question.result}`;
    }

    showNextBar = true;
    nextCountdown = 5;
    setTimeout(() => (nextBarWidth = 100), 30);

    const countInterval = setInterval(() => {
      nextCountdown--;
      if (nextCountdown <= 0) clearInterval(countInterval);
    }, 1000);

    nextTimeout = setTimeout(() => nextQuestion(), 5000);
  }

  function nextQuestion() {
    clearTimeout(nextTimeout);
    genQuestion();
    if (timerBtn) timerBtn.reset();
  }

  function goBack() {
    clearTimeout(nextTimeout);
    onback();
  }

  onDestroy(() => clearTimeout(nextTimeout));

  genQuestion();
</script>

<div class="container">
  <button class="btn-back" onclick={goBack}>← cambiar tema</button>

  <div class="question-area">
    {#if question.type === "mult"}
      <div class="question-text">{question.a} × {question.b}</div>
    {:else if question.type === "periodic"}
      <div class="element-card">
        <div class="element-symbol">{question.el.symbol}</div>
      </div>
    {:else if question.type === "roots"}
      <div class="math-question">
        <MathDisplay
          expression={rootLatex(question.degree, question.radicand)}
        />
      </div>
    {/if}
  </div>

  <TimerButton
    bind:this={timerBtn}
    secs={config.secs}
    onreveal={handleReveal}
  />

  <div class="answer" class:visible={answer !== null}>
    {answer ?? ""}
  </div>

  <div class="next-label">
    {#if showNextBar}siguiente en {nextCountdown}s...{/if}
  </div>

  <div class="next-bar" class:active={showNextBar}>
    <div
      class="next-bar-fill"
      style="width: {nextBarWidth}%; transition: width {showNextBar
        ? '5s'
        : '0s'} linear"
    ></div>
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

  .btn-back:hover {
    color: #555;
  }

  .question-area {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  .question-text {
    font-size: 56px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  /* elemento periódico */
  .element-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border: 2px solid #e24b4a;
    border-radius: 16px;
    gap: 4px;
  }

  .element-number {
    font-size: 14px;
    color: #999;
    font-weight: 600;
  }

  .element-symbol {
    font-size: 52px;
    font-weight: 800;
    color: #e24b4a;
    line-height: 1;
  }

  /* raíces */
  .math-question {
    font-size: 1.2rem;
  }

  /* respuesta */
  .answer {
    font-size: 32px;
    font-weight: 700;
    color: transparent;
    transition: color 0.2s ease;
    min-height: 44px;
    text-align: center;
  }

  .answer.visible {
    color: #e24b4a;
  }

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

  .next-bar.active {
    opacity: 1;
  }

  .next-bar-fill {
    height: 100%;
    background: #e24b4a;
    border-radius: 99px;
  }
</style>

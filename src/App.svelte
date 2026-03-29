<script>
  import SelectScreen from './lib/SelectScreen.svelte'
  import PracticeScreen from './lib/PracticeScreen.svelte'

  let screen = $state('select')
  let config = $state({ topic: 'mult', secs: 20 })

  function handleStart(detail) {
    config = detail
    screen = 'practice'
  }

  function handleBack() {
    screen = 'select'
  }
</script>

{#if screen === 'select'}
  <SelectScreen onstart={handleStart} />
{:else}
  <PracticeScreen {config} onback={handleBack} />
{/if}
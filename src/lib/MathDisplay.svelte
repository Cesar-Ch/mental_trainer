<script>
  import katex from 'katex'
  import 'katex/dist/katex.min.css'

  let { expression = '' } = $props()

  let rendered = $derived(
    katex.renderToString(expression, {
      throwOnError: false,
      displayMode: true
    })
  )
</script>

<span>{@html rendered}</span>
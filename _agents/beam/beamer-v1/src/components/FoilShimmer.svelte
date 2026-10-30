<script>
  export let text = '';
  export let size = '1rem';
</script>

<span class="foil" style="font-size:{size}">{text}</span>

<style>
  .foil{background:linear-gradient(90deg,var(--gold) 0%,var(--rose) 25%,#fff 50%,var(--rose) 75%,var(--gold) 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sh 2.5s ease-in-out infinite;display:inline-block}
  @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
  @media (prefers-reduced-motion:reduce){.foil{animation:none;background-position:0 0}}
</style>

<script lang="ts">
  import Chart from 'chart.js/auto';
  import type { Chart as ChartJS, ChartType, ChartData, ChartOptions, UpdateMode } from 'chart.js';
  import { untrack } from 'svelte';

  // Props
  type Props = {
    type: ChartType;
    data: ChartData;
    options: ChartOptions;
    plugins: any[];
    responsive: boolean;
    maintainAspectRatio: boolean;
    updateMode: UpdateMode;
    className: string;
    style: string;
    onReady: (c: ChartJS) => void;
  };

  let { type, data, options, plugins, responsive, maintainAspectRatio, updateMode, className, style, onReady }: Props = $props();

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  let chart = $state<ChartJS | null>(null);

  // Get canvas context when mounted/changed
  $effect(() => {
    ctx = canvas?.getContext('2d') ?? null;
  });

  // Build/destroy chart when type or plugins identity changes (or on first mount)
  $effect(() => {
    void type; void plugins; // deps for rebuild
    if (!ctx || !data) return;

    // read without tracking so option tweaks won't force rebuild
    const localOptions = untrack(() => options);
    const localResponsive = untrack(() => responsive);
    const localMaintain = untrack(() => maintainAspectRatio);

    const c = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: localResponsive,
        maintainAspectRatio: localMaintain,
        ...localOptions
      },
      plugins
    }) as ChartJS;

    chart = c;
    onReady(c);

    return () => {
      c.destroy();
      if (chart === c) chart = null;
    };
  });

  // Incremental updates: data/options/flags/updateMode
  $effect(() => {
    if (!chart) return;
    void data; void options; void responsive; void maintainAspectRatio; void updateMode;

    if (data) chart.data = data;
    const newOptions = {
      responsive,
      maintainAspectRatio,
      ...(options ?? {})
    };
    chart.options = newOptions;
    chart.update(updateMode);
  });

  // Optional getter for parents
  export function getChart(): ChartJS | null {
    return chart;
  }
</script>

<canvas bind:this={canvas} class={className} style={style}></canvas>

<style>
  canvas { display: block; width: 100%; block-size: 100%; max-block-size: 400px; }
</style>

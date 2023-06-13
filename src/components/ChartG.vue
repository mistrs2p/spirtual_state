<template>
  <div
    style="
      max-width: 70vw;
      min-height: 400px;
      margin: 0px auto;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineProps } from "vue";
import Chart from "chart.js/auto";

console.log(Chart);
const props = defineProps({
  data: Object,
  type: String,
});
onMounted(() => {
  nextTick(() => {
    console.log(props.data);
    console.log(document.getElementById("myChart"));
    new Chart(document.getElementById("myChart"), {
      type: props.type,
      data: { ...props.data },
      options: {
        animation: false,
        font: {
          size: 18,
          family: "Vazir",
          weight: "bold",
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  });
});
</script>

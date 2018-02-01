import { calculate_probability } from './add.rs';

const $num = document.getElementById("number_balls")
const $all = document.getElementById("total_options")
const ctx = document.getElementById("myChart")
const chart = new Chart(ctx, {
  type: 'line',
  data: { labels: [0], datasets: [{ label: '%', data: [0], fill: false }] }
})

function recalc (all, num) {
  let arr = []
  console.time()
  for (let j = 1; j <= all - num + 1; j++){
    const a = calculate_probability(num, all, j)
    arr.push(a.toFixed(4))
  }
  console.timeEnd()
  chart.data.labels = arr.map((a,i) => i+1)
  chart.data.datasets[0].data = arr
  chart.update()
}

function callRecalc () {
  const nv = Number($num.value)
  const av = Number($all.value)
  if (nv && av) {
    if ((nv < av) && av <= 270) {
      return recalc(av, nv)
    }
  }
}

$num.addEventListener('keyup', callRecalc)
$all.addEventListener('keyup', callRecalc)

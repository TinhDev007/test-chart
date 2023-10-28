import { useEffect, useState, useRef } from "react";
import type { ChartData, ChartArea , ChartOptions} from 'chart.js';
import {
  Chart as ChartJS,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import InfoIcon from '../assets/icons/infoIcon.svg';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'];

export const options: (ChartOptions & { annotation?: any }) = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      // position: 'top' as const,
    },
    title: {
      display: false,
    },
    annotation: {
      annotations: {
        label1: {
          type: 'label',
          xValue: 2,
          yValue: 77,          
          content: ['Max Temp'],
          font: {
            size: 12
          }
        },
        label2: {
          type: 'label',
          xValue: 2,
          yValue: 40,          
          content: ['Min Temp'],
          font: {
            size: 12
          }
        },
        line1: {
          type: 'line',          
          yMin: 80,
          yMax: 80,
          borderColor: '#a6b0c3',
          borderWidth: 1,          
          borderDash: [3, 3]
        },
        line2: {
          type: 'line',          
          yMin: 37,
          yMax: 37,
          borderColor: '#a6b0c3',
          borderWidth: 1,          
          borderDash: [3, 3]
        }
      }
    }
  },
  scales: {
    x: {
      // ticks: {
      //   stepSize: 0.5
      // },
      title: {
        align: 'center'
      },
      ticks: {        
        callback: function(value, index, ticks) {          
          if (index % 4) return '';
          else {
            return monthNames[index / 4];
          }          
        },
      },
      grid: {

      }
    },
    y: {
      max: 100,
      min: 0,
      ticks: {
        stepSize: 25,
      },
      // bounds: 'ticks',
      grid: {
        display: false
      }
    }
  },
};

const maxData = [
  {
    x: new Date("2020-01-01"),
    y: 62.5
  },
  {
    x: new Date("2020-01-02"),
    y: 62.5
  },
  {
    x: new Date("2020-01-03"),
    y: 73
  },
  {
    x: new Date("2020-01-11"),
    y: 60
  },
  {
    x: new Date("2020-02-01"),
    y: 60
  },
  {
    x: new Date("2020-02-02"),
    y: 62
  },
  {
    x: new Date("2020-02-03"),
    y: 90
  },
  {
    x: new Date("2020-02-11"),
    y: 95
  },
  {
    x: new Date("2020-03-01"),
    y: 81
  },
  {
    x: new Date("2020-03-02"),
    y: 75
  },
  {
    x: new Date("2020-03-03"),
    y: 68
  },
  {
    x: new Date("2020-03-11"),
    y: 60
  },
  {
    x: new Date("2020-04-01"),
    y: 52
  },
  {
    x: new Date("2020-04-02"),
    y: 50
  },
  {
    x: new Date("2020-04-03"),
    y: 54
  },
  {
    x: new Date("2020-04-11"),
    y: 51
  },
  {
    x: new Date("2020-05-01"),
    y: 64
  },
  {
    x: new Date("2020-05-02"),
    y: 48
  },
  {
    x: new Date("2020-05-03"),
    y: 48
  },
  {
    x: new Date("2020-05-11"),
    y: 51
  },
];

const minData = [
  {
    x: new Date("2020-01-01"),
    y: 36
  },
  {
    x: new Date("2020-01-02"),
    y: 36 
  },
  {
    x: new Date("2020-01-03"),
    y: 38
  },
  {
    x: new Date("2020-01-11"),
    y: 39
  },
  {
    x: new Date("2020-02-01"),
    y: 45
  },
  {
    x: new Date("2020-02-02"),
    y: 39
  },
  {
    x: new Date("2020-02-03"),
    y: 24
  },
  {
    x: new Date("2020-02-11"),
    y: 30
  },
  {
    x: new Date("2020-03-01"),
    y: 33
  },
  {
    x: new Date("2020-03-02"),
    y: 34
  },
  {
    x: new Date("2020-03-03"),
    y: 35
  },
  {
    x: new Date("2020-03-11"),
    y: 37
  },
  {
    x: new Date("2020-04-01"),
    y: 45
  },
  {
    x: new Date("2020-04-02"),
    y: 45
  },
  {
    x: new Date("2020-04-03"),
    y: 33
  },
  {
    x: new Date("2020-04-11"),
    y: 33
  },
  {
    x: new Date("2020-05-01"),
    y: 36
  },
  {
    x: new Date("2020-05-02"),
    y: 42
  },
  {
    x: new Date("2020-05-03"),
    y: 42
  },
  {
    x: new Date("2020-05-11"),
    y: 45
  },
];

export const data = {
  labels: minData.map(d => { return monthNames[d.x.getMonth()] }),
  datasets: [
    {
      label: 'Dataset 1',
      data: maxData,    
      pointRadius: 0  
    },
    {
      label: 'Dataset 2',
      data: minData,
      pointRadius: 0
      // tension: 1
    }
  ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  let width, height, gradient;   
  const chartWidth = area.right - area.left;
  const chartHeight = area.bottom - area.top;  
    
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0.3, 'red');
    gradient.addColorStop(0.35, 'yellow');
    gradient.addColorStop(0.37, 'green');
    gradient.addColorStop(0.8, 'green');
    gradient.addColorStop(0.82, 'yellow');
    gradient.addColorStop(0.86, 'red');
  }

  return gradient;
}

const ChartOne = () => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(({x,y}) => y),
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })), 
    };

    setChartData(chartData);
  }, []);

  return (
    <div className='chart-one card'>
      <h3>Daily Temperature Risk</h3>
      <Chart ref={chartRef} type='line' options={options} data={chartData} />
      <div className="divider" />
      <div className="chart-label">
        <img src={InfoIcon} alt="" />
        <p>Your growing season is from Feb 1 - May 1. Ideal temperature for Coffee in this region is between 37 F and 80 F.</p>
      </div>      
    </div>
  );
};

export default ChartOne;

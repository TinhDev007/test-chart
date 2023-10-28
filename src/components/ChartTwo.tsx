import { useRef, useState } from "react";
import type { ChartOptions} from 'chart.js';
import {
  Chart as ChartJS,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 'Today'];

export const options: (ChartOptions & { annotation?: any }) = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {      
      grid: {
        offset: true
      },
      title: {
        align: 'center'
      },
    },    
    y: {
      max: 10,
      min: 0,
      ticks: {
        stepSize: 2,
      },
      bounds: 'ticks',    
      grid: {
        display: false
      },      
      beginAtZero: true
    },
  },
};

const predictionList = [4, 4.1, 4.15, 4.25, 4.28, 4.3, 4.4, 4.6, 5.2, 5.5, 5.6, 6, 6.3, 6.5, 6.7, 7, 7.1, 7.2, 7.2, 7.3];
const averageList = [2.3, 2.8, 2.9, 3, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 4, 4.5, 5, 5.1, 5.3, 5.4, 7, 7.3, 7.3];
const avarageRanges = [
  { min: 1, max: 1 },
  { min: 0.9, max: 1 },
  { min: 0.7, max: 0.5 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 },
  { min: 1, max: 1 }
];

const renderBorderColor = () => {
  const colors = predictionList.map((predictionItem, i) => {
    if ((averageList[i] + avarageRanges[i].max >= predictionItem) && (averageList[i] - avarageRanges[i].min <= predictionItem)) {
      return 'green'
    } else if ((averageList[i] + avarageRanges[i].max < predictionItem - 0.3)) {
      return 'red'
    } else {
      return 'yellow';
    } 
  });
  return colors;
};

const riskData = predictionList.map((value, index) => ( { x: index, y: 0, color: renderBorderColor()[index]} ));

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: predictionList,    
      pointRadius: 0,
      borderColor: 'black'
    },
    {
      label: 'Dataset 2',
      data: averageList,
      pointRadius: 0,
      borderColor: '#3861fb',
      borderDash: [5, 5],
      borderWidth: 4,
      shadingRange: avarageRanges
    },
    {
      label: 'Dataset 3',
      data: riskData,
      pointRadius: 0
    }
  ],
};

const ChartTwo = () => {
  const chartRef = useRef<ChartJS>(null);
  const [activeTab, setActiveTab] = useState<string>('month');
  
  const shadingArea = {
    id: 'shadingArea',
    beforeDraw: (chart: any) => {
      const {ctx, scales: {x, y}} = chart;           
      chart.data.datasets[2].data.forEach((value: any, index: number) => {
        if (index > 0) {               
          const valueFrom = riskData[index - 1];          
          const xFrom = x.getPixelForValue(valueFrom.x);     
          const yFrom = y.getPixelForValue(valueFrom.y);
          const xTo = x.getPixelForValue(value.x);         
          const yTo = y.getPixelForValue(value.y); 
          ctx.save();           
          ctx.strokeStyle = valueFrom.color;          
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.moveTo(xFrom, yFrom);             
          ctx.lineTo(xTo, yTo);
          ctx.stroke();
          ctx.restore();
        }
      });
    },
    beforeDatasetsDraw: (chart: any) => {
      const {ctx, scales: { y }} = chart;
  
      const tickHeight = y.height / y.max;
  
      const datapointsLength = chart.data.labels.length;
  
      ctx.save();
      ctx.beginPath();
  
      ctx.fillStyle = 'rgba(90, 187, 228, 0.15)';
  
      if (chart.data.datasets[1]?.shadingRange?.length > 0) {
        ctx.moveTo(chart.getDatasetMeta(1).data[0].x, chart.getDatasetMeta(1).data[0].y + tickHeight * chart.data.datasets[1]?.shadingRange[0]?.min);
        for (let i = 1; i < datapointsLength; i++) {
            ctx.lineTo(chart.getDatasetMeta(1).data[i]?.x, chart.getDatasetMeta(1).data[i]?.y + tickHeight * chart.data.datasets[1]?.shadingRange[i]?.min);
        }
        for (let z = datapointsLength - 1; 0 < z; z--) {
            ctx.lineTo(chart.getDatasetMeta(1).data[z]?.x, chart.getDatasetMeta(1).data[z]?.y - tickHeight * chart.data.datasets[1]?.shadingRange[z]?.max);
        }
  
        ctx.lineTo(chart.getDatasetMeta(1).data[0].x, chart.getDatasetMeta(1).data[0].y - tickHeight * chart.data.datasets[1]?.shadingRange[0]?.max);
      }    
  
      ctx.closePath();
      ctx.fill();
    }
  };

  return (
    <div className='chart-two card'>
      <div className="chart-two-header">
        <h3>Growing Season Cumulative Precipitation</h3>
        <div className="plan-tab">
          <div className={`plan-tab-item month ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>MTH</div>
          <div className={`plan-tab-item year ${activeTab === 'year' ? 'active' : ''}`} onClick={() => setActiveTab('year')}>YR</div>
        </div>
      </div>
      <Chart ref={chartRef} type='line' options={options} data={data} plugins={[shadingArea]} />
    </div>
  );
};

export default ChartTwo;

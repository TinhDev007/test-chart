import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import annotationPlugin from "chartjs-plugin-annotation";

import ChartOne from './components/ChartOne';
import ChartTwo from './components/ChartTwo';

import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  Filler
);

const App = () => {
  return (
    <div className='app'>
      <ChartOne />
      <ChartTwo />
    </div>
  );
}

export default App;

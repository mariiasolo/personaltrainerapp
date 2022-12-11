import {useEffect, useState} from 'react';
import { API_URL } from '../constants';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip, 
    Legend
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip, 
    Legend
  );

function Stats () {
   
  const [dataBarchart, setDataBarchart] = useState({
    labels:[],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: '',
   }]
  });

    
  useEffect(() => { 
    fetchData(); 
  }, [])
    
    
  const fetchData = () => {
    const trainingActivity = []
    const trainingDuration = [];
      fetch(API_URL + '/gettrainings')
      .then(response => {
        if(response.ok) {
          return response.json(); 
        } else throw new Error (response.status)
      })
      .then(responseData => {
        for (const data of responseData) {
          trainingDuration.push(data.duration); 
          trainingActivity.push(data.activity); 
        }
        setDataBarchart({
          labels:trainingActivity,
          datasets: [{
            label: 'Duration per activity in minutes',
            data: trainingDuration,
            backgroundColor: '#CBC3E3',
            hoverBackgroundColor: "#FFC72C",
            display: true
          }]
        })
      }
      )
      .catch(err => console.error(err))
    }

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
      borderWidth: 1,
      display: true,
      dataLabels: {
        position: 'top', 
      },
      },
    },
    responsive: true,
      plugins: {
        datalabels: {
          anchor: 'center',
          align: 'center',
          color: 'white',        
          font: {
            weight: 'bold'
          },
          formatter: Math.round
        },
        legend: {
          position: 'right',
          },
          title: {
            display: true,
            text: 'Duration of training activities',
          },
      },
    };
    
    return(
        <div style={{width:'90%', height:'60%', margin: 100}}>
            <Bar data={dataBarchart} options={options}/>
         </div>)
}

export default Stats;

// colors are chosen from https://cssgradient.io/
// idea for bar chart code is from https://stackoverflow.com/questions/74280609/how-to-make-chart-js-display-values-in-real-time
// 
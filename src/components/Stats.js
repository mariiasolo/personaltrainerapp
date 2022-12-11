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
            hoverBackgroundColor: "blue",
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
        position: 'top', // top, center, bottom
      },
         

    },
    },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            
            
          },
          title: {
            display: true,
            text: 'Duration of training activities',
          },
        },
      };
    
    return(
        <div style={{width:'80%', height:'50%', margin: 100}}>
            <Bar data={dataBarchart} options={options}/>
         </div>)
}

export default Stats;
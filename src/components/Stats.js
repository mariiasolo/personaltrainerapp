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
   
    const [chartTraining, setChartTraining] = useState({
        labels:[],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: ''
          }
        ]
      });

    
    useEffect(() => { 
        fetchData(); 
    }, [])
    
    
    const fetchData = () => {
        const activity = []
        const duration = [];
        fetch(API_URL + '/gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => {
            for (const data of responseData) {
                duration.push(data.duration); 
                activity.push(data.activity); 
            }
            setChartTraining({
                labels:activity,
                datasets: [
                  {
                    label: 'Duration',
                    data: duration,
                    backgroundColor: 'pink'
                  }
                ]
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
            <Bar data={chartTraining} options={options}/>
         </div>)
}

export default Stats;
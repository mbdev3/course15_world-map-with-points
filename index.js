import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';
import {scaleSqrt,max} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;


const App = () => {
  const worldAtlas = useWorldAtlas();
   const cities = useCities();
 
  if (!worldAtlas || !cities ) {
    return <pre>loading..</pre>;
  }
  const sizeValue = d => d.population
  const maxRadius = 15
const sizeScale = scaleSqrt().domain([0,max(cities,sizeValue)]).range([0,maxRadius])
console.log(typeof(sizeValue(cities[0])))  
return (
    <svg width={width} height={height}>
     
        
        
        <Marks
          worldAtlas={worldAtlas}
         cities={cities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
     		
    </svg>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);

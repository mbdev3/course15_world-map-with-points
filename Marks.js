import {
  geoEqualEarth,
  geoPath,
  geoNaturalEarth1,
  geoGraticule,
} from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
export const Marks = ({
  worldAtlas: { land, interiors },
  cities,sizeScale,sizeValue
}) => (
  <g className="mark">
    <path
      className="sphere"
      d={path({ type: 'Sphere' })}
    />
    <path
      className="graticules"
      d={path(graticule())}
    />
    {land.features.map((feature) => (
      <path className="land" d={path(feature)} />
    ))}
    {cities.map((city) => {
      const [x, y] = projection([
        city.lng,
        city.lat,
      ]);

      return(
      <circle className='cities' cx={x} cy={y} r={sizeScale(sizeValue(city))} />)
    })}
    <path
      className="interiors"
      d={path(interiors)}
    />
    
  </g>
);

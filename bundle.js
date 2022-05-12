(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const jsonUrl =
    'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useWorldAtlas = () => {
    const [data, setData] = React$1.useState(null);
    // console.log(data);
    React$1.useEffect(() => {
      d3.json(jsonUrl).then((topology) => {
        const {countries,land} = topology.objects;
        setData({land:topojson.feature(topology, land),
                interiors:topojson.mesh(topology,countries,(a,b)=>a!==b)});
      });
    }, []);
    return data;
  };

  const csvUrl =
    'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

  const row = d => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
  };

  const useCities = () => {
    const [data, setData] = React$1.useState(null);
   // console.log(data);
    React$1.useEffect(() => {
      d3.csv(csvUrl,row).then(setData);
    }, []);
    return data;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();
  const Marks = ({
    worldAtlas: { land, interiors },
    cities,sizeScale,sizeValue
  }) => (
    React.createElement( 'g', { className: "mark" },
      React.createElement( 'path', {
        className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', {
        className: "graticules", d: path(graticule()) }),
      land.features.map((feature) => (
        React.createElement( 'path', { className: "land", d: path(feature) })
      )),
      cities.map((city) => {
        const [x, y] = projection([
          city.lng,
          city.lat,
        ]);

        return(
        React.createElement( 'circle', { className: 'cities', cx: x, cy: y, r: sizeScale(sizeValue(city)) }))
      }),
      React.createElement( 'path', {
        className: "interiors", d: path(interiors) })
      
    )
  );

  const width = window.innerWidth;
  const height = window.innerHeight;


  const App = () => {
    const worldAtlas = useWorldAtlas();
     const cities = useCities();
   
    if (!worldAtlas || !cities ) {
      return React$1__default.createElement( 'pre', null, "loading.." );
    }
    const sizeValue = d => d.population;
    const maxRadius = 15;
  const sizeScale = d3.scaleSqrt().domain([0,d3.max(cities,sizeValue)]).range([0,maxRadius]);
  console.log(typeof(sizeValue(cities[0])));  
  return (
      React$1__default.createElement( 'svg', { width: width, height: height },
       
          
          
          React$1__default.createElement( Marks, {
            worldAtlas: worldAtlas, cities: cities, sizeScale: sizeScale, sizeValue: sizeValue })
       		
      )
    );
  };

  const rootElement = document.getElementById(
    'root'
  );
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZVdvcmxkQXRsYXMuanMiLCJ1c2VDaXRpZXMuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc29uIH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgZmVhdHVyZSAsbWVzaH0gZnJvbSAndG9wb2pzb24nO1xuY29uc3QganNvblVybCA9XG4gICdodHRwczovL3VucGtnLmNvbS93b3JsZC1hdGxhc0AyLjAuMi9jb3VudHJpZXMtNTBtLmpzb24nO1xuXG5leHBvcnQgY29uc3QgdXNlV29ybGRBdGxhcyA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGpzb24oanNvblVybCkudGhlbigodG9wb2xvZ3kpID0+IHtcbiAgICAgIGNvbnN0IHtjb3VudHJpZXMsbGFuZH0gPSB0b3BvbG9neS5vYmplY3RzXG4gICAgICBzZXREYXRhKHtsYW5kOmZlYXR1cmUodG9wb2xvZ3ksIGxhbmQpLFxuICAgICAgICAgICAgICBpbnRlcmlvcnM6bWVzaCh0b3BvbG9neSxjb3VudHJpZXMsKGEsYik9PmEhPT1iKX0pO1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9XG4gICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2N1cnJhbi8xM2QzMGU4NTVkNDhjZGQ2ZjIyYWNkZjBhZmUyNzI4Ni9yYXcvMDYzNWYxNDgxN2VjNjM0ODMzYmI5MDRhNDc1OTRjYzJmNWY5ZGJmOC93b3JsZGNpdGllc19jbGVhbi5jc3YnO1xuXG5jb25zdCByb3cgPSBkID0+IHtcbiAgZC5sYXQgPSArZC5sYXQ7XG4gIGQubG5nID0gK2QubG5nO1xuICBkLnBvcHVsYXRpb24gPSArZC5wb3B1bGF0aW9uO1xuICByZXR1cm4gZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VDaXRpZXMgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNzdihjc3ZVcmwscm93KS50aGVuKHNldERhdGEpO1xuICB9LCBbXSk7XG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7XG4gIGdlb0VxdWFsRWFydGgsXG4gIGdlb1BhdGgsXG4gIGdlb05hdHVyYWxFYXJ0aDEsXG4gIGdlb0dyYXRpY3VsZSxcbn0gZnJvbSAnZDMnO1xuXG5jb25zdCBwcm9qZWN0aW9uID0gZ2VvTmF0dXJhbEVhcnRoMSgpO1xuY29uc3QgcGF0aCA9IGdlb1BhdGgocHJvamVjdGlvbik7XG5jb25zdCBncmF0aWN1bGUgPSBnZW9HcmF0aWN1bGUoKTtcbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIHdvcmxkQXRsYXM6IHsgbGFuZCwgaW50ZXJpb3JzIH0sXG4gIGNpdGllcyxzaXplU2NhbGUsc2l6ZVZhbHVlXG59KSA9PiAoXG4gIDxnIGNsYXNzTmFtZT1cIm1hcmtcIj5cbiAgICA8cGF0aFxuICAgICAgY2xhc3NOYW1lPVwic3BoZXJlXCJcbiAgICAgIGQ9e3BhdGgoeyB0eXBlOiAnU3BoZXJlJyB9KX1cbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBjbGFzc05hbWU9XCJncmF0aWN1bGVzXCJcbiAgICAgIGQ9e3BhdGgoZ3JhdGljdWxlKCkpfVxuICAgIC8+XG4gICAge2xhbmQuZmVhdHVyZXMubWFwKChmZWF0dXJlKSA9PiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJsYW5kXCIgZD17cGF0aChmZWF0dXJlKX0gLz5cbiAgICApKX1cbiAgICB7Y2l0aWVzLm1hcCgoY2l0eSkgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gcHJvamVjdGlvbihbXG4gICAgICAgIGNpdHkubG5nLFxuICAgICAgICBjaXR5LmxhdCxcbiAgICAgIF0pO1xuXG4gICAgICByZXR1cm4oXG4gICAgICA8Y2lyY2xlIGNsYXNzTmFtZT0nY2l0aWVzJyBjeD17eH0gY3k9e3l9IHI9e3NpemVTY2FsZShzaXplVmFsdWUoY2l0eSkpfSAvPilcbiAgICB9KX1cbiAgICA8cGF0aFxuICAgICAgY2xhc3NOYW1lPVwiaW50ZXJpb3JzXCJcbiAgICAgIGQ9e3BhdGgoaW50ZXJpb3JzKX1cbiAgICAvPlxuICAgIFxuICA8L2c+XG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VDYWxsYmFjayxcbiAgdXNlRWZmZWN0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IHVzZVdvcmxkQXRsYXMgfSBmcm9tICcuL3VzZVdvcmxkQXRsYXMnO1xuaW1wb3J0IHsgdXNlQ2l0aWVzIH0gZnJvbSAnLi91c2VDaXRpZXMnO1xuaW1wb3J0IHsgTWFya3MgfSBmcm9tICcuL01hcmtzJztcbmltcG9ydCB7c2NhbGVTcXJ0LG1heH0gZnJvbSAnZDMnO1xuXG5jb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3Qgd29ybGRBdGxhcyA9IHVzZVdvcmxkQXRsYXMoKTtcbiAgIGNvbnN0IGNpdGllcyA9IHVzZUNpdGllcygpO1xuIFxuICBpZiAoIXdvcmxkQXRsYXMgfHwgIWNpdGllcyApIHtcbiAgICByZXR1cm4gPHByZT5sb2FkaW5nLi48L3ByZT47XG4gIH1cbiAgY29uc3Qgc2l6ZVZhbHVlID0gZCA9PiBkLnBvcHVsYXRpb25cbiAgY29uc3QgbWF4UmFkaXVzID0gMTVcbmNvbnN0IHNpemVTY2FsZSA9IHNjYWxlU3FydCgpLmRvbWFpbihbMCxtYXgoY2l0aWVzLHNpemVWYWx1ZSldKS5yYW5nZShbMCxtYXhSYWRpdXNdKVxuY29uc29sZS5sb2codHlwZW9mKHNpemVWYWx1ZShjaXRpZXNbMF0pKSkgIFxucmV0dXJuIChcbiAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICA8TWFya3NcbiAgICAgICAgICB3b3JsZEF0bGFzPXt3b3JsZEF0bGFzfVxuICAgICAgICAgY2l0aWVzPXtjaXRpZXN9XG4gICAgICAgICAgc2l6ZVNjYWxlPXtzaXplU2NhbGV9XG4gICAgICAgICAgc2l6ZVZhbHVlPXtzaXplVmFsdWV9XG4gICAgICAgIC8+XG4gICAgIFx0XHRcbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICdyb290J1xuKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJqc29uIiwiZmVhdHVyZSIsIm1lc2giLCJjc3YiLCJnZW9OYXR1cmFsRWFydGgxIiwiZ2VvUGF0aCIsImdlb0dyYXRpY3VsZSIsIlJlYWN0Iiwic2NhbGVTcXJ0IiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFHQSxNQUFNLE9BQU87RUFDYixFQUFFLHdEQUF3RCxDQUFDO0FBQzNEO0VBQ08sTUFBTSxhQUFhLEdBQUcsTUFBTTtFQUNuQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUdBLGdCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDekM7RUFDQSxFQUFFQyxpQkFBUyxDQUFDLE1BQU07RUFDbEIsSUFBSUMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFD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
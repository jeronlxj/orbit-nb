import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, 
  AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';


const Pie = ({ data }) => {
  const tooltip = {
    enable: true, header: 'Vacancy State',
    format: '<b>${point.x} : ${point.y}%</b>'
  };

  return (
    <AccumulationChartComponent id='charts'
    legendSettings={{ background: 'white' }} background='#fff' tooltip={tooltip}
    title="Vacancy State of Facilities for this Month">
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Vacancy State" dataSource={data} xName="x" yName="y" innerRadius="40%"
          startAngle={0} endAngle={360} radius="70%" type='Pie'
          explode explodeOffset="10%" explodeIndex={2} dataLabel={{
            visible: true, name: 'text', position: 'Inside', font: { fontWeight: '600', color: '#fff',},
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

export default Pie
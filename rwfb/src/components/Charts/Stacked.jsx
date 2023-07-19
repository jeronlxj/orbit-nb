import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, 
  Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts'

const Stacked = ({dataPending, dataReviewed, dataApproved}) => {

  const primaryxAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    edgeLabelPlacement: 'Shift',
    valueType: 'Category',
    title: 'Month'
  };
  
  const primaryyAxis = {
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    title: 'Num of Bookings'
  };

  const tooltip = {
    enable: true, header: 'Num of Bookings',
    format: '<b>${series.name} ${point.x} : ${point.y}</b>'
  };

  return (
    <ChartComponent id="charts" chartArea={{border:{width:0}}}
    background='#fff' LegendSettings={{background:'white'}}
    primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} tooltip={tooltip} 
    title="Num of Different Types of Bookings for Latest 3 Months" width="600px" height ="600px">
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={dataPending} xName='x' yName='y' type='StackingColumn' 
        name='Pending' fill='gray' />
        <SeriesDirective dataSource={dataReviewed} xName='x' yName='y' type='StackingColumn' 
        name='Reviewed' fill='pink' />
        <SeriesDirective dataSource={dataApproved} xName='x' yName='y' type='StackingColumn' 
        name='Approved' fill='green' />
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked
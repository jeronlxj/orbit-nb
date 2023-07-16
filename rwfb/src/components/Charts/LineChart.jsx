import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, 
  DateTime, Legend, Tooltip} from '@syncfusion/ej2-react-charts'

const LineChart = ({data}) => {

  // function getMonthName(monthNumber) {
  //   const months = [
  //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  //   ];
    
  //   if (monthNumber >= 0 && monthNumber <= 11) {
  //     return months[monthNumber];
  //   } else {
  //     return 'Invalid month number';
  //   }
  // } 

  // const axisLabelRender = (args) => {
  //   if(!(isNaN(args))){
  //     args.text = getMonthName(args.text);
  //   }
  // }
  const primaryxAxis = {valueType: 'DateTime', intervalType: 'Months',
    title: 'Month', labelFormat: 'MMM', edgeLabelPlacement: 'Shift'};

  const primaryyAxis = {title: 'Num of Bookings'}

  const marker = { visible: true, width: 10, height: 10 };

  const tooltip = {
    enable: true, header: 'Num of Bookings',
    format: '<b>${point.x} : ${point.y}</b>'
  };

  return (
    <ChartComponent id="line-chart" 
    primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} tooltip={tooltip} 
    title="Num of Bookings for Latest 5 Months">
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName='x' yName='y' type='Line' 
        width={2} marker={marker}/>
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default LineChart
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
  const primaryxAxis = {valueType: 'DateTime', title: 'Month', labelFormat: 'MMM'};

  return (
    <ChartComponent id="line-chart" primaryXAxis={primaryxAxis}>
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data}/>
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default LineChart
import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts'

const Stacked = ({width, height}) => {
  return (
    <>
    <h1>yooooo</h1>
    <ChartComponent width={width} height={height} id="charts" chartArea={{border:{width:0}}} tooltip={{enable:true}} LegendSettings={{background:'white'}}>
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      {/* <SeriesCollectionDirective>

      </SeriesCollectionDirective> */}
    </ChartComponent>
    </>
  )
}

export default Stacked
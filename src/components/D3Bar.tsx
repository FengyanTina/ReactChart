// // BarChart.tsx
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// type BarChartProps = {
//   data: number[];
//   width: number;
//   height: number;
// };

// const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     // Set up the SVG canvas dimensions
//     const svg = d3.select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height);

//     // Define scales
//     const xScale = d3.scaleBand()
//       .domain(d3.range(data.length) as any) // Create range based on number of data points
//       .range([0, width])
//       .padding(0.1);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data) || 0])
//       .range([height, 0]);

//     // Create bars for each data point
//     svg.selectAll("rect")
//       .data(data)
//       .join("rect")
//       .attr("x", (d, i) => {
//         const x = xScale(i);
//         if (x === undefined) return "0"; // Ensure it's a string
//         return x.toString(); // Convert number to string
//       })
//       .attr("y", (d) => {
//         const y = yScale(d);
//         if (y === undefined) return "0"; // Ensure it's a string
//         return y.toString(); // Convert number to string
//       })
//       .attr("width", () => {
//         const bandwidth = xScale.bandwidth();
//         if (bandwidth === undefined) return "0"; // Ensure it's a string
//         return bandwidth.toString(); // Convert number to string
//       })
//       .attr("height", (d) => {
//         const heightValue = height - yScale(d);
//         if (heightValue === undefined) return "0"; // Ensure it's a string
//         return heightValue.toString(); // Convert number to string
//       })
//       .attr("fill", "steelblue");

//     // Add y-axis
//     svg.append("g")
//       .call(d3.axisLeft(yScale));

//   }, [data, width, height]);

//   return <svg ref={svgRef}></svg>;
// };

// export default BarChart;

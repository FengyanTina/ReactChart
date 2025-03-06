import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";



const SunburstJs = ({ data }) => {
    const svgRef = useRef();
    const [centerText, setCenterText] = useState("2025");
  
    useEffect(() => {
      if (!data) return;
  
      const width = 828;
      const radius = width / 6;
      const svg = d3.select(svgRef.current);
  
      // Clear previous chart before rendering new one
      svg.selectAll("*").remove();
  
      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  
      const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      const hierarchy = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => {
          return monthOrder.indexOf(a.data.name) - monthOrder.indexOf(b.data.name);
        });
  
      const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
      root.each((d) => (d.current = d));
  
      const arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));
  
      svg
        .attr("viewBox", [-width / 2 - 100, -width / 2 - 100, width + 200, width + 200])
        .style("font", "10px sans-serif");
  
      const path = svg
        .append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        .attr("fill-opacity", (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
        .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
        .attr("d", (d) => arc(d.current));
  
      path.filter((d) => d.children).style("cursor", "pointer").on("click", clicked);
  
      const label = svg
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", (d) => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .text((d) => d.data.name);
  
      const parent = svg
        .append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);
  
      const centerTextElement = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", "#333")
        .text(centerText)
        .style("cursor", "pointer")
        .on("click", () => setCenterText("2025"));




   /// Assuming `root` is the root of your hierarchy and `svg` is your SVG container
// Also assuming `monthOrder` is an array of month names in order






     function clicked(event, p) {
        if (p && p.depth === 1) {
          setCenterText(p.data.name);
        }
  
        parent.datum(p.parent || root);
        root.each((d) => {
          d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          };
        });
  
        const t = svg.transition().duration(750);
  
        path
          .transition(t)
          .tween("data", (d) => {
            const i = d3.interpolate(d.current, d.target);
            return (t) => (d.current = i(t));
          })
          .attr("fill-opacity", (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
          .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
          .attrTween("d", (d) => () => arc(d.current));
  
        label
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          })
          .transition(t)
          .attr("fill-opacity", (d) => +labelVisible(d.target))
          .attrTween("transform", (d) => () => labelTransform(d.current));
  
        //   centerTextElement.text(
        //     p.depth === 0
        //       ? "2025" // For depth 0 (root node)
        //       : p.depth === 1
        //       ? p.data.name // For depth 1 (months)
        //       : `${p.parent.data.name} ${p.data.name}` // For depth 2 (departments), show month name + department name, not tasks
        //   );
       
        centerTextElement.text(""); // Clear the text content

        // First tspan for the Month or Year (depending on depth)
        centerTextElement
          .append("tspan")
          .attr("text-anchor", "middle")
          .attr("dy", p.depth === 2 ? "-1.2em" : "0")  // For dept 2: Move the month above the department
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .style("fill", "#333")
          .text(
            p.depth === 0
              ? "2025" // For depth 0 (root node)
              : p.depth === 1
              ? p.data.name // For depth 1 (month)
              : p.parent.data.name // For depth 2, show the month name
          );
        
        // Second tspan for the Department Name (if depth 2)
        if (p.depth === 2) {
          centerTextElement
            .append("tspan")
            .attr("text-anchor", "middle")
            .attr("dy", "1.2em")  // Position the department below the month
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .text(p.data.name);  // Department name
        }
        
      }
  
      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }
  
      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }
  
      function labelTransform(d) {
        const x = ((d.x0 + d.x1) / 2) * (180 / Math.PI);
        const y = ((d.y0 + d.y1) / 2) * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
    }, [centerText,data]); // Removed 'centerText' to prevent infinite re-renders
  
    return <svg ref={svgRef}></svg>;
  };
  

export default SunburstJs ;

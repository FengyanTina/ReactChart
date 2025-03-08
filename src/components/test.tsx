import React, { useState } from "react";
import Plot from "react-plotly.js";
import { Container, Typography } from "@mui/material";

// 定义节点类型
interface Node {
  name: string;
  value?: number;
  time?: number;
  children?: Node[];
}

// 定义转换后的数据格式
interface ChartData {
  labels: string[];
  parents: string[];
  values: number[];
  hoverText: string[];
}

// 定义旭日图数据点的类型
interface SunburstDatum extends Plotly.PlotDatum {
  label: string;
  value: number;
  parent: string;
}
interface Task {
    department: string;
    taskName: string;
    timeRequired: string;
    deadline: string;
    details?: string;
  }

  interface SunburstChartTypeProps {
    tasks: Task[];
  }
const Test: React.FC = () => {
  // 示例数据：按年份、月份、部门和任务组织
  const data: Node = {
    name: "2023",
    children: [
      {
        name: "1月",
        value: 45,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务A", value: 10, time: 5 },
              { name: "任务B", value: 15, time: 8 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务C", value: 8, time: 4 },
              { name: "任务D", value: 12, time: 6 },
            ],
          },
        ],
      },
      {
        name: "2月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      {
        name: "3月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      {
        name: "4月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      {
        name: "5月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      {
        name: "6月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      {
        name: "7月",
        value: 50,
        children: [
          {
            name: "研发部",
            children: [
              { name: "任务E", value: 20, time: 10 },
              { name: "任务F", value: 10, time: 5 },
            ],
          },
          {
            name: "市场部",
            children: [
              { name: "任务G", value: 15, time: 7 },
              { name: "任务H", value: 5, time: 3 },
            ],
          },
        ],
      },
      // 其他月份数据...
    ],
  };

  // 将数据转换为 Plotly 旭日图格式
  const transformData = (data: Node, parent: string = ""): ChartData => {
    const labels: string[] = [];
    const parents: string[] = [];
    const values: number[] = [];
    const hoverText: string[] = [];

    const processNode = (node: Node, parent: string) => {
      const uniqueLabel = parent ? `${parent}-${node.name}` : node.name; // 确保唯一性
      labels.push(uniqueLabel);
      parents.push(parent);
      values.push(node.value || node.children?.reduce((sum, child) => sum + (child.value || 0), 0) || 0);
      hoverText.push(
        node.time ? `任务量: ${node.value}, 完成时间: ${node.time}天` : node.name
      );

      if (node.children) {
        node.children.forEach((child) => processNode(child, uniqueLabel)); // 传递唯一 label 作为 parent
      }
    };

    processNode(data, parent);
    return { labels, parents, values, hoverText };
  };

  // 初始图表数据
  const [chartData, setChartData] = useState<ChartData>(transformData(data));

  // 处理点击事件
  const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    const { points } = event;
    if (points && points[0]) {
      const clickedPoint = points[0] as SunburstDatum;
      const clickedLabel = clickedPoint.label;
  
      // If the clicked label is the root (year), reset to the full dataset
      if (clickedLabel === data.name) {
        setChartData(transformData(data)); // Reset to full chart
        return;
      }
  
      // Function to find the clicked node
      const findNode = (node: Node, target: string): Node | null => {
        if (node.name === target) return node;
        if (node.children) {
          for (let child of node.children) {
            const result = findNode(child, target);
            if (result) return result;
          }
        }
        return null;
      };
  
      const clickedNode = findNode(data, clickedLabel);
      if (clickedNode && clickedNode.children) {
        setChartData(transformData(clickedNode, clickedNode.name)); // Zoom into the selected section
      }
    }
  };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        公司各部门工作任务全景旭日图
      </Typography>
      <Plot
  data={[
    {
      type: "sunburst",
      labels: chartData.labels,
      parents: chartData.parents,
      values: chartData.values,
      text: chartData.hoverText,
      hoverinfo: "text", // 修改为 "text" 或 "label" 或 "all"
      marker: { colors: ["#FF6F61", "#6B5B95",] },
      branchvalues: "total",
    },
    
  ]}
  layout={{
    title: "2023年各部门任务分布",
    margin: { l: 0, r: 0, b: 0, t: 40 },
  }}
  
  onClick={handleClick}
  style={{ width: "100%", height: "800px" }}
/>
    </Container>
  );
};

export default Test;
import { Paper } from "@mui/material";
import React, { useState } from "react";

// 定义状态类型
type Status = "planning" | "doing" | "complete";

// 定义颜色
const statusColors: Record<Status, string> = {
  planning: '#8BB3FF', // Slightly darker blue
  doing: '#92C57B', // Slightly darker green
  complete: '#BDBDBD', // Slightly darker gray
};

// 定义数据
export interface BarData {
  task: string;
  value: number;
  status: Status;
}

// 条状图组件
export const BarChart: React.FC<{ data: BarData[] }> = ({ data }) => {
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        content: string;
        x: number;
        y: number;
      }>({
        visible: false,
        content: "",
        x: 0,
        y: 0,
      });
    
      // 显示 Tooltip
      const showTooltip = (event: React.MouseEvent, item: BarData) => {
        setTooltip({
          visible: true,
          content: `Task: ${item.task}, Status: ${item.status}`,
          x: event.clientX + 10, // 水平偏移量
          y: event.clientY + 10, // 垂直偏移量
        });
      };
    
      // 隐藏 Tooltip
      const hideTooltip = () => {
        setTooltip({
          visible: false,
          content: "",
          x: 0,
          y: 0,
        });
      };
      const updateTooltipPosition = (event: React.MouseEvent) => {
        if (tooltip.visible) {
          setTooltip((prev) => ({
            ...prev,
            x: event.clientX + 10, // 水平偏移量
            y: event.clientY + 10, // 垂直偏移量
          }));
        }
      };
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative", // 用于定位 Tooltip
        }}
        onMouseMove={updateTooltipPosition} // 监听鼠标移动事件
        >
          {/* 图例 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              fontSize: "12px",
            }}
          >
            {Object.entries(statusColors).map(([status, color]) => (
              <div
                key={status}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "4px",
                    backgroundColor: color,
                  }}
                />
                <span>{status}</span>
              </div>
            ))}
          </div>
    
          {/* 柱子 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "70px",
              gap: "5px",
              
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "10px",
                  height: `50px`,
                  backgroundColor: statusColors[item.status],
                  
                }}
                onMouseEnter={(e) => showTooltip(e, item)}
            onMouseLeave={hideTooltip}
              />
            ))}
          </div>
    
          {/* 横轴坐标 */}
          <div
            style={{
              display: "flex",
              gap: "5px",
             
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                    width: "10px",
                    textAlign: "center",
                    fontSize: "10px",
                    transform: "rotate(45deg)",
                    transformOrigin: "left bottom",
                   
                    
                  }}
              >
                {item.task}
              </div>
            ))}
          </div>
          <div
        style={{
          fontSize: "12px",
          transform: "translateY(10px)",
        }}
      >
        March (2025)
      </div>
      {tooltip.visible && (
        <Paper
          style={{
            position: "fixed", // 使用 fixed 定位
            left: tooltip.x, // 水平位置
            top: tooltip.y, // 垂直位置
            backgroundColor: "white",
            color: "black",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none", // 防止 Tooltip 干扰鼠标事件
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // 添加阴影
          }}
        >
          {tooltip.content}
        </Paper>
      )}
        </div>
      );
    };
    
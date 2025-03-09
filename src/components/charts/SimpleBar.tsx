import React from "react";

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
  week: string;
  value: number;
  status: Status;
}

// 条状图组件
export const BarChart: React.FC<{ data: BarData[] }> = ({ data }) => {
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
              height: "100px",
              gap: "5px",
              padding: "10px",
              
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
                  fontSize: "12px",
                }}
              >
                {item.week}
              </div>
            ))}
          </div>
        </div>
      );
    };
    
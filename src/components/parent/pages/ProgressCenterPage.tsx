import React, { useState, useEffect } from "react";
import { SafeArea } from "../../SafeArea";
import { ControlPanelIcon } from "../../icons";

interface LineChartProps {
  data: {
    abc: number[];
    math: number[];
    labels: string[];
  };
}

function LineChart({ data }: LineChartProps) {
  // SVG dimensions
  const width = 600;
  const height = 300;
  const padding = { top: 20, right: 30, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find max value for scaling
  const maxValue = Math.max(...data.abc, ...data.math);

  // Scale values to fit chart height
  const scaleY = (value: number) => {
    return chartHeight - (value / maxValue) * chartHeight + padding.top;
  };

  // Create points for each line
  const createPoints = (values: number[]) => {
    return values
      .map((value, index) => {
        const x =
          (index / (data.labels.length - 1)) * chartWidth + padding.left;
        const y = scaleY(value);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Create path for each line
  const createPath = (values: number[]) => {
    let path = `M `;
    values.forEach((value, index) => {
      const x = (index / (data.labels.length - 1)) * chartWidth + padding.left;
      const y = scaleY(value);
      if (index === 0) {
        path += `${x},${y} `;
      } else {
        path += `L ${x},${y} `;
      }
    });
    return path;
  };

  const abcPoints = createPoints(data.abc);
  const mathPoints = createPoints(data.math);
  const abcPath = createPath(data.abc);
  const mathPath = createPath(data.math);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* X-axis */}
        <line
          x1={padding.left}
          y1={chartHeight + padding.top}
          x2={chartWidth + padding.left}
          y2={chartHeight + padding.top}
          stroke="#E0E0E0"
          strokeWidth="1"
        />

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={chartHeight + padding.top}
          stroke="#E0E0E0"
          strokeWidth="1"
        />

        {/* X-axis labels */}
        {data.labels.map((label, index) => {
          const x =
            (index / (data.labels.length - 1)) * chartWidth + padding.left;
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={chartHeight + padding.top + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {label}
            </text>
          );
        })}

        {/* ABC Learning Line */}
        <defs>
          <linearGradient id="abcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16BDFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#16BDFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`${abcPath} L ${chartWidth + padding.left},${
            chartHeight + padding.top
          } L ${padding.left},${chartHeight + padding.top} Z`}
          fill="url(#abcGradient)"
          opacity="0.5"
        />
        <path d={abcPath} stroke="#16BDFF" strokeWidth="3" fill="none" />
        <polyline
          points={abcPoints}
          fill="none"
          stroke="#16BDFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Math Line */}
        <defs>
          <linearGradient id="mathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9E2D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF9E2D" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`${mathPath} L ${chartWidth + padding.left},${
            chartHeight + padding.top
          } L ${padding.left},${chartHeight + padding.top} Z`}
          fill="url(#mathGradient)"
          opacity="0.5"
        />
        <path d={mathPath} stroke="#FF9E2D" strokeWidth="3" fill="none" />
        <polyline
          points={mathPoints}
          fill="none"
          stroke="#FF9E2D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points for ABC Learning */}
        {data.abc.map((value, index) => {
          const x =
            (index / (data.labels.length - 1)) * chartWidth + padding.left;
          const y = scaleY(value);
          return (
            <circle
              key={`abc-point-${index}`}
              cx={x}
              cy={y}
              r="5"
              fill="#FFFFFF"
              stroke="#16BDFF"
              strokeWidth="2"
            />
          );
        })}

        {/* Data points for Math */}
        {data.math.map((value, index) => {
          const x =
            (index / (data.labels.length - 1)) * chartWidth + padding.left;
          const y = scaleY(value);
          return (
            <circle
              key={`math-point-${index}`}
              cx={x}
              cy={y}
              r="5"
              fill="#FFFFFF"
              stroke="#FF9E2D"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center mt-4 gap-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#16BDFF] rounded-full mr-2"></div>
          <span className="text-sm font-medium">ABC Learning</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#FF9E2D] rounded-full mr-2"></div>
          <span className="text-sm font-medium">Math</span>
        </div>
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

function DonutChart({ data }: DonutChartProps) {
  // SVG dimensions
  const size = 300;
  const radius = size / 2;
  const innerRadius = radius * 0.6; // Inner circle size (creates the donut hole)
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Generate pie segments
  const segments = [];
  let currentAngle = 0;

  for (const item of data) {
    // Calculate angle for this segment
    const angle = (item.value / total) * 360;

    // Convert angles to radians for calculations
    const startAngle = currentAngle * (Math.PI / 180);
    const endAngle = (currentAngle + angle) * (Math.PI / 180);

    // Calculate path coordinates
    const startX = centerX + radius * Math.sin(startAngle);
    const startY = centerY - radius * Math.cos(startAngle);
    const endX = centerX + radius * Math.sin(endAngle);
    const endY = centerY - radius * Math.cos(endAngle);

    // Inner arc points
    const innerStartX = centerX + innerRadius * Math.sin(startAngle);
    const innerStartY = centerY - innerRadius * Math.cos(startAngle);
    const innerEndX = centerX + innerRadius * Math.sin(endAngle);
    const innerEndY = centerY - innerRadius * Math.cos(endAngle);

    // Determine if the arc should be drawn as the "large arc"
    const largeArcFlag = angle > 180 ? 1 : 0;

    // Create SVG path
    const path = [
      `M ${innerStartX} ${innerStartY}`, // Move to inner start point
      `L ${startX} ${startY}`, // Line to outer start point
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Outer arc
      `L ${innerEndX} ${innerEndY}`, // Line to inner end point
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Inner arc (note the 0 sweep flag to go the other way)
      "Z", // Close path
    ].join(" ");

    // Add segment to array
    segments.push({
      path,
      color: item.color,
      name: item.name,
      value: item.value,
      percentage: Math.round((item.value / total) * 100),
    });

    // Update current angle for next segment
    currentAngle += angle;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Render segments */}
        {segments.map((segment, index) => (
          <path
            key={`segment-${index}`}
            d={segment.path}
            fill={segment.color}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}

        {/* Center circle for aesthetics */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius * 0.8}
          fill="#fff"
          stroke="#f5f5f5"
          strokeWidth="1"
        />
      </svg>

      {/* Legend as buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {segments.map((segment, index) => (
          <button
            key={`legend-${index}`}
            className="flex items-center px-3 py-2 rounded-lg transition-transform hover:scale-105"
            style={{ border: `2px solid ${segment.color}` }}
          >
            <div
              className="w-4 h-4 mr-2 rounded-sm"
              style={{ backgroundColor: segment.color }}
            ></div>
            <span className="text-sm">
              {segment.name} ({segment.percentage}%)
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProgressCenterPage() {
  const [chartData, setChartData] = useState({
    abc: [20, 35, 45, 30, 50, 70, 85],
    math: [30, 40, 35, 45, 60, 55, 75],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  });

  const [timeRange, setTimeRange] = useState("week");

  // Donut chart data
  const donutData = [
    { name: "Languages", value: 68, color: "#FF6384" },
    { name: "Math", value: 24, color: "#36A2EB" },
    { name: "Animal", value: 24, color: "#FFCE56" },
    { name: "Art", value: 24, color: "#4BC0C0" },
  ];

  // Update chart data when time range changes
  useEffect(() => {
    if (timeRange === "week") {
      setChartData({
        abc: [20, 35, 45, 30, 50, 70, 85],
        math: [30, 40, 35, 45, 60, 55, 75],
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      });
    } else if (timeRange === "month") {
      setChartData({
        abc: [25, 40, 55, 65, 60, 75, 85, 90],
        math: [35, 45, 40, 50, 65, 60, 70, 80],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      });
    } else if (timeRange === "year") {
      setChartData({
        abc: [30, 45, 60, 75, 85, 90],
        math: [40, 50, 55, 65, 75, 85],
        labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      });
    }
  }, [timeRange]);

  return (
            <div className="max-w-2xl mx-auto">
              {/* Child's Progress Chart */}
              <div className="mb-12">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-2">
                  1. Child's Progress Chart
                </h3>
                <p className="text-gray-600 mb-6 extra-sm:text-sm md:text-lg">
                  Track your child's progress over time in each lesson to
                  monitor improvements and areas for growth.
                </p>

                {/* Time range selector */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => setTimeRange("week")}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                        timeRange === "week"
                          ? "bg-[#E16C78] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setTimeRange("month")}
                      className={`px-4 py-2 text-sm font-medium ${
                        timeRange === "month"
                          ? "bg-[#E16C78] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300"
                      }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setTimeRange("year")}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                        timeRange === "year"
                          ? "bg-[#E16C78] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      Year
                    </button>
                  </div>
                </div>

                {/* Line Chart */}
                <LineChart data={chartData} />
              </div>

              {/* Time Spent on Topics */}
              <div className="mb-12">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-2">
                  2. Time Spent on Topics
                </h3>
                <p className="text-gray-600 mb-6 extra-sm:text-sm md:text-lg">
                  A circular chart showing the percentage of time your child has
                  spent on different topics like Writing, Reading,
                  Pronunciation, Math, and Art.
                </p>

                {/* Donut Chart */}
                <DonutChart data={donutData} />
              </div>
            </div>
  );
}

import React from "react";
import { View, Dimensions } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import Svg, { G, Path, Circle, Text as SvgText, Rect } from "react-native-svg";
import { arc, pie, line, curveMonotoneX } from "d3-shape";
import { scaleLinear } from "d3-scale";

const { width } = Dimensions.get("window");

const applicationData = [
  { status: "Applied", value: 15, color: "#8884d8" },
  { status: "Interview", value: 8, color: "#82ca9d" },
  { status: "Offer", value: 3, color: "#ffc658" },
  { status: "Rejected", value: 10, color: "#ff8042" },
];

const skillsData = [
  { name: "React", score: 85 },
  { name: "JavaScript", score: 90 },
  { name: "TypeScript", score: 75 },
  { name: "Node.js", score: 70 },
  { name: "CSS", score: 80 },
];

const activityData = [
  { date: "2023-06-01", applications: 2, interviews: 0 },
  { date: "2023-06-08", applications: 5, interviews: 1 },
  { date: "2023-06-15", applications: 3, interviews: 2 },
  { date: "2023-06-22", applications: 4, interviews: 1 },
  { date: "2023-06-29", applications: 6, interviews: 3 },
];

const CustomPieChart = ({ data }) => {
  const pieGenerator = pie()
    .value((d) => d.value)
    .sort(null);

  const arcs = pieGenerator(data);

  const radius = 100;

  const arcGenerator = arc().outerRadius(radius).innerRadius(0);

  return (
    <Svg height="300" width={width - 100}>
      <G transform={`translate(${(width - 32) / 2.5}, 150)`}>
        {arcs.map((slice, index) => {
          const pathData = arcGenerator(slice);
          const [labelX, labelY] = arcGenerator.centroid(slice);
          return (
            <G key={index}>
              <Path d={pathData} fill={slice.data.color} />
              <SvgText
                x={labelX}
                y={labelY}
                fill="#fff"
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {slice.data.status}
              </SvgText>
            </G>
          );
        })}
      </G>
    </Svg>
  );
};

const CustomBarChart = ({ data }) => {
  const maxScore = Math.max(...data.map((item) => item.score));
  const xScale = scaleLinear()
    .domain([0, data.length])
    .range([0, width - 64]);
  const yScale = scaleLinear().domain([0, maxScore]).range([250, 0]);
  const barWidth = (width - 64) / data.length - 10;

  return (
    <Svg height="300" width={width - 110}>
      <G transform="translate(32, 20) mr-3">
        {data.map((item, index) => (
          <G key={index} transform={`translate(${xScale(index) + 5}, 0)`}>
            <Rect
              x={0}
              y={yScale(item.score)}
              width={barWidth}
              height={250 - yScale(item.score)}
              fill="#8884d8"
            />
            <SvgText
              x={barWidth / 2}
              y={260}
              fontSize="12"
              textAnchor="middle"
              fill="#333"
            >
              {item.name}
            </SvgText>
          </G>
        ))}
      </G>
    </Svg>
  );
};

const CustomLineChart = ({ data }) => {
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.applications, item.interviews])
  );
  const xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([32, width - 32]);
  const yScale = scaleLinear().domain([0, maxValue]).range([250, 20]);

  const applicationLineGenerator = line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.applications))
    .curve(curveMonotoneX);

  const interviewLineGenerator = line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.interviews))
    .curve(curveMonotoneX);

  return (
    <Svg height="300" width={width - 110}>
      <G>
        {/* Applications Line */}
        <Path
          d={applicationLineGenerator(data)}
          fill="none"
          stroke="#8884d8"
          strokeWidth="2"
        />
        {/* Interviews Line */}
        <Path
          d={interviewLineGenerator(data)}
          fill="none"
          stroke="#82ca9d"
          strokeWidth="2"
        />
        {/* Data Points */}
        {data.map((item, index) => (
          <G key={index}>
            {/* Applications Point */}
            <Circle
              cx={xScale(index)}
              cy={yScale(item.applications)}
              r="4"
              fill="#8884d8"
            />
            {/* Interviews Point */}
            <Circle
              cx={xScale(index)}
              cy={yScale(item.interviews)}
              r="4"
              fill="#82ca9d"
            />
          </G>
        ))}
      </G>
    </Svg>
  );
};

export const CustomJobSeekerDashboard = () => {
  return (
    <Layout isHeader isBottomTab isScroll>
      <View className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-primary mb-4">
            Job Search Dashboard
          </Text>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-xl font-semibold mb-2">
              Application Status
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Overview of your job applications
            </Text>
            <CustomPieChart data={applicationData} />
          </View>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-xl font-semibold mb-2">
              Skills Assessment
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Your proficiency in key skills
            </Text>
            <CustomBarChart data={skillsData} />
          </View>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-xl font-semibold mb-2">
              Job Search Activity
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Your application and interview trends
            </Text>
            <CustomLineChart data={activityData} />
          </View>
        </View>
      </View>
    </Layout>
  );
};

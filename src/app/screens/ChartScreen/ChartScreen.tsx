import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import {
  BarChart,
  LineChart,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Bar,
  Line,
} from "recharts";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}>
        <Text
          style={{ color: "#666" }}
        >{`${label} : ${payload[0].value}`}</Text>
      </View>
    );
  }
  return null;
};

export const JobSeekerDashboard: React.FC = () => {
  return (
    <Layout isHeader isBottomTab>
      <ScrollView className="flex-1 bg-gray-50">
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
            <PieChart width={width - 32} height={300}>
              <Pie
                data={applicationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {applicationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </View>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-xl font-semibold mb-2">
              Skills Assessment
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Your proficiency in key skills
            </Text>
            <BarChart width={width - 32} height={300} data={skillsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </View>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-xl font-semibold mb-2">
              Job Search Activity
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Your application and interview trends
            </Text>
            <LineChart width={width - 32} height={300} data={activityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#8884d8" />
              <Line type="monotone" dataKey="interviews" stroke="#82ca9d" />
            </LineChart>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

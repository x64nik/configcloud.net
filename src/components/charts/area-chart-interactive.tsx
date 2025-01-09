"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  {
    "cpu_usage_percent": 8.672,
    "mem_usage_gb": 2.49,
    "timestamp": "12:09:00 AM"
  },
  {
    "cpu_usage_percent": 9.139,
    "mem_usage_gb": 2.49,
    "timestamp": "12:10:00 AM"
  },
  {
    "cpu_usage_percent": 9.336,
    "mem_usage_gb": 2.49,
    "timestamp": "12:11:00 AM"
  },
  {
    "cpu_usage_percent": 9.134,
    "mem_usage_gb": 2.49,
    "timestamp": "12:12:00 AM"
  },
  {
    "cpu_usage_percent": 9.205,
    "mem_usage_gb": 2.49,
    "timestamp": "12:13:00 AM"
  },
  {
    "cpu_usage_percent": 9.412,
    "mem_usage_gb": 2.49,
    "timestamp": "12:14:00 AM"
  },
  {
    "cpu_usage_percent": 9.319,
    "mem_usage_gb": 2.49,
    "timestamp": "12:15:00 AM"
  },
  {
    "cpu_usage_percent": 9.472,
    "mem_usage_gb": 2.5,
    "timestamp": "12:16:00 AM"
  },
  {
    "cpu_usage_percent": 9.154,
    "mem_usage_gb": 2.5,
    "timestamp": "12:17:00 AM"
  },
  {
    "cpu_usage_percent": 9.887,
    "mem_usage_gb": 2.5,
    "timestamp": "12:18:00 AM"
  },
  {
    "cpu_usage_percent": 9.04,
    "mem_usage_gb": 2.51,
    "timestamp": "12:19:00 AM"
  },
  {
    "cpu_usage_percent": 9.322,
    "mem_usage_gb": 2.51,
    "timestamp": "12:20:00 AM"
  },
  {
    "cpu_usage_percent": 8.414,
    "mem_usage_gb": 2.51,
    "timestamp": "12:21:00 AM"
  },
  {
    "cpu_usage_percent": 9.037,
    "mem_usage_gb": 2.51,
    "timestamp": "12:22:00 AM"
  },
  {
    "cpu_usage_percent": 9.143,
    "mem_usage_gb": 2.51,
    "timestamp": "12:23:00 AM"
  },
  {
    "cpu_usage_percent": 9.218,
    "mem_usage_gb": 2.51,
    "timestamp": "12:24:00 AM"
  },
  {
    "cpu_usage_percent": 8.993,
    "mem_usage_gb": 2.51,
    "timestamp": "12:25:00 AM"
  },
  {
    "cpu_usage_percent": 9.259,
    "mem_usage_gb": 2.51,
    "timestamp": "12:26:00 AM"
  },
  {
    "cpu_usage_percent": 9.038,
    "mem_usage_gb": 2.51,
    "timestamp": "12:27:00 AM"
  },
  {
    "cpu_usage_percent": 8.635,
    "mem_usage_gb": 2.52,
    "timestamp": "12:28:00 AM"
  },
  {
    "cpu_usage_percent": 9.027,
    "mem_usage_gb": 2.52,
    "timestamp": "12:29:00 AM"
  },
  {
    "cpu_usage_percent": 9.391,
    "mem_usage_gb": 2.52,
    "timestamp": "12:30:00 AM"
  },
  {
    "cpu_usage_percent": 8.761,
    "mem_usage_gb": 2.55,
    "timestamp": "12:31:00 AM"
  },
  {
    "cpu_usage_percent": 8.896,
    "mem_usage_gb": 2.55,
    "timestamp": "12:32:00 AM"
  },
  {
    "cpu_usage_percent": 8.977,
    "mem_usage_gb": 2.54,
    "timestamp": "12:33:00 AM"
  },
  {
    "cpu_usage_percent": 9.399,
    "mem_usage_gb": 2.54,
    "timestamp": "12:34:00 AM"
  },
  {
    "cpu_usage_percent": 9.664,
    "mem_usage_gb": 2.52,
    "timestamp": "12:35:00 AM"
  },
  {
    "cpu_usage_percent": 8.821,
    "mem_usage_gb": 2.52,
    "timestamp": "12:36:00 AM"
  },
  {
    "cpu_usage_percent": 9.205,
    "mem_usage_gb": 2.52,
    "timestamp": "12:37:00 AM"
  },
  {
    "cpu_usage_percent": 8.787,
    "mem_usage_gb": 2.52,
    "timestamp": "12:38:00 AM"
  },
  {
    "cpu_usage_percent": 9.13,
    "mem_usage_gb": 2.51,
    "timestamp": "12:39:00 AM"
  },
  {
    "cpu_usage_percent": 9.521,
    "mem_usage_gb": 2.51,
    "timestamp": "12:40:00 AM"
  },
  {
    "cpu_usage_percent": 9.305,
    "mem_usage_gb": 2.51,
    "timestamp": "12:41:00 AM"
  },
  {
    "cpu_usage_percent": 8.511,
    "mem_usage_gb": 2.51,
    "timestamp": "12:42:00 AM"
  },
  {
    "cpu_usage_percent": 8.72,
    "mem_usage_gb": 2.51,
    "timestamp": "12:43:00 AM"
  },
  {
    "cpu_usage_percent": 9.15,
    "mem_usage_gb": 2.51,
    "timestamp": "12:44:00 AM"
  },
  {
    "cpu_usage_percent": 9.224,
    "mem_usage_gb": 2.51,
    "timestamp": "12:45:00 AM"
  },
  {
    "cpu_usage_percent": 9.162,
    "mem_usage_gb": 2.52,
    "timestamp": "12:46:00 AM"
  },
  {
    "cpu_usage_percent": 9.183,
    "mem_usage_gb": 2.52,
    "timestamp": "12:47:00 AM"
  },
  {
    "cpu_usage_percent": 9.327,
    "mem_usage_gb": 2.52,
    "timestamp": "12:48:00 AM"
  },
  {
    "cpu_usage_percent": 9.017,
    "mem_usage_gb": 2.51,
    "timestamp": "12:49:00 AM"
  },
  {
    "cpu_usage_percent": 10.958,
    "mem_usage_gb": 2.52,
    "timestamp": "12:50:00 AM"
  },
  {
    "cpu_usage_percent": 8.867,
    "mem_usage_gb": 2.52,
    "timestamp": "12:51:00 AM"
  },
  {
    "cpu_usage_percent": 9.358,
    "mem_usage_gb": 2.52,
    "timestamp": "12:52:00 AM"
  },
  {
    "cpu_usage_percent": 9.205,
    "mem_usage_gb": 2.53,
    "timestamp": "12:53:00 AM"
  },
  {
    "cpu_usage_percent": 9.108,
    "mem_usage_gb": 2.53,
    "timestamp": "12:54:00 AM"
  },
  // Add more data as needed
]

const chartConfig = {
  cpu_usage_percent: {
    label: "CPU Usage",
    color: "hsl(var(--chart-1))",
  },
  mem_usage_gb: {
    label: "Memory Usage",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AreaChartInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => { 
    const date = new Date("2024-06-30") // Adjust if needed based on your time filtering logic
    let hoursToSubtract = 0
    if (timeRange === "30d") {
      hoursToSubtract = 30
    } else if (timeRange === "7d") {
      hoursToSubtract = 7
    }
    const startDate = new Date(date)
    startDate.setHours(date.getHours() - hoursToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing CPU and Memory usage for the last selected time period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
            <linearGradient id="fillCpu" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.1}
              />
            </linearGradient>

            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="cpu_usage_percent"
              type="natural"
              fill="url(#fillCpu)"
              stroke="var(--color-cpu)"
              stackId="a"
            />
            <Area
              dataKey="mem_usage_gb"
              type="natural"
              fill="url(#fillMemory)"
              stroke="var(--color-memory)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

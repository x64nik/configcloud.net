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
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { RotateCw } from "lucide-react"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  cpu: {
    label: "CPU%",
    color: "hsl(var(--chart-1))",
  },
  memory: {
    label: "RAM%",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AreaChartInteractive({
    chartData,
    fetchVMStats
  } : {
    chartData: any,
    fetchVMStats: () => void
  }) {

  const [timeRange, setTimeRange] = useState("12h");

  const filteredData = chartData.filter((dataPoint: any) => {
    const now = new Date(); // Current date and time
    let hoursToSubtract = 0;

    if (timeRange === "12h") {
      hoursToSubtract = 12;
    } else if (timeRange === "6h") {
      hoursToSubtract = 6;
    } else if (timeRange === "1h") {
      hoursToSubtract = 1;
    }

    // Calculate the start time for the filter
    const startTime = new Date(now);
    startTime.setHours(now.getHours() - hoursToSubtract);

    // Parse the `timestamp` field into a full Date object
    const dataDate = new Date(now); // Use today's date as the base
    const [time, period] = dataPoint.timestamp.split(" ");
    const [hours, minutes] = time.split(":");
    
    // Adjust hours based on AM/PM
    let parsedHours = parseInt(hours, 10);
    if (period === "PM" && parsedHours !== 12) {
      parsedHours += 12;
    } else if (period === "AM" && parsedHours === 12) {
      parsedHours = 0;
    }
  
    // Set the hours and minutes on the dataDate
    dataDate.setHours(parsedHours, parseInt(minutes, 10), 0, 0);

    // Compare the data timestamp with the start time
    return dataDate >= startTime;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Resource Usage</CardTitle>
          <CardDescription>
            Showing CPU and Memory usage for the last selected time period
          </CardDescription>
        </div>
        <Button 
            variant="outline" 
            onClick={fetchVMStats}
            disabled={!chartData}
          >
              <RotateCw />
          </Button>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12h" className="rounded-lg">
              Last 12 hours
            </SelectItem>
            <SelectItem value="6h" className="rounded-lg">
              Last 6 hours
            </SelectItem>
            <SelectItem value="1h" className="rounded-lg">
              Last 1 hour
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
              dataKey="memory"
              type="natural"
              fill="url(#ffff)"
              stroke="var(--color-memory)"
              stackId="b"
            />
            <Area
              dataKey="cpu"
              type="natural"
              fill="url(#ffff)"
              stroke="var(--color-cpu)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

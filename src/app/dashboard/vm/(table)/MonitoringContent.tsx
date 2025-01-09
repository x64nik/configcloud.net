"use client"
import React, { useEffect, useState } from "react";
import { AreaChartInteractive } from "@/components/charts/area-chart-interactive";
import { VirtualMachine } from "./columns";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { data } from "framer-motion/client";
import { getVMStats } from "@/api/vmMonitoring";


const MonitoringContent = ({ selectedVM }: { selectedVM: VirtualMachine | undefined }) => {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [currentvm, setCurrentVM] = useState<string | null>(null)

  const fetchVMStats = async () => {
    if (!selectedVM?.vm_id) {
      return;
    }
    try {
      const response = await getVMStats("test");
      setStatsData(response.data);
      console.log(statsData)
    } catch (err) {
      toast.error(`Failed to fetch stats: ${err}`);
    } finally {
    }
  }

  useEffect(() => {
    fetchVMStats();
  }, [selectedVM]);

  return (
    <div className="grid grid-cols-1 gap-2">
      {/* <AreaChartInteractive statsData={statsData} selectedVM={selectedVM} /> */}
      <AreaChartInteractive />
    </div>
  );
};

export default MonitoringContent;

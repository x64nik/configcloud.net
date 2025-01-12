"use client"
import React, { useEffect, useState } from "react";
import { AreaChartInteractive } from "@/components/charts/area-chart-interactive";
import { VirtualMachine } from "./columns";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { data } from "framer-motion/client";
import { getVMStats } from "@/api/vmMonitoring";
import { Button } from "@/components/ui/button";


const MonitoringContent = ({ selectedVM }: { selectedVM: VirtualMachine | undefined }) => {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [isVmSelected, setisVmSelecte] = useState(false) 
  const [currentvm, setCurrentVM] = useState<string | null>(null)

  const fetchVMStats = async () => {
    if (!selectedVM?.vm_id) {
      setisVmSelecte(false)
      setStatsData([])
      return;
    }

    try {
      const response = await getVMStats(selectedVM.vm_id, "12h");
      setStatsData(response.data);
      console.log(statsData)
      setCurrentVM(selectedVM.vm_id)
      setisVmSelecte(true)
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
      <AreaChartInteractive isselected={isVmSelected} chartData={statsData} fetchVMStats={fetchVMStats}/>
    </div>
  );
};

export default MonitoringContent;

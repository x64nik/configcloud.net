"use client"
import React, { useEffect, useState } from "react";
import { AreaChartInteractive } from "@/components/charts/area-chart-interactive";
import { VirtualMachine } from "./columns";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { data } from "framer-motion/client";

const MonitoringContent = ({ selectedVM }: { selectedVM: VirtualMachine | undefined }) => {
  const [liveData, setLiveData] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedVM?.vm_id) {
        return;
    } // If no selected VM, do nothing.

    const monitor_socket = io("http://localhost:5001", { withCredentials: true });


    monitor_socket.emit("connect_monitor_socket", { vm_id: selectedVM.vm_id });

    monitor_socket.on("msg", (data) => {
        setLiveData((prevData) => [...prevData, data]);
        console.log(data)
        console.log("live log tailing started!");
    });

    console.log(liveData)

    // socket.on("task_status", (newStatus) => {
    //     console.log("Task status updated:", newStatus); // Debug log
    // });

    // Clean up the WebSocket connection on component unmount or selectedVM change
    return () => {
        console.log("Disconnected to Monitoring Socket.IO server.");
        monitor_socket.close();
    };
  }, [selectedVM]);

  return (
    <div className="grid grid-cols-1 gap-2">
      <AreaChartInteractive liveData={liveData} selectedVM={selectedVM} />
    </div>
  );
};

export default MonitoringContent;

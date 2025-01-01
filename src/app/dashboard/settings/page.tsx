"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { createVm } from "@/api/userVm";

// const socket = io("http://localhost:5000", { withCredentials: true });

const SettingsPage = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const mockData = {
    distro: "ubuntu",
    vm_name: "nik1",
    username: "ubuntu",
    password: "password",
    vnet: "vmbr2",
    ip: "10.10.10.18",
    gateway: "10.10.10.1",
    cores: 1,
    memory: 4,
    storage: 16,
    keypair: "nik1",
  };

  useEffect(() => {
    // Connect to the socket on mount
    // socket.on("connect", () => {
    //   console.log("Connected to Socket.IO server.");
    // });

    // Listen for task status updates
    // socket.on("task_status", (data) => {
    //   console.log("Task Status Update:", data);
    //   setStatus(data.status);
    // });

    // return () => {
    //   socket.disconnect(); // Cleanup on unmount
    // };
  }, []);

  const handleTaskStart = async () => {
    setStatus("Submitting task...");

    try {
      const data = await createVm(mockData);
      console.log("Task created:", data);
      setTaskId(data);
      setStatus(`Task submitted! Task ID: ${data}`);

      // Request task status from the backend
      // socket.emit('get_task_status', data);

    } catch (error) {
      setStatus("Error submitting task.");
    }
  };

  return (
    <div>
      <h1>VM Task Manager</h1>
      <button onClick={handleTaskStart}>Start Task</button>
      <div>
        <h3>Task Details:</h3>
        {taskId && <p><strong>Task ID:</strong> {taskId}</p>}
        <p><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default SettingsPage;

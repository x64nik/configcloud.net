"use client"
import React from 'react'
import { Server, HardDrive, Cpu, Pencil, Settings, Network, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button';

interface HostData {
  name: string;
  type: string;
  access: string;
  cpu: number;
  memory: number;
  ip: string;
}

const hosts: HostData[] = [
  { name: 'DG weoto-audioshots', type: 'stopped', access: 'Full', cpu: 45, memory: 60, ip: "10.10.10.10"},
  { name: 'DB-weoto.in-art', type: 'stopped', access: 'Full', cpu: 30, memory: 40, ip: "10.10.10.10"},
  { name: 'bsd-weoto', type: 'stopped', access: 'Limited', cpu: 20, memory: 30, ip: "10.10.10.10"},
  { name: 'microk8s-weoto', type: 'stopped', access: 'Dev', cpu: 70, memory: 80, ip: "10.10.10.10"},
  { name: 'weoto', type: 'stopped', access: 'Full', cpu: 55, memory: 65, ip: "10.10.10.10"},
  { name: 'K8-worker01', type: 'stopped', access: 'Worker', cpu: 80, memory: 85, ip: "10.10.10.10"},
]

const HostCard: React.FC<{ host: HostData }> = ({ host }) => {

  return (
    <div className="rounded-xl p-4 shadow-md border hover:border-slate-500 transition-all duration-300 group relative">
    <div className="flex items-center">
    {/* Left Content: Image */}
    <div className="flex-shrink-0">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/9e/UbuntuCoF.svg"
        className="w-16 h-16 object-contain mr-4 rounded-xl"
        alt="Host Icon"
      />
    </div>
    {/* Right Content: Name, CPU, Memory, and Status */}
    <div>
      <h2 className="text-sm font-medium mb-2">{host.name}</h2>
      <div className="flex items-center text-xs text-slate-300 space-x-4">
        <div className="flex items-center">
          <Cpu className="mr-1 w-4 h-4" />
          <span>CPU: {host.cpu}%</span>
        </div>
        <div className="flex items-center">
          <HardDrive className="mr-1 w-4 h-4" />
          <span>Mem: {host.memory}%</span>
        </div>
        <div className="flex items-center">
          <Network className="mr-1 w-4 h-4" />
          <span>IP: {host.ip}</span>
        </div>
      </div>
      <div className="flex items-center text-xs text-slate-300 mt-2">
        <span className="flex h-2 w-2 rounded-full bg-red-500 mr-1"></span>
        <span>{host.type}</span>
      </div>
    </div>
    </div>
    </div>
  )
}

const HostsGrid: React.FC = () => {
  return (
      <div className="grid grid-cols-2 gap-3">
        {hosts.map((host, index) => (
          <HostCard key={index} host={host} />
        ))}
      </div>
  )
}

export default HostsGrid


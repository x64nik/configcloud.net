"use client";
import React from "react";

function Info() {
  return (
    <div id="info" className='flex items-center justify-center min-h-screen py-12 bg-black'>
        <div>
            <div className="text-center">
                <h2 className="mt-40 text-4xl text-neutral-100 font-extrabold tracking-wide">How this works?</h2>
                <p className="mt-4 font-normal text-base md:text-lg text-neutral-400 max-w-5xl mx-auto">I am running this entire project in my homelab. For computing hardware, I am using a Dell R720xd server with 32 CPUs and 126GB of RAM. The type-1 hypervisor Proxmox is being used for virtualization. For network management, Software Defined Networks (SDNs) are utilized. To deliver all the services in an isolated network, Cloudflare Tunnels with the Warp Client are employed. Additionally, Terraform and Ansible are used for the creation and management of VMs and networks.</p>
            </div>
        </div>
    </div>
  )
}

export default Info

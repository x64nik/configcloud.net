// "use cient";
// import Link from "next/link"
// import serviceData from "../../data/services_data.json"
// import { HoverEffect } from "../ui/card-hover-effect";
// import { section } from "framer-motion/client";


// function Services() {

//   return (
    // <div id="services" className='bg-black justify-center'>
        // <div>
        //     <div className="text-center">
        //         <h2 className="mt-40 text-4xl text-neutral-100 font-extrabold tracking-wide">Services we offer</h2>
        //         <p className="mt-2 mb-8 font-extralight leading-8 text-base text-neutral-200 tracking-tight">Easy to deploy and manage within few clicks</p>
        //     </div>
        // </div>

    //     <div className="max-w-5xl mx-auto px-8 mt-2">
    //         <HoverEffect items={serviceData.services} />
    //     </div>
    // </div>
//   )
// }


// export default Services

import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import { BoxesIcon, ContainerIcon, Database, Gitlab, Server } from "lucide-react";

export default function Services() {
  const features = [
    {
      title: "Virtual Machines",
      description:
        "Deploy scalable and customizable virtual machines to run any workload, with options for various operating systems, CPU, and memory configurations.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Docker Containers",
      description:
      "Effortlessly manage and deploy containerized applications with Docker, ensuring lightweight, consistent, and fast environments for your projects.",
      icon: <BoxesIcon />,
    },
    {
      title: "Managed Databases",
      description:
        "Easy to deploy, reliable and high-performance managed databases for seamless data storage and access, with automated backups, scaling, and security.",
      icon: <Database />,
    },
    {
      title: "GitLab/GitHub Runners",
      description: "Dedicated runners for GitLab and GitHub CI/CD pipelines, enabling efficient and customizable automation for building, testing, and deploying your code.",
      icon: <Gitlab />,
    },
    {
      title: "Bare Metal with Proxmox",
      description: "Access powerful bare-metal servers with a dedicated Proxmox dashboard, providing full control over hardware resources for intensive, customizable workloads.",
      icon: <Server />,
    },
    {
      title: "LLM APIs",
      description:
        "Leverage cutting-edge Large Language Model (LLM) APIs, featuring Ollama and other self-hosted LLMs, to integrate advanced AI capabilities into your applications securely and efficiently.",
      icon: <IconHelp />,
    },
  ];
  return (
    <>
    <div>
        <div className="text-center">
            <h2 className="mt-40 text-4xl text-neutral-100 font-extrabold tracking-wide">Services we offer</h2>
            <p className="mt-2 mb-8 font-extralight leading-8 text-base text-neutral-200 tracking-tight">Easy to deploy and manage within few clicks</p>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-10 py-10 max-w-5xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div id="services" className='bg-black justify-center'>
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
    </div>
  );
};

"use cient";
import Link from "next/link"
import serviceData from "../../data/services_data.json"
import { HoverEffect } from "../ui/card-hover-effect";
import { section } from "framer-motion/client";


function Services() {

  return (
    <div id="services" className='py-12 bg-black'>
        <div>
            <div className="text-center">
                <h2 className="mt-40 text-4xl text-neutral-100 font-extrabold tracking-wide">Services we offer</h2>
                <p className="mt-2 mb-8 font-extralight leading-8 text-base text-neutral-200 tracking-tight">Easy to deploy and manage within few clicks</p>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 mt-2">
            <HoverEffect items={serviceData.services} />
        </div>
    </div>
  )
}


export default Services

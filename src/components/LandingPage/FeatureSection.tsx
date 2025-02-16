"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function FeatureSection() {
  return (
    <div id="preview" className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={<></>}
      >
        <Image
          src={`/cc-dash1.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-fit object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

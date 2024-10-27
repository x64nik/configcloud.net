"use client";
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import testimonialData from "../../data/testimonials_data.json";

function Testimonials() {
  return (
    <div>
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonialData.reviews}
        direction="right"
        speed="slow"
      />
    </div>
    </div>
  )
}

export default Testimonials

"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0", "0"], // Adjust this value to start earlier or later
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [0.9, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0], [0, 0]);
  const scale = useTransform(scrollYProgress, [0, 10], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, 0]);

  return (
    <div
      className="h-[60rem] md:h-[48rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-fit relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* <Header translate={translate} titleComponent={titleComponent} /> */}
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

// export const Header = ({ translate, titleComponent }: any) => {
//   return (
//     <motion.div
//       style={{
//         translateY: translate,
//       }}
//       className="div max-w-5xl mx-auto text-center h-1"
//     >
//       {titleComponent}
//     </motion.div>
//   );
// };

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-fit -mt-12 mx-auto h-full md:h-full w-full p-2 md:p-4 border-2 border-[#6a6a6a] bg-[#252525] rounded-[30px] shadow-2xl"
    > 
      
      <div className=" h-fit w-fit  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-2">
        {children}
      </div>
    </motion.div>
  );
};

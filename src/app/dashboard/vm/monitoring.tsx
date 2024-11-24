import { AreaChartInteractive } from "@/components/charts/area-chart-interactive";
import { AreaChartStack } from "@/components/charts/area-chart-stack";
import { Card } from "@/components/ui/card"


const MonitoringContent = () => (
    <div className="grid grid-cols-1 gap-2">
    <AreaChartInteractive/>
    </div>

  )


export default MonitoringContent;
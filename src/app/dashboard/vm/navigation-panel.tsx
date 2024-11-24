import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import MonitoringContent from "./monitoring"
import ConfigurationsContent from "./configurations"
import NetworkingContent from "./networking"

export function NavigationTabs() {
  return (
    <Tabs defaultValue="configurations" className="w-full">
      <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="configurations">Configurations</TabsTrigger>
        <TabsTrigger value="networking">Networking</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
      </TabsList>
      </div>
      <div className="w-full">
      <TabsContent value="configurations">
        <ConfigurationsContent />
      </TabsContent>
      </div>
      <div className="w-full">
      <TabsContent value="networking">
        <NetworkingContent />
      </TabsContent>
      </div>
      <div className="w-full">
      <TabsContent value="monitoring">
        <MonitoringContent />
      </TabsContent>
      </div>
    </Tabs>
  )
}

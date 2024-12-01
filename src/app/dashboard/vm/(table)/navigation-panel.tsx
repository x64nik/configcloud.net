import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ConfigurationsContent from "./configurations"
import MonitoringContent from "./MonitoringContent"
import NetworkingContent from "./networking"
import { VirtualMachine } from "./columns"

export function NavigationTabs({selectedRow} : {selectedRow : VirtualMachine | undefined}) {

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
        <ConfigurationsContent selectedVM={selectedRow}/>
      </TabsContent>
      </div>
      <div className="w-full">
      <TabsContent value="networking">
        <NetworkingContent selectedVM={selectedRow}/>
      </TabsContent>
      </div>
      <div className="w-full">
      <TabsContent value="monitoring">
        <MonitoringContent selectedVM={selectedRow}/>
      </TabsContent>
      </div>
    </Tabs>
  )
}

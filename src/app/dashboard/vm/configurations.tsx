import { Card } from "@/components/ui/card"
import { VirtualMachine } from "./columns"


const ConfigurationsContent = ({ selectedVM }: { selectedVM: VirtualMachine | undefined }) => (
  <div>
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>
      {selectedVM ? (
        <div>
        <p>Selected VM: {selectedVM.vm_name}</p>
        <p>Selected VM: {selectedVM.cpu}</p>
        </div>
      ) : (
        <p>No VM selected</p>
      )}
    </Card>
  </div>
);

export default ConfigurationsContent;
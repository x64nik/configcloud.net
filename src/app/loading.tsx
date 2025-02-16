import { Loader2 } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface VMResourceSliderProps {
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  onChange?: (value: number) => void
}

export default function VMResourceSlider({
  label,
  min,
  max,
  step,
  defaultValue,
  unit = "",
  onChange
}: VMResourceSliderProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue[0])
    onChange && onChange(newValue[0])
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={label}>{label}</Label>
        <span className="text-sm font-medium">
          {value} {unit}
        </span>
      </div>
      <Slider
        id={label}
        min={min}
        max={max}
        step={step}
        defaultValue={[defaultValue]}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  )
}
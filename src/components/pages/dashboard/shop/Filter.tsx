"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState({
    sizes: true,
    kitType: true,
    collections: true,
    departments: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="sticky top-24 space-y-6">
        <Collapsible open={openSections.sizes} onOpenChange={() => toggleSection("sizes")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer pb-2 border-b">
              <h3 className="font-medium">Men&apos;s Sizes</h3>
              {openSections.sizes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pb-6 grid grid-cols-3 gap-2">
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
              <Button key={size} variant="outline" className="h-10 text-center justify-center">
                {size}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.kitType} onOpenChange={() => toggleSection("kitType")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer pb-2 border-b">
              <h3 className="font-medium">Kit Type</h3>
              {openSections.kitType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pb-6">
            <RadioGroup defaultValue="home">
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="away" id="away" />
                <Label htmlFor="away">Away</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="third" id="third" />
                <Label htmlFor="third">Third</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.collections} onOpenChange={() => toggleSection("collections")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer pb-2 border-b">
              <h3 className="font-medium">Popular Collections</h3>
              {openSections.collections ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pb-6">
            <RadioGroup>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="new-arrivals" id="new-arrivals" />
                <Label htmlFor="new-arrivals">Hot New Arrivals</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="best-sellers" id="best-sellers" />
                <Label htmlFor="best-sellers">Best Sellers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited-edition" id="limited-edition" />
                <Label htmlFor="limited-edition">Limited Edition</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.departments} onOpenChange={() => toggleSection("departments")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer pb-2 border-b">
              <h3 className="font-medium">All Departments</h3>
              {openSections.departments ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pb-6">
            <RadioGroup>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="hoodies" id="hoodies" />
                <Label htmlFor="hoodies">Hoodies & Sweatshirts</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="jerseys" id="jerseys" />
                <Label htmlFor="jerseys">Jerseys</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="tops" id="tops" />
                <Label htmlFor="tops">Tops</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="shorts" id="shorts" />
                <Label htmlFor="shorts">Shorts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="socks" id="socks" />
                <Label htmlFor="socks">Socks</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  )
}

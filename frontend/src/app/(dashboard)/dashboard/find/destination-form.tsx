"use client"

import { useState } from "react"
import axios, { AxiosError } from "axios"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { ConfettiSideCannons } from "./conf"

// Define the Zod schema using TypeScript
const travelCreateSchema = z.object({
  maxBudget: z.number().min(0, "Max budget must be a positive number"),
  minBudget: z.number().min(0, "Min budget must be a positive number"),
  maxDistance: z.number().min(0, "Max distance must be a positive number"),
  numberOfPersons: z.number().min(1, "Number of persons must be at least 1"),
  tourType: z.string().min(1, "Please select a tour type"),
  specialPreference: z.string().optional(),
})

// Extracting the TypeScript type from the Zod schema
type TravelFormData = z.infer<typeof travelCreateSchema>

export function DestinationForm() {
  const [formData, setFormData] = useState<TravelFormData>({
    maxBudget: 0,
    minBudget: 0,
    maxDistance: 0,
    numberOfPersons: 0,
    tourType: "",
    specialPreference: "",
  })
  const [errors, setErrors] = useState<z.inferFlattenedErrors<
    typeof travelCreateSchema
  > | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id === "specialPreference")
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, // Convert numeric inputs to numbers
      }))
    else
      setFormData((prevData) => ({
        ...prevData,
        [id]: value === "" ? 0 : Number(value), // Convert numeric inputs to numbers
      }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, tourType: value }))
  }

  const postData = async () => {
    // Validate form data with Zod schema
    const result = travelCreateSchema.safeParse(formData)
    if (!result.success) {
      const formattedErrors = result.error.flatten()
      setErrors(formattedErrors)
      console.error("Validation failed:", formattedErrors)
      return
    }

    // If valid, proceed with submitting the data
    setErrors(null) // Clear errors if valid
    try {
      const response = await fetch("http://localhost:3000/api/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      })
      if (response.ok) {
        toast({
          title: "Successfully submitted",
          description: "Your plans have been saved!",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Details could not be submitted!",
        description: error.response.data,
        variant: "destructive",
      })
    }
  }

  return (
    <form
      className="mx-auto size-full space-y-8 rounded-3xl bg-secondary p-6"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="maxBudget">Maximum budget</Label>
          <Input
            type="number"
            id="maxBudget"
            value={formData.maxBudget}
            onChange={handleInputChange}
            placeholder="Enter your maximum budget"
          />
          {errors?.fieldErrors?.maxBudget && (
            <p className="text-red-500">{errors.fieldErrors.maxBudget[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="minBudget">Minimum budget</Label>
          <Input
            type="number"
            id="minBudget"
            value={formData.minBudget}
            onChange={handleInputChange}
            placeholder="Enter your minimum spending"
          />
          {errors?.fieldErrors?.minBudget && (
            <p className="text-red-500">{errors.fieldErrors.minBudget[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxDistance">Maximum distance</Label>
          <Input
            type="number"
            id="maxDistance"
            value={formData.maxDistance}
            onChange={handleInputChange}
            placeholder="Enter maximum distance"
          />
          {errors?.fieldErrors?.maxDistance && (
            <p className="text-red-500">{errors.fieldErrors.maxDistance[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="numberOfPersons">Number of persons</Label>
          <Input
            type="number"
            id="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleInputChange}
            placeholder="Enter number of persons"
          />
          {errors?.fieldErrors?.numberOfPersons && (
            <p className="text-red-500">
              {errors.fieldErrors.numberOfPersons[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tourType">Destination type</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger id="tourType">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Desert">Desert</SelectItem>
              <SelectItem value="Beach">Beach</SelectItem>
              <SelectItem value="Mountains">Mountains</SelectItem>
            </SelectContent>
          </Select>
          {errors?.fieldErrors?.tourType && (
            <p className="text-red-500">{errors.fieldErrors.tourType[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialPreference">Special preferences</Label>
          <Input
            type="text"
            id="specialPreference"
            value={formData.specialPreference}
            onChange={handleInputChange}
            placeholder="Enter any special preferences"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ConfettiSideCannons
          onClick={() => {
            postData()
          }}
        />
      </div>
    </form>
  )
}

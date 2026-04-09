"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { LeadsTable } from "@/components/leads-table"

const countries = [
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
]

type Lead = {
  company_name: string
  job_link: string
  remote: boolean | string
  date_posted: string
  website_url: string
  linkedin_url: string
  sanitized_phone: string
  primary_domain: string
  industry: string
  employee_count: number | string
  city: string
  state: string
  country: string
  apollo_link: string
}
type FormStatus = "idle" | "loading" | "success" | "error"

export function LeadForm() {
  const [jobTitle, setJobTitle] = useState("")
  const [country, setCountry] = useState("")
  const [numberOfLeads, setNumberOfLeads] = useState("Number of Leads?")
  const [remote, setRemote] = useState<string>("") // ✅ NEW STATE
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!jobTitle.trim() || !country || !numberOfLeads || !remote) {
      setErrorMessage("Please fill in all fields")
      setStatus("error")
      return
    }

    setStatus("loading")
    setErrorMessage("")
    setLeads([])

    try {
      const n8nWebhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "http://localhost:5678/webhook/lead generator"

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          country,
          numberOfLeads: parseInt(numberOfLeads),
          remote: remote === "true", // ✅ SEND BOOLEAN
        }),
      })

      const data = await response.json()

const mappedLeads: Lead[] = Array.isArray(data)
  ? data.map((item: any) => ({
      company_name: item.company_name || "",
      job_link: item.job_link || "",
      remote: item.remote,
      date_posted: item.date_posted || "",
      website_url: item.website_url || "",
      linkedin_url: item.linkedin_url || "",
      sanitized_phone: item.sanitized_phone || "",
      primary_domain: item.primary_domain || "",
      industry: item.industry || "",
      employee_count: item.employee_count || "",
      city: item.city || "",
      state: item.state || "",
      country: item.country || "",
      apollo_link: item.apollo_link || "",
    }))
  : []

      setLeads(mappedLeads)
      setStatus("success")
    } catch (err) {
      console.error(err)
      setErrorMessage("Could't Find Leads")
      setStatus("error")
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* ✅ NEW REMOTE DROPDOWN */}
            <Select value={remote} onValueChange={setRemote}>
              <SelectTrigger>
                <SelectValue placeholder="Remote?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Number of Leads"
              type="number"
              value={numberOfLeads}
              onChange={(e) => setNumberOfLeads(e.target.value)}
            />

            <Button type="submit">
              {status === "loading" ? "Loading..." : "Generate Leads"}
            </Button>

            {status === "error" && <p>{errorMessage}</p>}
            {status === "success" && <p>Leads Loaded ✅</p>}

          </form>
        </CardContent>
      </Card>

      <LeadsTable leads={leads} />
    </div>
  )
}

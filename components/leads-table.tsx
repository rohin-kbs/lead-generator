"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export interface Lead {
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

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Leads ({leads.length})</CardTitle>
      </CardHeader>

      <CardContent>
        {/* 👉 Added vertical scroll + sticky header support */}
        <div className="overflow-auto max-h-[500px]">
          <Table>
            
            {/* ✅ STICKY HEADER */}
            <TableHeader className="sticky top-0 bg-background z-20">
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Job Link</TableHead>
                <TableHead>Remote</TableHead>
                <TableHead>Date Posted</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Apollo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={index}>

                  {/* COMPANY */}
                  <TableCell>{lead.company_name || "-"}</TableCell>

                  {/* JOB LINK */}
                  <TableCell>
                    {lead.job_link ? (
                      <a
                        href={lead.job_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Job
                      </a>
                    ) : "-"}
                  </TableCell>

                  {/* REMOTE (Yes/No) */}
                  <TableCell>
                    {lead.remote === true || lead.remote === "true"
                      ? "Yes"
                      : lead.remote === false || lead.remote === "false"
                      ? "No"
                      : "-"}
                  </TableCell>

                  {/* DATE */}
                  <TableCell>{lead.date_posted || "-"}</TableCell>

                  {/* WEBSITE */}
                  <TableCell>
                    {lead.website_url ? (
                      <a
                        href={
                          lead.website_url.startsWith("http")
                            ? lead.website_url
                            : `https://${lead.website_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Visit
                      </a>
                    ) : "-"}
                  </TableCell>

                  {/* LINKEDIN */}
                  <TableCell>
                    {lead.linkedin_url ? (
                      <a
                        href={lead.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : "-"}
                  </TableCell>

                  {/* PHONE */}
                  <TableCell>{lead.sanitized_phone || "-"}</TableCell>

                  {/* DOMAIN */}
                  <TableCell>{lead.primary_domain || "-"}</TableCell>

                  {/* INDUSTRY */}
                  <TableCell>{lead.industry || "-"}</TableCell>

                  {/* EMPLOYEES */}
                  <TableCell>{lead.employee_count || "-"}</TableCell>

                  {/* CITY */}
                  <TableCell>{lead.city || "-"}</TableCell>

                  {/* STATE */}
                  <TableCell>{lead.state || "-"}</TableCell>

                  {/* COUNTRY */}
                  <TableCell>{lead.country || "-"}</TableCell>

                  {/* APOLLO */}
                  <TableCell>
                    {lead.apollo_link ? (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={lead.apollo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open
                        </a>
                      </Button>
                    ) : "-"}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
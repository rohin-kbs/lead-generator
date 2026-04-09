import { LeadForm } from "@/components/lead-form"
// // import { LeadForm } from "@/components/lead-form"
// import { LeadsTable } from "@/components/leads-table"
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Lead Generator</h1>
        </div>
        <LeadForm />
      </div>
    </div>
  )
}

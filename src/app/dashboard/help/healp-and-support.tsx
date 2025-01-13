"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react'

export function HelpAndSupport() {
  const [issueSubmitted, setIssueSubmitted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleIssueSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    setIssueSubmitted(true)
  }

  const handleFeedbackSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    setFeedbackSubmitted(true)
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Help and Support</h2>
        <p className="text-gray-500">Get assistance, report issues, or provide feedback for our VPS hosting platform.</p>
      </div>
      <Tabs defaultValue="issue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issue">Report Issue</TabsTrigger>
          <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
          <TabsTrigger value="guide">VPS Guide</TabsTrigger>
        </TabsList>
        <TabsContent value="issue" className="mt-6">
          {!issueSubmitted ? (
            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select required>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Problem</SelectItem>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="account">Account Related</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue-title">Issue Title</Label>
                <Input id="issue-title" placeholder="Brief description of the issue" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue-description">Detailed Description</Label>
                <Textarea id="issue-description" placeholder="Provide more details about your issue" required />
              </div>
              <Button type="submit">Submit Issue</Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">Issue Submitted Successfully</h3>
              <p className="text-center text-gray-600">Thank you for reporting the issue. Our team will look into it and get back to you soon.</p>
              <Button onClick={() => setIssueSubmitted(false)}>Submit Another Issue</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="feedback" className="mt-6">
          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select required>
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="compliment">Compliment</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-title">Feedback Title</Label>
                <Input id="feedback-title" placeholder="Brief title for your feedback" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-description">Feedback Details</Label>
                <Textarea id="feedback-description" placeholder="Provide detailed feedback" required />
              </div>
              <Button type="submit">Submit Feedback</Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">Feedback Submitted Successfully</h3>
              <p className="text-center text-gray-600">Thank you for your feedback. We appreciate your input and will use it to improve our services.</p>
              <Button onClick={() => setFeedbackSubmitted(false)}>Submit More Feedback</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="guide" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">VPS Hosting Guide</h3>
            <p>Welcome to our VPS hosting platform. Here's a guide to help you get started and make the most of your virtual private server.</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="create-vm">
                <AccordionTrigger>How to Create a VM</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Log in to your account dashboard.</li>
                    <li>Click on "Create New VM" button.</li>
                    <li>Choose your preferred operating system.</li>
                    <li>Select the VM specifications (CPU, RAM, Storage).</li>
                    <li>Set a hostname for your VM.</li>
                    <li>Choose a datacenter location.</li>
                    <li>Click "Create" and wait for the VM to be provisioned.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="configure-vm">
                <AccordionTrigger>Configuring Your VM</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Access your VM using SSH (for Linux) or Remote Desktop (for Windows).</li>
                    <li>Update your system: Run system updates to ensure you have the latest security patches.</li>
                    <li>Configure firewall: Set up firewall rules to secure your VM.</li>
                    <li>Install necessary software: Install web servers, databases, or any other required software.</li>
                    <li>Set up regular backups to protect your data.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="optimize-performance">
                <AccordionTrigger>Optimizing VM Performance</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Monitor resource usage and upgrade if necessary.</li>
                    <li>Use a content delivery network (CDN) for faster content delivery.</li>
                    <li>Implement caching mechanisms to reduce database load.</li>
                    <li>Optimize your applications and databases for better performance.</li>
                    <li>Consider using SSDs for faster disk I/O.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-4 rounded-r-lg" role="alert">
              <div className="flex">
                <div className="py-1">
                  <HelpCircle className="h-6 w-6 text-blue-500 mr-4" />
                </div>
                <div>
                  <p className="font-bold">Need more help?</p>
                  <p className="text-sm">If you need further assistance, don't hesitate to contact our support team or check out our detailed documentation.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


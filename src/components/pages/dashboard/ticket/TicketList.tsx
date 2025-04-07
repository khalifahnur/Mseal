"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { formatDate } from "@/lib/utils"

interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  price: number
  totalTickets: number
  availableTickets: number
  imageUrl: string
  opponent: {
    name: string
    logo: string
  }
}

export function TicketList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const dateFilter = searchParams.get("date")
  const sortBy = searchParams.get("sort")

  useEffect(() => {
    async function fetchEvents() {
      try {
        // In a real app, this would be an API call to your backend
        // const response = await fetch('/api/events/upcoming')
        // const data = await response.json()

        // For demo purposes, we'll use mock data
        const mockEvents: Event[] = [
          {
            id: "1",
            name: "Muranga Seal vs. Gor Mahia",
            date: "2025-04-10",
            time: "15:00",
            venue: "Muranga Stadium",
            price: 500,
            totalTickets: 1000,
            availableTickets: 750,
            imageUrl: "/assets/images/stadi1.jpeg",
            opponent: {
              name: "Gor Mahia",
              logo: "/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: "2",
            name: "Muranga Seal vs. AFC Leopards",
            date: "2025-04-17",
            time: "16:30",
            venue: "Muranga Stadium",
            price: 600,
            totalTickets: 1000,
            availableTickets: 250,
            imageUrl: "/assets/images/stadi2.jpeg",
            opponent: {
              name: "AFC Leopards",
              logo: "/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: "3",
            name: "Tusker FC vs. Muranga Seal",
            date: "2025-04-24",
            time: "19:00",
            venue: "Ruaraka Stadium",
            price: 450,
            totalTickets: 800,
            availableTickets: 650,
            imageUrl: "/assets/images/stadi1.jpeg",
            opponent: {
              name: "Tusker FC",
              logo: "/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: "4",
            name: "Muranga Seal vs. KCB FC",
            date: "2025-05-01",
            time: "15:00",
            venue: "Muranga Stadium",
            price: 500,
            totalTickets: 1000,
            availableTickets: 900,
            imageUrl: "/assets/images/stadi2.jpeg",
            opponent: {
              name: "KCB FC",
              logo: "/placeholder.svg?height=50&width=50",
            },
          },
        ]

        let filteredEvents = [...mockEvents]

        // Apply date filter
        if (dateFilter) {
          const today = new Date()
          const thisWeekEnd = new Date(today)
          thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()))

          const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

          filteredEvents = filteredEvents.filter((event) => {
            const eventDate = new Date(event.date)
            if (dateFilter === "this-week") {
              return eventDate <= thisWeekEnd && eventDate >= today
            } else if (dateFilter === "this-month") {
              return eventDate <= thisMonthEnd && eventDate >= today
            }
            return true
          })
        }

        // Apply sorting
        if (sortBy) {
          filteredEvents.sort((a, b) => {
            if (sortBy === "price-asc") {
              return a.price - b.price
            } else if (sortBy === "price-desc") {
              return b.price - a.price
            } else if (sortBy === "availability") {
              return b.availableTickets - a.availableTickets
            } else if (sortBy === "date") {
              return new Date(a.date).getTime() - new Date(b.date).getTime()
            }
            return 0
          })
        }

        setEvents(filteredEvents)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [dateFilter, sortBy])

  if (loading) {
    return <p>Loading events...</p>
  }

  if (events.length === 0) {
    return <p>No upcoming events found.</p>
  }

  return (
    <div className="grid gap-6">
      {events.map((event) => {
        const soldPercentage = ((event.totalTickets - event.availableTickets) / event.totalTickets) * 100
        const isSellingFast = event.availableTickets < event.totalTickets * 0.3

        return (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 h-[200px]">
                  <Image src={event.imageUrl || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{event.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Muranga Seal"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <span className="text-sm">vs</span>
                          <Image
                            src={event.opponent.logo || "/placeholder.svg"}
                            alt={event.opponent.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time} EAT</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Ticket className="mr-2 h-4 w-4" />
                          <span>KES {event.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Ticket availability</span>
                          <span className="text-sm font-medium">{event.availableTickets} left</span>
                        </div>
                        <Progress value={soldPercentage} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {isSellingFast ? (
                        <Badge variant="destructive">Selling Fast</Badge>
                      ) : (
                        <Badge variant="outline">On Sale</Badge>
                      )}

                      <Link href={`/tickets/buy/${event.id}`}>
                        <Button>Buy Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}


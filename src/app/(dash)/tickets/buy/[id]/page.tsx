"use client";

import React from 'react'
import { useParams } from "next/navigation";
import Container from '@/components/pages/dashboard/ticket/buy/Container';

export default function BuyTicketPage() {
  const params = useParams();
  const eventId = params?.id as string;
  return (
    <Container eventId={eventId}/>
  )
}

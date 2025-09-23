"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Download,
  MapPin,
  QrCode,
  Ticket,
  User,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveTickets } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import qrcode from "qrcode";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export function ActiveTickets() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["activeTickets"],
    queryFn: fetchActiveTickets,
    staleTime: 1000 * 60 * 5,
    //cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <FullScreenLoader />;

  const activeTickets = data?.tickets ?? [];

  const qrcodeData = data?.qrcode;

  if (activeTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No active tickets</h3>
        <p className="text-muted-foreground mb-6">
          You don&apos;t have any upcoming matches to attend.
        </p>
        <Button asChild>
          <a href="/tickets">Browse Tickets</a>
        </Button>
      </div>
    );
  }

  const generateQRCode = async (payload: string) => {
    try {
      const qrCodeDataUrl = await qrcode.toDataURL(payload, {
        errorCorrectionLevel: "M",
      });
      setQrCodeImage(qrCodeDataUrl);
    } catch (error) {
      console.error("QR code generation failed:", error);
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(ticketRef.current, {
        backgroundColor: "#ffffff",
      });
      download(dataUrl, `${"ms-ticket"}.png`);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="grid gap-6">
      {/* eslint-disable @typescript-eslint/no-explicit-any */}
      {activeTickets.map((ticket: any, index: number) => {
        const event = ticket.event?.[0];
        return (
          <Card key={ticket._id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row bg-[url('/assets/images/stadi1.jpeg')] bg-cover bg-center md:bg-none relative before:backdrop-blur-sm backdrop-opacity-50 before:absolute before:inset-0 before:z-[-1]">
                <div className="relative md:w-1/3">
                  <Image
                    src={`/assets/images/stadi1.jpeg`}
                    alt={event?.match || "Match"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white md:text-black">
                        {event?.match}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {formatDate(event?.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {event?.time} EAT
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {event?.venue}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Ticket className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            Regular Ticket
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <User className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            Section A, Row 5, Seat 12
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => generateQRCode(qrcodeData[index])}
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            View Ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Ticket Details</DialogTitle>
                            <DialogDescription>
                              Show this QR code at the entrance for admission
                            </DialogDescription>
                          </DialogHeader>
                          <div
                            ref={ticketRef}
                            className="flex flex-col items-center justify-center p-6"
                          >
                            <div className="bg-white p-4 rounded-lg mb-4">
                              {qrCodeImage ? (
                                <Image
                                  src={qrCodeImage}
                                  alt="Ticket QR Code"
                                  width={200}
                                  height={200}
                                  className="mx-auto"
                                />
                              ) : (
                                <p>Loading QR Code...</p>
                              )}
                            </div>
                            <div className="text-center space-y-2">
                              <h4 className="font-bold">{event?.match}</h4>
                              <p>
                                {formatDate(event?.date)} • {event?.time} EAT
                              </p>
                              <p>{event?.venue}</p>
                              <p className="font-mono text-xs">
                                {ticket.ticketId}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={handleDownloadTicket}
                          >
                            <span className="flex items-center">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </span>
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

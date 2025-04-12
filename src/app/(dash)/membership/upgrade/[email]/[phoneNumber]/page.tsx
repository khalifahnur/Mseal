"use client";

import { MembershipModal } from "@/components/pages/dashboard/membership/MembershipModal";
import { useState } from "react";
import { use } from "react";

interface PageProps {
  params: Promise<{
    email: string;
    phoneNumber: string;
  }>;
}

export default function MembershipPage({ params }: PageProps) {
  const resolvedParams = use(params);

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <MembershipModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          email={resolvedParams.email}
          phoneNumber={resolvedParams.phoneNumber}
        />
    </main>
  );
}
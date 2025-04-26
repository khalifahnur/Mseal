import Container from "@/components/pages/dashboard/ticket/Container";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<FullScreenLoader />}>
        <Container />
      </Suspense>
    </div>
  );
}

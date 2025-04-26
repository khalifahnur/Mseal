import Home from "@/components/pages/dashboard/home/Container";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<FullScreenLoader />}>
        <Home />
      </Suspense>
    </div>
  );
}

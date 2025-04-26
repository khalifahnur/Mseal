import SettingsPage from "@/components/pages/dashboard/settings/Container";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<FullScreenLoader />}>
      <SettingsPage />
      </Suspense>
    </div>
  );
}

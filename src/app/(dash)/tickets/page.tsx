// import Container from "@/components/pages/dashboard/ticket/Container";
// import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
// import React, { Suspense } from "react";

// export default function page() {
//   return (
//     <div>
//       <Suspense fallback={<FullScreenLoader />}>
//         <Container />
//       </Suspense>
//     </div>
//   );
// }

// pages/tickets.tsx
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import dynamic from "next/dynamic";
const TicketsPage = dynamic(() => import("@/components/pages/dashboard/ticket/Container"), {
  loading: () => <FullScreenLoader />,
});
export default TicketsPage;
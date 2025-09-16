import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import dynamic from "next/dynamic";
const TicketsPage = dynamic(() => import("@/components/pages/dashboard/ticket/Container"), {
  loading: () => <FullScreenLoader />,
});
export default TicketsPage;
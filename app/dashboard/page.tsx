import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { getMonthlySummary } from "@/services/api";

export default async function DashboardPage() {
  const data = await getMonthlySummary(5, 2026);

  return (
    <DashboardLayout>
      <SummaryCards data={data} />

      <TransactionsTable transactions={data.transactions} />
    </DashboardLayout>
  );
}

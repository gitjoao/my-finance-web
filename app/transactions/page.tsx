import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { getMonthlySummary } from "@/services/api";

export default async function TransactionsPage() {
  const data = await getMonthlySummary(5, 2026);

  return (
    <DashboardLayout>
      <TransactionsTable transactions={data.transactions} />
    </DashboardLayout>
  );
}

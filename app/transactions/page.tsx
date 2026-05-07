import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { getAllTransactions } from "@/services/api";

export default async function TransactionsPage() {
  const data = await getAllTransactions();

  return (
    <DashboardLayout>
      <TransactionsTable transactions={data} showOptions={true} />
    </DashboardLayout>
  );
}

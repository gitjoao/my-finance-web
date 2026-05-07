import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { getTransactions } from "@/services/api";
import TransactionsFilters from "@/components/transactions/TransactionsFilters";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    type?: string;
    month?: string;
    year?: string;
    paymentMethod?: string;
  }>;
};

export default async function TransactionsPage({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.month || !params.year) {
    const currentYear = new Date().getFullYear();

    const currentMonth = new Date().getMonth() + 1;

    redirect(`/transactions?month=${currentMonth}&year=${currentYear}`);
  }
  const transactions = await getTransactions({
    type: params.type,
    month: params.month,
    year: params.year,
    paymentMethod: params.paymentMethod,
  });

  return (
    <DashboardLayout>
      <TransactionsFilters />
      <TransactionsTable transactions={transactions} showOptions={true} />
    </DashboardLayout>
  );
}

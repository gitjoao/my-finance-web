import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { getTransactions } from "@/services/api";
import TransactionsFilters from "@/components/transactions/TransactionsFilters";
import { redirect } from "next/navigation";
import { getCategories } from "@/services/categoriesService";

type Props = {
  searchParams: Promise<{
    type?: string;
    month?: string;
    year?: string;
    paymentMethod?: string;
    categoryId?: string;
  }>;
};

export default async function TransactionsPage({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.month || !params.year) {
    const currentYear = new Date().getFullYear();

    const currentMonth = new Date().getMonth() + 1;

    redirect(`/transactions?month=${currentMonth}&year=${currentYear}`);
  }
  const categories = await getCategories();

  const transactions = await getTransactions({
    type: params.type,
    month: params.month,
    year: params.year,
    paymentMethod: params.paymentMethod,
    categoryId: params.categoryId,
  });

  return (
    <DashboardLayout>
      <TransactionsFilters categories={categories} />
      <TransactionsTable transactions={transactions} showOptions={true} />
    </DashboardLayout>
  );
}

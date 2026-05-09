import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import { getCategories } from "@/services/categoriesService";

export default async function NewTransactionPage() {
  const categories = await getCategories();
  return (
    <DashboardLayout>
      <TransactionForm categories={categories} />
    </DashboardLayout>
  );
}

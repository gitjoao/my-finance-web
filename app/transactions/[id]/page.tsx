import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import { getCategories } from "@/services/server/categoriesService";
import { getTransactionById } from "@/services/server/transactionsService";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditTransactionPage({ params }: Props) {
  const { id } = await params;

  const transaction = await getTransactionById(id);
  const categories = await getCategories();

  return (
    <DashboardLayout>
      <TransactionForm initialData={transaction} categories={categories} />
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionForm from "@/components/transactions/TransactionForm";

export default function NewTransactionPage() {
  return (
    <DashboardLayout>
      <TransactionForm />
    </DashboardLayout>
  );
}

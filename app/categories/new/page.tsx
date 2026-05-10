import CategoryForm from "@/components/categories/CatetoryForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function NewTransactionPage() {
  return (
    <DashboardLayout>
      <CategoryForm />
    </DashboardLayout>
  );
}

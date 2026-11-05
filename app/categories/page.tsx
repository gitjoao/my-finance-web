import CategoriesTable from "@/components/categories/CategoriesTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCategories } from "@/services/server/categoriesService";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <DashboardLayout>
      <CategoriesTable categories={categories} />
    </DashboardLayout>
  );
}

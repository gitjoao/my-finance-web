import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCategoryById } from "@/services/categoriesService";
import CategoryForm from "@/components/categories/CatetoryForm";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const initalData = await getCategoryById(id);

  return (
    <DashboardLayout>
      <CategoryForm initialData={initalData} />
    </DashboardLayout>
  );
}

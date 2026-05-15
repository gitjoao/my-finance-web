import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { getMonthlySummary } from "@/services/api";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import { getBudgetSummary } from "@/services/budgetsService";
import DonutChart from "@/components/dashboard/DonutChart";
import { getExpenseCategorySummaries } from "@/services/reportsService";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  if (!params.month || !params.year) {
    redirect(`/dashboard?month=${currentMonth}&year=${currentYear}`);
  }

  const month = Number(params.month);
  const year = Number(params.year);

  const monthlySummary = await getMonthlySummary(month, year);
  const budgets = await getBudgetSummary(month, year);
  const expenseByCategory = await getExpenseCategorySummaries(month, year);

  return (
    <DashboardLayout>
      <DashboardFilters />
      <SummaryCards data={monthlySummary} />
      <div className="row">
        <BudgetProgress budgets={budgets} />
        <DonutChart data={expenseByCategory} />
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { getMonthlySummary } from "@/services/api";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import { getBudgetSummary } from "@/services/budgetsService";
import DonutChart from "@/components/dashboard/DonutChart";
import { getExpenseCategorySummaries } from "@/services/reportsService";

export default async function DashboardPage() {
  const data = await getMonthlySummary(5, 2026);
  const budgets = await getBudgetSummary(5, 2026);
  const expenseByCategory = await getExpenseCategorySummaries(5, 2026);

  return (
    <DashboardLayout>
      <SummaryCards data={data} />
      <div className="row">
        <BudgetProgress budgets={budgets} />
        <DonutChart data={expenseByCategory} />
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryComparationTable from "@/components/reports/CategoryComparisonTable";
import ReportFilters from "@/components/reports/ReportFilters";
import { getTransactionsByPeriod } from "@/services/reportsService";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
  }>;
};

export interface ReportData {
  category: string;
  color: string;
  total: number;
  months: {
    [key: string]: number;
  };
}

export default async function ReportsPage({ searchParams }: Props) {
  const { startMonth, startYear, endMonth, endYear } = await searchParams;

  if (!startMonth || !startYear || !endMonth || !endYear) {
    const now = new Date();

    redirect(
      `/reports?startMonth=${now.getMonth()}&startYear=${now.getFullYear()}&endMonth=${
        now.getMonth() + 1
      }&endYear=${now.getFullYear()}`,
    );
  }

  const reportData: ReportData[] = await getTransactionsByPeriod(
    startMonth,
    startYear,
    endMonth,
    endYear,
  );

  return (
    <DashboardLayout>
      <ReportFilters />
      <CategoryComparationTable data={reportData} />
    </DashboardLayout>
  );
}

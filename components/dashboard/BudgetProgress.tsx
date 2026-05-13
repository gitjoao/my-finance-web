import { currencyFormatter } from "@/app/utils/currency";

type BudgetItem = {
  category: string;
  limit: number;
  used: number;
  available: number;
};

type BudgetProgressProps = {
  budgets: BudgetItem[];
};

function getProgressColor(percentage: number) {
  if (percentage >= 80) {
    return "progress-bar-red";
  }

  if (percentage >= 50) {
    return "progress-bar-yellow";
  }

  return "progress-bar-green";
}

export default function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className="col-md-6">
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Limite por Categoria</h3>
        </div>

        <div className="box-body">
          {budgets.map((budget) => {
            const percentage = (budget.used / budget.limit) * 100;

            return (
              <div
                key={budget.category}
                style={{
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <strong>{budget.category}</strong>

                  <span>
                    Disponível: {currencyFormatter.format(budget.available)}
                  </span>
                </div>

                <div className="progress">
                  <div
                    className={`progress-bar ${getProgressColor(percentage)}`}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  >
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

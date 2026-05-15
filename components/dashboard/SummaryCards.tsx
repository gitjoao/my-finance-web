import { currencyFormatter } from "@/app/utils/currency";

type Props = {
  data: {
    summary: {
      income: number;
      expense: number;
      credit: number;
      balance: number;
    };
    debts: {
      fatherInLaw: number;
    };
  };
};

export default function SummaryCards({ data }: Props) {
  return (
    <div className="row">
      {/* <div className="col-md-2">
        <div className="small-box bg-green">
          <div className="inner">
            <h3>
              {currencyFormatter.format(Number(data.summary.income || 0))}
            </h3>
            <p>Receitas</p>
          </div>
        </div>
      </div> */}

      <div className="col-md-3">
        <div className="small-box bg-purple">
          <div className="inner">
            <h3>
              {currencyFormatter.format(Number(data.debts.fatherInLaw || 0))}
            </h3>
            <p>Richard</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-red">
          <div className="inner">
            <h3>
              {currencyFormatter.format(Number(data.summary.expense || 0))}
            </h3>
            <p>Despesas</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-yellow">
          <div className="inner">
            <h3>
              {currencyFormatter.format(Number(data.summary.credit || 0))}
            </h3>
            <p>Cartão</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-green">
          <div className="inner">
            <h3>
              {currencyFormatter.format(Number(data.summary.balance || 0))}
            </h3>
            <p>Saldo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

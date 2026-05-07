type Props = {
  summary: {
    income: number;
    expense: number;
    credit: number;
    balance: number;
  };
};

export default function SummaryCards({ summary }: Props) {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="small-box bg-green">
          <div className="inner">
            <h3>R$ {summary.income}</h3>
            <p>Receitas</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-red">
          <div className="inner">
            <h3>R$ {summary.expense}</h3>
            <p>Despesas</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-yellow">
          <div className="inner">
            <h3>R$ {summary.credit}</h3>
            <p>Cartão</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="small-box bg-blue">
          <div className="inner">
            <h3>R$ {summary.balance}</h3>
            <p>Saldo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

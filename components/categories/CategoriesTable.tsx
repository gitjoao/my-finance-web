import Link from "next/link";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { currencyFormatter } from "@/app/utils/currency";

export default function CategoriesTable({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    limit?: number;
    color: string;
  }[];
}) {
  return (
    <div>
      <Link href={`/categories/new`} className="btn btn-success">
        <i className="fa fa-plus"></i> Adicionar
      </Link>
      <div className="box box-primary" style={{ marginTop: "20px" }}>
        <div className="box-header">
          <h3 className="box-title">Categorias</h3>
        </div>

        <div className="box-body table-responsive no-padding">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Limite</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td
                    style={{
                      backgroundColor: category.color,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {category.name}
                  </td>
                  <td>
                    {category.limit !== null
                      ? currencyFormatter.format(Number(category.limit))
                      : "-"}
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <Link
                        href={`/categories/${category.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa fa-pencil"></i> Editar
                      </Link>
                      <DeleteCategoryModal categoryId={category.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

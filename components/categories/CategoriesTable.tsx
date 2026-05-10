import Link from "next/link";
import DeleteCategoryModal from "./DeleteCategoryModal";

export default function CategoriesTable({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}) {
  return (
    <div className="box box-primary">
      <div className="box-header">
        <h3 className="box-title">Categorias</h3>
      </div>

      <div className="box-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
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
  );
}

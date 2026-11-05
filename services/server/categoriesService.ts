
import "server-only";
import { serverApiFetch } from "../api-service";

export async function getCategories(type?: string) {
    const params = new URLSearchParams();

    if (type) {
        params.append("type", type);
    }

    const query = params.toString();

    return serverApiFetch(
        `/categories${query ? `?${query}` : ""}`
    );
}

import http from "./api-url";

/**
 * @brief This function is used to get all the products.
 * @returns - The API call
 */
const getAll = () => {
    return http.get("/");
};

/**
 * @brief This function is used to get a specific product.
 * @param id - The id of the product to get
 * @returns - The API call
 */
const get = (id: any) => {
    return http.get(`/${id}`);
}

/**
 * @brief This function is used to create a new product with passed in data.
 * @param name - The name of the product
 * @param category - The category of the product
 * @param price - The price of the product
 * @returns - The API call
 */
const create = (name: any, category: any, price: any) => {
    return http.post("/", {
        Id: 1,
        Name: name,
        Category: category,
        Price: price
    });
}

/**
 * @brief This function is used to update a product.
 * @param id - The id of the product to update
 * @param data - The new data to update the product with
 * @returns - The API call
 */
const update = (id: any, data: any) => {
    return http.put(`/${id}`, data);
}

/**
 * @brief This function is used to delete a product.
 * @param id - The id of the product to delete
 * @returns - The API call
 */
const remove = (id: any) => {
    return http.delete(`/${id}`);
}

/**
 * @brief This function is used to filter the products based on the parameters passed in.
 * @param data - The list of filters
 * @returns - The API call
 */
const customSearch = (data: Map<String, any>) => {
    let url = "?";
    if (data.get("page") !== undefined) url += "page=" + data.get("page") + "&";
    if (data.get("pageSize") !== undefined) url += "pageSize=" + data.get("pageSize") + "&";
    if (data.get("orderBy") !== undefined) url += "orderBy=" + data.get("orderBy") + "&";
    if (data.get("ascending") !== undefined) url += "ascending=" + data.get("ascending") + "&";
    if (data.get("filter") !== undefined) url += "filter=" + data.get("filter") + "&";
    if (data.get("viewAll") !== undefined) url += "viewAll=" + data.get("viewAll") + "&";
    url = url.slice(0, -1);
    return http.get(url);
}

/**
 * @brief Provides the API requests for the products to external components.
 * @note Allows easy extension of the API calls.
 */
const Requests = {
    getAll,
    get,
    create,
    update,
    remove,
    customSearch
}

export default Requests;
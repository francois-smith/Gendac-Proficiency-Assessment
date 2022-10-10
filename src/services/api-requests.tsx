import http from "./api-url";

const getAll = () => {
    return http.get("/");
};

const get = (id: any) => {
    return http.get(`/${id}`);
}

const create = (name: any, category: any, price: any) => {
    return http.post("/", {
        Id: 1,
        Name: name,
        Category: category,
        Price: price
    });
}

const update = (id: any, data: any) => {
    return http.put(`/${id}`, data);
}

const remove = (id: any) => {
    return http.delete(`/${id}`);
}

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

const Requests = {
    getAll,
    get,
    create,
    update,
    remove,
    customSearch
}

export default Requests;
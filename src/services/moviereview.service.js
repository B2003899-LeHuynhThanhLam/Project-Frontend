import http from "../common/http";
import store from "../store";

class moviereviewService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }

    getAll() { return http.get("/moviereviews"); }
    get(id) { return http.get(`/moviereviews/${id}`); }
    create(data) { return http.post("/moviereviews", data); }
    update(id, data) { return http.put(`/moviereviews/${id}`, data); }
    delete(id) { return http.delete(`/moviereviews/${id}`); }
    deleteAll() { return http.delete("/moviereviews"); }
    findByName(title) { return http.get(`/moviereviews?title=${title}`); }
}
export default new moviereviewService();
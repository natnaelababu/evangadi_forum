import axios from "axios";
const axiosBase = axios.create({
	// baseURL: "http://localhost:8000/api",
	baseURL: "https://www.evangadiforum.backend.naty12.com/api",
});
export default axiosBase;

import axios from "axios";

const BASE_URL = "https://651ebd5c44a3a8aa4768e90d.mockapi.io";
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;
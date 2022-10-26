import request from "utils/request";
import { HW_CMS_API } from "utils/apis";

export const getCategories = () => request.get(`${HW_CMS_API}/categories/`);

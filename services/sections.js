import request from "utils/request";
import { EAHW_CMS_API } from "utils/apis";

export const getCategories = () => request.get(`${EAHW_CMS_API}/categories/`);

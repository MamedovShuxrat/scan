import axios from "axios";
import { DOCUMENTS_API_URL } from "../constants";

export const fetchDocsDetails = async ({ documentIds }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            DOCUMENTS_API_URL,
            {
                ids: documentIds
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
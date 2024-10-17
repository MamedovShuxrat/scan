import axios from "axios";
import { DOCUMENTS_ID_API_URL } from "../constants";
import { fetchDocumentsDetails } from "../store/slices/documentsSlice";

export const fetchDocsIDs = async ({
    inn,
    tonality,
    startDate,
    endDate,
    limit,
    maxFullnes,
    inBusinessNews,
    onlyMainRole,
    onlyWithRiskFactors,
    excludeTechNews,
    excludeAnnouncements,
    excludeDigests
}) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(
            DOCUMENTS_ID_API_URL,
            {
                issueDateInterval: {
                    startDate: startDate,
                    endDate: endDate,
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [
                            {
                                type: 'company',
                                sparkId: null,
                                entityId: null,
                                inn: inn,
                                maxFullness: maxFullnes,
                                inBusinessNews: inBusinessNews,
                            }
                        ],
                        onlyMainRole: onlyMainRole,
                        tonality: tonality,
                        onlyWithRiskFactors: onlyWithRiskFactors,
                    }
                },
                attributeFilters: {
                    excludeTechNews: excludeTechNews,
                    excludeAnnouncements: excludeAnnouncements,
                    excludeDigests: excludeDigests
                },
                limit: parseInt(limit) || 10,
                sortType: 'issueDate',
                sortDirectionType: 'desc'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            const docIDs = response.data.items.map(item => item.encodedId)
            dispatch(fetchDocumentsDetails({ ids: docIDs }))
            return docIDs;
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
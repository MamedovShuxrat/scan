import axios from "axios";
import toast from "react-hot-toast";
import { HISTOGRAMS_API_URL } from '../constants/index.js'

export const fetchHistograms = async ({
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
    const token = localStorage.getItem('token')

    try {
        const response = await toast.promise(
            axios.post(
                HISTOGRAMS_API_URL,
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
                    similarMode: 'none',
                    limit: parseInt(limit) || 15,
                    sortType: 'issueDate',
                    sortDirectionType: 'desc',
                    intervalType: 'month',
                    histogramTypes: ['totalDocuments', 'riskFactors']
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            ), {
            loading: 'Загрузка данных...',
            success: 'Данные успешно получены!',
            error: 'Ошибка при загрузке данных'
        }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

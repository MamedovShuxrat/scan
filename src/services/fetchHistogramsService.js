import axios from "axios";
import toast from "react-hot-toast";
import { HISTOGRAMS_API_URL } from '../constants/index.js'

// заполнили формы
// сформировали параметры запроса на основе данных формы (отдельная функция)
// передали параметры в функции для получения гистограм и публикаций
// вызвали функции через Promise.all
// отобразили результаты на новой странице

// fetch publications list

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
    // excludeTechNews,
    // excludeAnnouncements,
    // excludeDigests
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
                    // TODO надо или нет?
                    // attributeFilters: {
                    //     excludeTechNews:  excludeTechNews,
                    //     excludeAnnouncements:  excludeAnnouncements,
                    //     excludeDigests:  excludeDigests
                    // },
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
        console.log(response.data, 'fetch');

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

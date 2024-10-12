import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL
const fetchHistogramsUrl = `${API_URL}/api/v1/objectsearch/histograms/`

// export const fetchHistograms = async (params, token) => {
//     try {
//         const response = await toast.promise(
//             axios.post(fetchHistogramsUrl, {
//                 issueDateInterval: {
//                     startDate: params.startDate,
//                     endDate: params.endDate,
//                 },
//                 searchContext: {
//                     targetSearchEntitiesContext: {
//                         targetSearchEntities: [
//                             {
//                                 type: 'company',
//                                 sparkId: null,
//                                 entityId: null,
//                                 inn: params.inn,
//                                 maxFullness: params.maxFullness,
//                                 inBusinessNews: params.inBusinessNews,
//                             }
//                         ],
//                         onlyMainRole: params.onlyMainRole,
//                         tonality: params.tonality,
//                         onlyWithRiskFactors: params.onlyWithRiskFactors,
//                         riskFactors: {
//                             and: [],
//                             or: [],
//                             not: []
//                         },
//                         themes: {
//                             and: [],
//                             or: [],
//                             not: []
//                         }
//                     },
//                     themesFilter: {
//                         and: [],
//                         or: [],
//                         not: []
//                     }
//                 },
//                 searchArea: {
//                     includedSources: [],
//                     excludedSources: [],
//                     includedSourceGroups: [],
//                     excludedSourceGroups: []
//                 },
//                 attributeFilters: {
//                     excludeTechNews: !params.excludeTechNews,
//                     excludeAnnouncements: !params.excludeAnnouncements,
//                     excludeDigests: !params.excludeDigests
//                 },
//                 similarMode: 'duplicates',
//                 limit: params.limit || 1000,
//                 sortType: 'sourceInfluence',
//                 sortDirectionType: 'desc',
//                 intervalType: 'month',
//                 histogramTypes: ['totalDocuments', 'riskFactors'],
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }))
//         console.log(response, 'fetch');

//         return response.data;
//     } catch (error) {
//         throw error
//     }
// }

export const fetchHistograms = async (params, token) => {
    try {
        const response = await toast.promise(
            axios.post(fetchHistogramsUrl, {
                issueDateInterval: {
                    startDate: params.startDate,
                    endDate: params.endDate,
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [
                            {
                                type: 'company',
                                sparkId: null,
                                entityId: null,
                                inn: params.inn,
                                maxFullness: params.maxFullness,
                                inBusinessNews: params.inBusinessNews,
                            }
                        ],
                        onlyMainRole: params.onlyMainRole,
                        tonality: params.tonality,
                        onlyWithRiskFactors: params.onlyWithRiskFactors,
                        riskFactors: {
                            and: [],
                            or: [],
                            not: []
                        },
                        themes: {
                            and: [],
                            or: [],
                            not: []
                        }
                    },
                    themesFilter: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },
                attributeFilters: {
                    excludeTechNews: !params.excludeTechNews,
                    excludeAnnouncements: !params.excludeAnnouncements,
                    excludeDigests: !params.excludeDigests
                },
                similarMode: 'duplicates',
                limit: params.limit || 1000,
                sortType: 'sourceInfluence',
                sortDirectionType: 'desc',
                intervalType: 'month',
                histogramTypes: ['totalDocuments', 'riskFactors'],
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        )
        console.log(response, 'fetch');

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
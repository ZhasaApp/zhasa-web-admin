import axios from 'axios';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {TOKEN} from "../components/constants.ts";
import {BASE_URL} from "../utils/EnvConstants.ts";

function useAllSaleTypes() {
    const saleTypes = ref<any[]>([]);
    const isLoading = ref(true);
    let totalCount = ref(0);
    const rowHeight = 57;
    const size = ref(12);

    const calculateSize = () => {
        const viewportHeight = window.innerHeight;
        if (isMobile()) {
            size.value = 20
        } else {
            size.value = Math.floor((viewportHeight-310) / rowHeight);
        }
    };

    const isMobile = () => {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    }

    onMounted(() => {
        calculateSize();
        window.addEventListener('resize', calculateSize);
        fetching(1, '', undefined); // Initial fetch
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', calculateSize);
    });


    const headers = {
        'Authorization': TOKEN,
    };
    const fetching = async (page: number, searchValue: string, sortState: any): Promise<void> => {
        try {
            const sortParams = (!sortState || sortState.sortState === 'none' ) ? '' : `&sort_field=title&sort_type=${sortState.sortState}`
            const url = `${BASE_URL}/sale-types?page=${page - 1}&size=${size.value}${sortParams}&search=${searchValue}`

            const response = await axios.get<ResponseType>(url,{headers});
            saleTypes.value = response.data?.result
            totalCount.value = response.data?.count
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        const initialPage = 1;
        fetching(initialPage, '',undefined);
    });

    return {
        saleTypes: saleTypes,
        isLoading,
        totalCount,
        size,
        fetching
    };
}

export interface SaleType {
    id: number;
    title: string
}

interface ResponseType {
    result: SaleType[],
    count: number
}

export default useAllSaleTypes
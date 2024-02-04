import axios from 'axios';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {TOKEN} from "../components/constants.ts";
import {BASE_URL} from "../utils/EnvConstants.ts";

function useAllBranches() {
    const branches = ref<any[]>([]);
    const isLoading = ref(true);
    let totalCount = ref(0);
    const rowHeight = 57;
    const size = ref(12);

    const calculateSize = () => {
        const viewportHeight = window.innerHeight;
        size.value = Math.floor((viewportHeight-310) / rowHeight);
    };

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
            const url = `${BASE_URL}/branches?page=${page - 1}&size=${size.value}${sortParams}&search=${searchValue}`

            const response = await axios.get<ResponseType>(url,{headers});
            branches.value = response.data?.result
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
        branches,
        isLoading,
        totalCount,
        size,
        fetching
    };
}

export interface Branch {
    id: number;
    title: string;
    description: string;
}

interface ResponseType {
    result: Branch[],
    count: number
}

export default useAllBranches
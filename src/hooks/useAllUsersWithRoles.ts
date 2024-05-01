import axios from 'axios';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {TOKEN} from "../components/constants.ts";
import {BASE_URL} from "../utils/EnvConstants.ts";

function useAllUsersWithRoles() {
    const users = ref<any[]>([]);
    const isLoading = ref(true);
    let totalCount = ref(0);
    const rowHeight = 57; // Adjust this to match your row height
    const size = ref(12); // Default value, will be updated based on viewport

    const calculateSize = () => {
        const viewportHeight = window.innerHeight;
        size.value = Math.floor((viewportHeight - 310) / rowHeight);
    };

    // Add window resize event listener
    onMounted(() => {
        calculateSize();
        window.addEventListener('resize', calculateSize);
        fetching(1, '', [], [], [], undefined, false); // Initial fetch
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', calculateSize);
    });


    const headers = {
        'Authorization': TOKEN,
    };
    const fetching = async (page: number, searchValue: string, roleKeys: string[], brandsFilter: string[], branchesFilter: string[], sortState: any, showDeletedUsers: boolean): Promise<void> => {
        try {
            const roleKeysParams = roleKeys.map(key => `&role_keys=${encodeURIComponent(key)}`).join('&');
            const brandsParams = brandsFilter.map(key => `&brand_ids=${encodeURIComponent(key)}`).join('&');
            const branchesParams = branchesFilter.map(key => `&branch_ids=${encodeURIComponent(key)}`).join('&');
            const sortParams = (!sortState || sortState.sortState === 'none') ? '' : `&sort_field=${sortState.columnName == 'fullName' ? 'fio' : 'branch'}&sort_type=${sortState.sortState}`
            console.log("roleKeysParams=", roleKeysParams)
            console.log("sortParams=", sortParams)
            const url = `${BASE_URL}/users?page=${page - 1}&size=${size.value}${roleKeysParams}${brandsParams}${branchesParams}${sortParams}&show_deleted=${showDeletedUsers}&search=${searchValue}`
            console.log("url=", url)

            const response = await axios.get<ResponseType>(url, {headers});
            users.value = response.data?.result
            totalCount.value = response.data?.count
        } catch (error) {
            console.log(error)
            // alert(error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        const initialPage = 1;
        fetching(initialPage, '', [], [], [], undefined, false);
    });

    return {
        users,
        isLoading,
        totalCount,
        size,
        fetching
    };
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    branch_title: string;
    brands: string;
}

interface ResponseType {
    result: User[],
    count: number
}

export default useAllUsersWithRoles
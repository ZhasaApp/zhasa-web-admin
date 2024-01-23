import axios from 'axios';
import {ref, onMounted} from 'vue';
import {TOKEN} from "../components/constants.ts";

function useAllUsersWithRoles() {
    const users = ref<any[]>([]);
    const isLoading = ref(true);
    let totalCount = ref(0);
    const size = 12
    const headers = {
        'Authorization': TOKEN,
    };
    const fetching = async (page: number, searchValue: string, roleKeys: string[]): Promise<void> => {
        try {
            const roleKeysParams = roleKeys.map(key => `role_keys=${encodeURIComponent(key)}`).join('&');
            const response = await axios.get<ResponseType>(
                `http://185.182.219.90/admin/users?page=${page - 1}&size=${size}&search=${searchValue}&${roleKeysParams}`,
                {
                    headers
                }
            );
            users.value = response.data?.result
            totalCount.value = response.data?.count
        } catch (error) {
            alert(error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        const initialPage = 1;
        fetching(initialPage, '',[]);
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
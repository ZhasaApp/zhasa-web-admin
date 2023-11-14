import axios from 'axios';
import { ref, onMounted } from 'vue';
import {TOKEN} from "../components/constants.ts";
function useAllUsersWithRoles() {
    const users = ref<any[]>([]);
    const isLoading = ref(true);
    const headers = {
        'Authorization': TOKEN,
    };
    const fetching = async (): Promise<void> => {
        try {
            const response = await axios.get<ResponseType>(
                'http://185.182.219.90/admin/users?page=0&size=13&role_key=sales_manager',
                {
                    headers
                }
            );
            users.value = response.data?.result
        } catch (e) {
            alert('Ошибка');
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetching);

    return {
        users,
        isLoading
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
    result : User[]
}

export default useAllUsersWithRoles
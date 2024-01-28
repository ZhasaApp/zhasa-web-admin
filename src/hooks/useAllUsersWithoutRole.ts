import axios from 'axios';
import {ref, onMounted} from 'vue';
import {TOKEN} from "../components/constants.ts";
import {BASE_URL} from "../utils/Constants.ts";

function useAllUsersWithoutRole() {
    const users = ref<User[]>([]);
    const isLoading = ref(true);
    const headers = {
        'Authorization': TOKEN,
    };
    const fetching = async (): Promise<void> => {
        try {
            const response = await axios.get<ResponseType>(
                `${BASE_URL}/users/no-roles`,
                {
                    headers
                }
            );
            users.value = response.data?.result;
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
    Id: number;
    FirstName: string;
    LastName: string;
}

interface ResponseType {
    result: User[]
}

export default useAllUsersWithoutRole
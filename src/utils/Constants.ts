export interface RoleOption {
    text: string;
    value: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
    { text: "Owner", value: "owner" },
    { text: "РОП", value: "branch_director" },
    { text: "Менеджер", value: "sales_manager" }
];
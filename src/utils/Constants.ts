export interface RoleOption {
    text: string;
    value: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
    { text: "Директор", value: "owner" },
    { text: "Руководитель отдела продаж", value: "branch_director" },
    { text: "Менеджер по продажам", value: "sales_manager" },
    { text: "Менеджер компании", value: "company_viewer" },
    { text: "Менеджер филиала", value: "branch_viewer" }
];
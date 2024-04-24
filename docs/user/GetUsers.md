# Get User List

## API

- `GET {base_url}/admin/users`

## Request

### Query Params

- `page: integer` - user list page
- `size: integer` - elements number in one page
- `role_keys: Array<string>` - user roles: `sales_manager, branch_director, owner`
- `brand_ids: Array<integer>` - brand ids
- `branch_ids: Array<integer>` - branch ids
- `sort_field: string` - sort field name `fio, branch`
- `sort_type: string` - sort type `asc, desc`
- `search: string` - searching text
- `show_deleted: boolean` - show deleted users `true, false`


## Response

```json
{
  "result": [
    {
      "id": 1,
      "first_name": "Isaya",
      "last_name": "Baygereev",
      "role": "manager",
      "phone": "+77081070480",
      "branch_title": "ТОО \"DCG ALMATY\"",
      "brands": [
        "KIA"
      ],
      "is_active": true
    }
  ],
  "has_next": true,
  "count": 90
}
```

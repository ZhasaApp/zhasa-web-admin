# Get User List

## API

- `GET {base_url}/admin/users`

## Request

### Query Params

- `page: number` - user list page
- `size: number` - elements number in one page
- `role_key: string` - user role: `manager, director, admin`
- `brand_id: number` - brand id
- `branch_id: number` - branch id
- `search: string` - searching text


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

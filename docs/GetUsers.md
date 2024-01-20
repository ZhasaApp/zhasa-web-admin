# Get User List

## API

- `GET {base_url}/admin/users`

## Request

### Query Params

- `page: integer` - user list page
- `size: integer` - elements number in one page
- `role_keys: Array<string>` - user roles: `manager, director, admin`
- `brand_ids: Array<integer>` - brand ids
- `branch_ids: Array<integer>` - branch ids
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
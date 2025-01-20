# Create User

## API

- `POST {base_url}/admin/user`

## Request

### Request Body

"role" values: 
- "owner", 
- "branch_director", 
- "sales_manager", 
- "company_viewer", 
- "branch_viewer"

```json
{
  "phone": "+7781070480",
  "first_name": "Isaya",
  "last_name": "Baygereev",
  "role": "manager",
  "brand_ids": [
    1
  ],
  "branch_id" : 1
}
```


## Response

```json
{}
```

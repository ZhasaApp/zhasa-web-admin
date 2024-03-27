# Get All Brands

## API

- `GET {base_url}/admin/brands`

## Request


### Query Params

- `page: integer` - list page
- `size: integer` - elements number in one page
- `sort_field: string` - sort field name `title`
- `sort_type: string` - sort type `asc, desc`
- `search: string` - searching text

## Response

```json
{
  "result": [
    {
      "id": 1,
      "title": "KIA"
    }
  ],
  "has_next": true,
  "count": 90
}
```

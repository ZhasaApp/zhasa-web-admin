# Get All Sale Types

## API

- `GET {base_url}/admin/sale-type`

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
      "title": "Automobile"
    }
  ],
  "has_next": true,
  "count": 90
}
```

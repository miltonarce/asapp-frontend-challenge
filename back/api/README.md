# Cities API

* [GET /cities](#get-cities)
* [GET /cities/:id](#get-citiesid)
* [GET /preferences/cities](#get-preferencescities)
* [PATCH /preferences/cities](#patch-preferencescities)

### GET /cities

Returns the list of cities. It uses Offset-Limit pagination.

The list was obtained from https://datahub.io/core/world-cities

The server returns the data sorted by city name.

#### Query Parameters

- **offset**: the index where to start the page (minimum value 0).
- **limit**: the number of items to return (minimum value 1).
- **filter**: a string to filter the cities. The filtering implementation is
  very limited, it doesn't do any stemming or fuzzy search. It simply does a
  case insensitive search on name, county and subcountry.

#### Response

```typescript
type ApiResponse = {
  data: CityInfo[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
};

type CityInfo = {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};
```

- **data** is an array with the request results. By default results are limited
  to 10 items.
- **links** contain links to the first, next, previous, last pages. If there
  aren't next or previous pages the links are undefined.
- **filter** repeats the filter parameter given in the query string to indicate
  that the result is filtered.
- **total** the total number items available (`data.length <= total`)

City information:

- **geonameid** is a unique identifier that comes from the original data set.
- The name **subcountry** comes from the original data set, and it represents a
  State or Province inside the country. Some cities don't have a subcountry
  (e.g. Monaco).

### GET /cities/:id

Returns the city name information for the given city id.

#### Response

```typescript
type CityInfo = {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};
```

### GET /preferences/cities

Returns the cities selected by the user.

#### Query Parameters

- **offset**: the index where to start the page (minimum value 0)
- **limit**: the number of items to return (minimum value 1)

#### Response

```typescript
type PreferredCitiesResponse = {
  data: number[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
};
```

- **data** is an array with the **geonameid** of each selected city.
- **total** and **links** follows the same pagination patterns as `GET /cities`.

### PATCH /preferences/cities

Modifies the preferred cities.

#### Request Payload

An object where each property key is a city id, and each value is a boolean
indicating if the city is selected or not.

```typescript
type PreferredCitiesPatch = {
  [string]: boolean;
};
```

#### Response

Empty. It returns the 204 status code on success.

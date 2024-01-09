# Test Task

The test task includes creating four routes and modifications to the registration route (creating a wallet on sha256 hashing). Each route of new API, which is named "user", has an own validation.

---
Acrhitecture: [figma](https://www.figma.com/file/3Fzb8rJZoMzq9mZIwgqYNa/%22AMD-GROUP%22-test-task?type=whiteboard&t=HdWaIqZIa3ncuXnN-6)

---
## Documentation

- `POST: /api/auth/registration`

Сreating a user with a wallet by a 1-to-1 association

- `GET: /api/user/{id}`

Searching user's id

- `GET: /api/user/search`

Getting default pagination of all users

- `GET: /api/user/search/{email?}`

Searching user by email

- `GET: /api/user/search?page=1&pageSize=4`

Getting pagination of all users with query

- `GET: /api/user/info/last-month`

Getting pagination of all users withing last month

- `GET: /api/user/info/last-month?page=1&pageSize=4`

Getting pagination of all users withing last month with query

- `PUT: /api/user/update`

Updating user's firt or last names


## How to run?

```bash
pnpm install
pnpm start
```

for testing:

```bash
pnpm test
```

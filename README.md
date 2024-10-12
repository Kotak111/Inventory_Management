<h1 align="center">MERN-Backend Inventory_management</h1>




## Features

- CRUD operations for inventory and supplier management.
- Bulk data export to CSV for projects.
- Bulk data import from CSV 

### API Endpoints

#### Inventory Endpoints

- **Create Inventory Item**
  - `POST /api/inventory`
  - Request Body: `{ name: String, description: String, quantity: Number, price: Number, supplier: ObjectId }`

- **Get All Inventory Items**
  - `GET /api/inventory`

- **Get Inventory Item by ID**
  - `GET /api/inventory/:id`

- **Update Inventory Item**
  - `PUT /api/inventory/:id`
  - Request Body: `{ name: String, description: String, quantity: Number, price: Number, supplier: ObjectId }`

- **Delete Inventory Item**
  - `DELETE /api/inventory/:id`

- **Export Inventory Data as CSV**
  - `GET /api/inventory/export`

- **Import Inventory Data from CSV**
  - `POST /api/inventory/import`
  - Content-Type: `multipart/form-data`
  - Body: File upload

#### Supplier Endpoints

- **Create Supplier**
  - `POST /api/suppliers`
  - Request Body: `{ name: String, contact: String, address: String }`

- **Get All Suppliers**
  - `GET /api/suppliers`

- **Get Supplier by ID**
  - `GET /api/suppliers/:id`

- **Update Supplier**
  - `PUT /api/suppliers/:id`
  - Request Body: `{ name: String, contact: String, address: String }`

- **Delete Supplier**
  - `DELETE /api/suppliers/:id`



### Setup .env file

```bash
DATABASE_URL=Your_mongo_url
PORT=Sevice_port
NODE_ENV=NODE_ENVIRINMENT
JWT_SECRET=jwt_secret
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm start
```

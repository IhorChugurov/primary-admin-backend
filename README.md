# Primary admin panel

Primary admin panel.

## Overview

Application was developed using following technologies: Nestjs, TypeScript, PostgreSQL, TypeORM.

## Prerequisites

- **NodeJS** v20.16 or latest
- **pnpm** v9.1.1
- **PostgreSQL** v16.3 or latest

## Links to Other Resources

- [DB design](https://lucid.app/lucidchart/17879a4a-33f1-482f-981e-a54d1782742a/edit?view_items=Ae~U7VdtPQVO&invitationId=inv_c5bf069b-46f6-48ed-b40e-50b1a6546791)
- [Design](https://www.figma.com/design/FIUrFnJWbJ0MyupUiEDvl5/Template-Administration?node-id=0-1&t=SLq2JcvrVNXhQ6B4-1)
- Postman collection in the root of the project

## Docker Installation

To deploy this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone git@github.com:IhorChugurov/primary-admin-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd primary-admin-backend
    ```

3. Create **docker-compose.yml** file based on the example in the root folder of the project. Use your database credentials.

4. Create **.env** file based on the example in the root folder of the project. Use your database credentials.

5. Run the database docker container:
    ```sh
    docker-compose up -d --build
    ```

## Manual Installation

To deploy this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone git@github.com:IhorChugurov/primary-admin-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd primary-admin-backend
    ```

3. If necessary, install **pnpm** globally:
    ```sh
    npm install -g pnpm@9.1.1 
    ```

4. Install dependencies:
    ```sh
    pnpm install --frozen-lockfile
    ```

5. If necessary, install **TypeORM** globally:
    ```sh
    npm install -g typeorm
    ```

6. If necessary, install **ts-node** globally:
    ```sh
    npm install -g ts-node
    ```

7. Create **docker-compose.yml** file based on the example in the root folder of the project. Use your database credentials.

8. Run the database docker container:
    ```sh
    docker-compose up -d --build
    ```

9. Create **.env** file based on the example in the root folder of the project. Use your database credentials.

10. Build the project:
    ```sh
    pnpm run build
    ```

11. Run migration to initialize the database:
    ```sh
    pnpm run migration:run
    ```

12. Seed the database:
    ```sh
    pnpm run seed
    ```

13. Run the project:
    ```sh
    npm run start:prod
    ```

# Primary admin panel

Primary admin panel.

## Overview

Application was developed using following technologies: Nestjs, TypeScript, PostgreSQL, TypeORM.

## Prerequisites

- **NodeJS** v18.17 or latest
- **pnpm** v9.1.1 or latest
- **PostgreSQL** v16.3 or latest

## Links to Other Resources

- [DB design](https://lucid.app/lucidchart/17879a4a-33f1-482f-981e-a54d1782742a/edit?view_items=Ae~U7VdtPQVO&invitationId=inv_c5bf069b-46f6-48ed-b40e-50b1a6546791)
- Postman collection in the root of the project
- [Design](https://www.figma.com/design/FIUrFnJWbJ0MyupUiEDvl5/Template-Administration?node-id=0-1&t=SLq2JcvrVNXhQ6B4-1)

## Installation

To deploy this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone git@github.com:IhorChugurov/primary-admin-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd primary-admin-backend
    ```

3. Install dependencies:
    ```sh
    pnpm install
    ```

4. If necessary, install **TypeORM** globally:
    ```sh
    npm install -g typeorm
    ```

5. If necessary, install **ts-node** globally:
    ```sh
    npm install -g ts-node
    ```

6. Create **docker-compose.yml** file based on the example in the root folder of the project. Use your database credentials.

7. Run the database docker container:
    ```sh
    docker-compose up -d
    ```

8. Create **typeorm-cli.config.ts** file based on the example in the root folder of the project. Use your database credentials.

9. Run migration to initialize the database:
    ```sh
    npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d typeorm-cli.config.ts
    ```

10. Seed the database:
    ```sh
    ts-node -r tsconfig-paths/register src/seeds/seed.ts
    ```

11. Create **.env.production** file based on the example in the root folder of the project. Use your database credentials.

12. Run the project:
    ```sh
    npm run start:prod
    ```

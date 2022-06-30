Steps from scratch:
docker run --name wiicket-database -e POSTGRES_PASSWORD=rossana -p 5432:5432 -d postgres

Use Azure Data Studio or your preffered client to connect to DB and check everything is working

Run yarn, and yarn start:dev

Follow these [steps](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres) if prisma does not work for some reason:

Note: The "npx prisma init" command will probably not work, that's ok.)

[Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
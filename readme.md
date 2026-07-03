### step by step guide how to stepup nodejs Project with TS by Piyush Garg Code Style.

## Auth with TypeScript and use DB with Drizzle & Postgres.

// Our complete workflow of the project.

user <------>  authservice(Backend) <------ Data ------> Drizzle <----> Postgres.

service ---> 1. /Signup
             2. /Signin
             3. /logout


## used Tech -> 
        * nodejs 
        * use Docker Desktop because use Postgres image
        * ORM use Drizzle 
        * DB Postgres
        * Use pnpm package Manager


## Start Now Project Setup :- 
    1. pnpm init 
    2. tsc --init 
    3. mkdir /src
    4. tsconfig -> [rootDir : "./src", outDir : "./dist"]
    5. Create gitignore file -> npx gitignore node
    6. Create index.ts file in src folder.
    7. In this file write down Console.log("HElllo word);
    8. Update Package.json File -> 
                "start" : "node dist/index",
                "build" : "tsc -p . ",
                "dev" : "tsc-watch --onSuccess \"node dist/index\""
    9. Download the Watching Package --> pnpm i tsc-watch -D

    ## Setup express 
    
    10. pnpm i express.
    11. Express types ---> pnpm i types@express
    12. Node Types ---> pnpm add -D @types/node

    // after start code setup experss app. 
    
    // src/index.ts <------- this file control like server listen and call db function that connect the DB. 

    // src/app/index.ts <-------- it create req and res listen app like setup express code after that setup the code call and then listen all type of request.

    // env.ts <------ in this file create validation in enviornment vairiable file... 
                       this file show strict rule after that validation.
                       // file content is here...
                       services:
                          postgresdb : 
                                image: postgres:17  
                                ports:
                                   - "5432:5432"
                        environment:
                            POSTGRES_USER : postgres
                            POSTGRES_PASSWORD : postgres
                            POSTGRES_DB : chaicode
                        volumes:
                                - "postgres_data:/var/lib/postgresql/data"

                volumes:
                        postgres_data:



        // After that create this file run docker container start commond and run and then check the container is on or not.

        // And after start setup postgres sql database setup.


    

# Authentication-Module-with-TS-Drizzle-Postgres

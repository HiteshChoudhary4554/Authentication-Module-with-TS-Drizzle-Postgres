import http from 'node:http';
import { createServerApplication } from './app/index';
import { env } from './env';

async function main() {
    try {
        const server = http.createServer(createServerApplication());
        const PORT : number = env.PORT ? +env.PORT : 8080;
        server.listen(PORT, () => {
            console.log(`Server listening on PORT at ${PORT}...`)
        })
        
    } catch (error) {
        console.log("error",error);
        throw error
    }
}

main();

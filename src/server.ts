process.on('uncaughtException', function(err) {
	console.error('Uncaught Exception:', err);
});


import express from 'express';
import { Server } from 'http';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import { HealthRoutes } from './routes';


export const app = express();

//environment variable dependents
const port: string = (process.env.PORT) || "3000";
const gracefulTerminationTimeout: number = process.env.GRACEFUL_TERMINATION_TIMEOUT as unknown as number || 5000

//express configuration
app.set("port", process.env.PORT || 3000);


const server: Server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
});

const httpTerminator: HttpTerminator = createHttpTerminator({ gracefulTerminationTimeout, server });

// Handle shutdown signals
process.on('SIGTERM', () => {
	console.log('sigterm received');
	httpTerminator.terminate();
})

process.on('SIGINT', () => {
	console.log('sigint received');
	httpTerminator.terminate();
})

app.use('/health', HealthRoutes)

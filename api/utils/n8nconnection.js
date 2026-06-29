import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();


const n8nBaseUrl = process.env.N8N_WEBHOOK_URL_PROD || "http://localhost:5678";


let heartbeatTimer = null;
const MAX_RETRIES = 8;       // Maximum retry attempts if a ping fails
const RETRY_DELAY = 60000;    // 60 wait seconds before retrying

// Helper function that handles a single ping with recursive retries

async function sendPing(attempt = 1) {
    try {
        const res = await axios.get(`${n8nBaseUrl}/webhook/backend-heartbeat`);
        console.log('💓 Heartbeat sent successfully to n8n.');
    } catch (error) {
        console.log('ℹ️ Attempting to sync with n8n service container...')

        if (attempt < MAX_RETRIES) {
            console.log(`⏳ Retrying heartbeat in ${RETRY_DELAY / 1000} seconds...`);

            setTimeout(() => {
                sendPing(attempt + 1);
            }, RETRY_DELAY);
        } else {
            console.error('🚨 Max heartbeat retries reached. n8n failed to start.');
        }
    }
}

function startN8nHeartBeat() {
    if (heartbeatTimer) return

    console.log('⚡ Express has initialized. Starting n8n heartbeat...')

    // Immediate ping to n8n right when the backend boots
    sendPing()

    // Render free tier spins off after 10-16 mins idle time.
    // Ping n8n every 10 minutes (600,000 ms) to keep it awake.

    heartbeatTimer = setInterval(async () => {
        sendPing()
    }, 300000)

}

export default startN8nHeartBeat
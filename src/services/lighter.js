import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

class LighterService {
    LIGHTER_API_URL;

    constructor() {
        
        this.LIGHTER_API_URL = process.env.LIGHTER_API_URL;
        console.log('LIGHTER_API_URL:', this.LIGHTER_API_URL);
    }

    async getLighterLive(){
        try {
            const response = await fetch(`${this.LIGHTER_API_URL}/live`);
            if (!response.ok) {
                throw new Error(`Error fetching lighter live data: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            console.error('Error fetching lighter live data:', error);
            throw error;
        }
    }

    async triggerGoalLights(){
        try {
            const response = await fetch(`${this.LIGHTER_API_URL}/goal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Error triggering goal lights: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            console.error('Error triggering goal lights:', error);
            throw error;
        }
    }

}

export default new LighterService();
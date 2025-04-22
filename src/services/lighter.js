import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

class LighterService {
    

    constructor() {
        this.LIGHTER_API_URL = process.env.LIGHTER_API_URL || 'http://localhost:3000';
    }

    async getLighterLive(){
        try {
            const response = await fetch(`${this.LIGHTER_API_URL}/live`);
            if (!response.ok) {
                throw new Error(`Error fetching lighter live data: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching lighter live data:', error);
            throw error;
        }
    }

}

export default new LighterService();
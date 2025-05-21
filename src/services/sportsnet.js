import fetch from 'node-fetch';
import lighter from "./lighter.js";
import dotenv from 'dotenv';
dotenv.config();

class SportsNetService{
    baseUrl = 'https://stats-api.sportsnet.ca/livetracker?league=nhl&id=';

     constructor() {
        this.GAME_ID = process.env.GAME_ID || '';
        this.latestData = null;
        this.awayScore = null;
        this.homeScore = null;
        this.leafsScore = null;
        this.leafsHome = null;
        this.initializeData();
        this.startPinging();
    }

    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}${this.GAME_ID}`);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async initializeData(){
        let data = await this.getGameData()
        this.latestData = data;
        console.log('initial data' + JSON.stringify(data));
        if(data){
            console.log('game data' + JSON.stringify(data));
            console.log('away team' + data.data.game.visiting_team.short_name);
            console.log('home team' + data.data.game.home_team.short_name);
            this.leafsHome = data.data.game.home_team.short_name == 'TOR';
            this.homeScore = data.data.game.home_team.score;        
            this.awayScore = data.data.game.visiting_team.score;
            if(this.leafsHome){
                this.leafsScore = this.homeScore;
            }else{
                this.leafsScore = this.awayScore;
            } 
        } ;
    }

    async startPinging() {
        this.getGameData();
        setInterval(() => this.getGameData(), 5000); // Ping every 5 seconds
    }


    async setscore(){
        if(this.latestData){
                this.homeScore = this.latestData.data.game.home_team.score;        
                this.awayScore = this.latestData.data.game.visiting_team.score; 
        }
        if(this.leafsHome){
            if(this.homeScore > this.leafsScore){
                console.log('SCORE!!!!');
                await lighter.triggerGoalLights();
                this.leafsScore = this.homeScore;
            }
        }else{
            if(this.awayScore > this.leafsScore){
                console.log('SCORE!!!!');
                await lighter.triggerGoalLights();
                this.leafsScore = this.awayScore;
            }
        }
    }


    updateLog(){
        const timestamp = new Date().toISOString();
        if(this.leafsHome){
            console.log(`${timestamp} - Leafs Score: ${this.homeScore} | Opponent Score: ${this.awayScore}`);
        }else{
            console.log(`${timestamp} - Opponent Score: ${this.homeScore} | Leafs Score: ${this.awayScore}`);
        }
    }

    async getGameData() {
        try {
            const response = await fetch(`${this.baseUrl}${this.GAME_ID}`)
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const data = await response.json()
                    this.latestData = data;
              
                    await this.setscore();
                    this.updateLog();
                return data;

           
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default new SportsNetService();
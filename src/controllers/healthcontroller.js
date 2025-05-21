import lighter from "../services/lighter.js";
import sportsnet from "../services/sportsnet.js";   

class HealthController {
  livecheck(req, res) {
    res.status(200).json({ status: 'UP' });
  }

  async smoketest(req, res) {
    let health = false
    try{
        await lighter.getLighterLive().then(result => {
            if (result.status === 200) {
                health = true
            }else{
                throw new Error('Lighter service is down');
            }
        });

        await sportsnet.healthCheck().then(result => {
            if (result.status === 200) {
                health = true;
            }else{
                console.error('Sportsnet status:', result.status);
                throw new Error('Sportsnet service is down');
            }
        });

        if (health) {
            res.status(200).json({ status: 'UP' });
        } else {
            res.status(503).json({ status: 'DOWN' });
        }
    }catch (error) {
        res.status(500).json({ status: 'DOWN', error: error.message });
    }
}
}

export default HealthController;

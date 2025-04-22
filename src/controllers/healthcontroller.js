import lighter from "../services/lighter.js";

class HealthController {
  livecheck(req, res) {
    res.status(200).json({ status: 'UP' });
  }

  async smoketest(req, res) {
    try{
        await lighter.getLighterLive().then(result => {
            if (result.status === 200) {
                res.status(200).json({ status: 'UP' });
            }else{
                throw new Error('Lighter service is down');
            }
        });
    }catch (error) {
        res.status(500).json({ status: 'DOWN', error: error.message });
    }
}
}

export default HealthController;

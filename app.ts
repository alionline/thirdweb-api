import express from 'express';
var app        = express();
import bodyParser from 'body-parser';

import { bundleModule } from './app/thirdweb/thirdweb';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router(); 

//router GET method on / will return the connected bundleModule
router.get('/', function(req, res) {
    res.json(bundleModule);
});

  // check if address can claim a NFT
  const canClaim = async (tokenId, quantity, addressToCheck) => {
    try {
      var resp = await bundleModule.canClaim(tokenId, quantity, addressToCheck);
      return resp;
    } catch (error) {
      console.log('Failed to canClaim. Error: ', error);
    }
  };


  // Claim a NFT to the specified address
  const claimTo = async (tokenId, quantity, address) => {
    try {
      var resp = await bundleModule.claimTo(tokenId, quantity, address);
      return resp;
    } catch (error) {
      console.log('Failed to claimTo. Error: ', error);
    }
  };

  
//define a new route to the router
router.route('/won')
    .post(async function(req, res) {
      var reqBody = req.body;
      console.log('wallet: ' + reqBody.wallet)
      
      res.send(await claimTo('0', '1', reqBody.wallet))
})

// tell express to use the router after a prefix.
app.use('/api', router);

//server start listening on defined port
app.listen(port);
console.log('Server started on port ' + port);

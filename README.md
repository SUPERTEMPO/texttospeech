# texttospeech
This is microsoft text to speech sample app designed &amp; developed by peter kelvin torver using the microsoft text to speech nodejs sdk with reactjs &amp; nodejs express server.
## To See the demo
A demo is worth a thousand words.
Go to https://texttospeechapp.herokuapp.com/
## How to run this sample locally
Git clone https://github.com/SUPERTEMPO/texttospeech.git

To run this project locally, open two terminals,
***Use one terminal to start the client app in react js***
1. **cd client**
2. **npm install**
3. Go to ***/client/src/util/helper.js*** file and edit the ***SERVER_URL*** to point to your server url address like **http:localhost:5000**
4. **npm start**

***Use the other terminal to start the server side in nodejs***
1. **cd server**
2. **npm install**
3. create ***.env*** file in the root ***server*** directory following the example set in ***.env.example***. This file should contain your microsoft ***service region*** & ***subscription key***. If you don't have this credentials available go to https://azure.microsoft.com/en-us/free/ follow the instructions to obtain your keys.
4. Go to ***/server/config/corsconfig.js*** file and ensure your client side url is listed as one of the domains to be used by cors to allow client & server communication.
5. Once everything is done, run **nodemon** on the terminal and this should start your server.



**Happy Coding! &hearts;**

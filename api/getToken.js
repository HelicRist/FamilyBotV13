const config = require("../config.json");
const axios = require("axios").default;

module.exports = {
    name: "getToken",
    description: "get argo token with user and password",

    run: async (username, password) => {
        let token = "";

        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'x-cod-min, x-user-id, x-pwd, x-key-app',
                'Content-Type': 'application/json; charset=UTF-8',
                'x-key-app:': 'ax6542sdru3217t4eesd9',
                'x-version:': '2.1.0',
                'x-produttore-software': 'ARGO Software s.r.l. - Ragusa',
                'x-app-code': 'APF',
                'x-cod-min': 'SG26685',
                'x-user-id': process.env.ARGO_USER,
                'x-pwd:': process.env.ARGO_PASSWORD,
            }
        }

        axios.get(`${config.argoBasicURL}/login`, options)
            .then(res => {
                token = res.data.token;
            });

        console.log(token);;
    }
}
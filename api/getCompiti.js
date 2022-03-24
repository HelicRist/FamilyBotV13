const axios = require("axios")
const config = require("../config.json")

const getCompiti = async (giorno) => {
    const options = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'x-cod-min, x-user-id, x-pwd, x-key-app',
            'Content-Type': 'application/json; charset=UTF-8',
            'x-app-code': 'APF',
            'x-auth-token': `1ae46825-9663-4bd6-a734-6a82b19dc931.7`,
            'x-cod-min': 'SG26685',
            'x-key-app': 'ax6542sdru3217t4eesd9',
            'x-prg-alunno': 6224,
            'x-prg-scheda': 1,
            'x-prg-scuola': 1,
            'x-produttore-software': 'ARGO Software s.r.l. - Ragusa',
            'x-version': '2.1.0',
        }
    }

    let compiti = axios.get(`${config.argoBasicURL}/compiti`, options)
        .then(res => res);
    return compiti;
}

module.exports = getCompiti
const { Client } = require("ssh2");
require("dotenv").config();

function ConnectToServer() {

    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {

            //console.log('SSH Client :: ready');

            // conn.exec(`steamcmd`, (err, stream) => {
            //     if (err) throw err;
            //     stream.on('close', (code, signal) => {
            //         console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //         conn.end();
            //     }).on('data', (data) => {
            //         console.log('STDOUT: ' + data);
            //     }).stderr.on('data', (data) => {
            //         console.log('STDERR: ' + data);
            //     });
            // });

            resolve(conn); // Resolve with the connection instance
        }).on('error', (err) => {
            console.error('SSH Connection error:', err);
            reject(err);
        }).connect({
            host: process.env.SERVER_IP,
            port: process.env.SERVER_PORT,
            username: process.env.SERVER_USER,
            password: process.env.SERVER_PASSWORD
        });
    });

  //console.log(ServerConnection);
}

module.exports = ConnectToServer;

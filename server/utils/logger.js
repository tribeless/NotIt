const{createLogger,format,transports} = require('winston');
const DailyLog = require('winston-daily-rotate-file');
const {combine,timestamp,label,printf} = format;
const getTimeStamp = require('./getTimeStamp')
require('dotenv').config();
const configValues = process.env;

const timeZoned = new Date().toLocaleString('en-US',{
    timeZone:'Africa/Nairobi'
});

const logFormat = printf(({level,message,...metadata}) => {
     let logString = `${getTimeStamp()}|message=${message}|level=${level}`;

     if (metadata) {
         logString += JSON.stringify(metadata)
     }
     return logString;
})

const logFilePath = configValues.LOG_PATH;

const logger = createLogger({
    transports:[
        new DailyLog({
            filename:"logs/notit-%DATE%.log",
            datePattern:'YYYY-MM-DD-HH'
        })
    ],
    format:combine(
        label({label:'NotIt Node Server'}),
        timestamp({
            format:timeZoned
        }),
        logFormat
    )
});

module.exports = logger;
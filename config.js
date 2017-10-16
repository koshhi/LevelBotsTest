
module.exports = {
    port : process.env.PORT || 8080,
    db : process.env.MONGODB_URI || 'mongodb://heroku_rr4lv4n0:bka57saoo9pb9m2on95bnp48al@ds121965.mlab.com:21965/heroku_rr4lv4n0',
    SECRET_TOKEN: 'levelbotskeytoken'
};

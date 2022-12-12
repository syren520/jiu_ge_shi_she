const EVENT_PATH_PREFIX = `${__dirname}/../data`;

const getAnalyticsData = async (req, res) => {
    const fs = require("fs");
    const usersStartPath = `${EVENT_PATH_PREFIX}/user_starts_test.json`;
    const usersCompletePath = `${EVENT_PATH_PREFIX}/user_completes_test.json`;
    let usersStart;
    let usersComplete;

    if (fs.existsSync(usersStartPath)) {
        const file = await fs.promises.readFile(usersStartPath, {encoding: 'utf8'});
        usersStart = JSON.parse(file) ?? [];
    } else {
        usersStart = [];
    }

    if (fs.existsSync(usersCompletePath)) {
        const file = await fs.promises.readFile(usersCompletePath, {encoding: 'utf8'});
        usersComplete = JSON.parse(file) ?? [];
    } else {
        usersComplete = [];
    }

    const totalUsersStart = usersStart.length;
    const totalUsersCompletes = usersComplete.length;

    const results = {
        totalUsersStart,
        totalUsersCompletes,
        usersStart: usersStart.map(({timestamp, ...fields}) => ({
            ...fields,
            time: (new Date(timestamp)).toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
            }),
        })),
        usersComplete: usersComplete.map(({timestamp, ...fields}) => ({
            ...fields,
            time: (new Date(timestamp)).toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
            }),
        })),
    };

    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(results, null, 4));
}

module.exports = {getAnalyticsData};
const EVENT_PATH_PREFIX = `${__dirname}/../data`;

const trackEvent = async ({
                              event,
                              props,
                          }) => {
    const fs = require("fs");
    const dataPath = `${EVENT_PATH_PREFIX}/${event}.json`;
    let data;

    if (fs.existsSync(dataPath)) {
        const file = await fs.promises.readFile(dataPath, {encoding: 'utf8'});
        data = JSON.parse(file) ?? [];
    } else {
        data = [];
    }

    data.push(
        {
            ...props,
            timestamp: Date.now(),
        }
    );

    try {
        fs.promises.writeFile(dataPath, JSON.stringify(data), {encoding: 'utf8', flag: 'w+'});
    } catch (error) {
        console.log(error);
    }
};

module.exports = trackEvent;
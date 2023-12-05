const Watcher = require('@parcel/watcher');


const { exec } = require('child_process');

const IS_WIN = true;
const DIR_TO_WATCH = 'path\\to\\dir\\to\\watch';
const WATCHMAN_BIN_PATH = 'path\\to\\watchman\\bin';

const addWatchmanToProcessPath = () => {
    if (IS_WIN) {
        process.env.PATH += `;${WATCHMAN_BIN_PATH}`;

        exec('watchman --version', (error, stdout) => {
            if (error) {
                console.log('Watchman is inactive');
                return;
            }
            console.log('Watchman version:', stdout);
        });
    }
};

addWatchmanToProcessPath();

const run = async () => {
    await Watcher.subscribe(DIR_TO_WATCH, (err, events) => {
        if (err) {
            console.log('err: ', err);
        }

        events.forEach((event) => {
            console.log(event);
        });
    }, {
        backend: 'watchman',
    });
}

run().then(() => {

}).catch((err) => {
    console.log('err: ', err);
});
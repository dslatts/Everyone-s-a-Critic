const io = require('socket.io-client');
const socket = io(window.location.origin);
export default socket;

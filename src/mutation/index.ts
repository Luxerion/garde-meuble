import {DocumentNode} from 'graphql';

const createBox: DocumentNode = require('./box/createBox');
const deleteBox: DocumentNode = require('./box/deleteBox');
const moveBox: DocumentNode = require('./box/moveBox');
const assignBox: DocumentNode = require('./box/assignBox');
const createClient: DocumentNode = require('./client/createClient')

export {
    createBox,
    deleteBox,
    moveBox,
    assignBox,
    createClient,

};

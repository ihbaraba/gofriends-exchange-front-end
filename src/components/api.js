import axios from 'axios';
import {current_server} from "./../constants/APIURLS.js"

export default axios.create({
    baseURL: current_server
});

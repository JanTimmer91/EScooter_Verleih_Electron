import { useHistory } from "react-router-dom";

const { ipcRenderer } = window.require('electron');

const RoutingElectron = () =>{
 
    let history = useHistory();
 
    ipcRenderer.on('ROUTING_MESSAGE', (event, message) => {
        history.push(message);
    });

    return ("");
}
export default RoutingElectron;

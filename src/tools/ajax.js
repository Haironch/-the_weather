//para hacerlo mas ordenado no es componente es solo una herramienta

import axios from "axios";

export const ajax = async (options) => await axios.request(options).then(response => response.data);

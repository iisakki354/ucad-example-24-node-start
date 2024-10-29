import http from 'http';
import {getItems, postItem, deleteItem, updateItem} from './items.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const {url, method} = req;
  console.log('url:', url, 'method:', method);
  
  if (url === '/items' && method === 'GET') {
    getItems(res);
  } else if (url === '/items' && method === 'POST') {
    postItem(req, res);
  } else if (url.startsWith('/items/') && method === 'DELETE') {
    deleteItem(req, res);
  } else if (url.startsWith('/items/') && method === 'PUT') {
    updateItem(req, res);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'not found'}));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(items));
};

const postItem = (req, res) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      const item = JSON.parse(body);
      item.id = items.length + 1;
      items.push(item);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Item added', item}));
    });
};

// Delete item by id
const deleteItem = (req, res) => {
  const id = parseInt(req.url.split('/')[2], 10);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'Item not found'}));
  }
};

// Update item by id
const updateItem = (req, res) => {
  const id = parseInt(req.url.split('/')[2], 10);
  const index = items.findIndex(item => item.id === id);
  
  if (index !== -1) {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const updatedData = JSON.parse(body);
        items[index] = {...items[index], ...updatedData}; // Update item properties
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Item updated', item: items[index]}));
      });
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'Item not found'}));
  }
};

export {getItems, postItem, deleteItem, updateItem};

var express = require('express');
var router = express.Router();
var Map = require('../models/Map')

function findShortestPath(map, from, to) {

  const coordinates = map.coordinates.map(coord => {
    return { name: coord.name, x: coord.latitute, y: coord.langitutte, edges: coord.edge };
  });

  const distances = {};
  coordinates.forEach(coord => {
    distances[coord.name] = Infinity;
  });
  distances[from] = 0;

  const visited = new Set();
  const unvisited = new Set(coordinates.map(coord => coord.name));

 
  const previous = {};

  while (unvisited.size > 0) {
    let minDist = Infinity;
    let minNode;
    coordinates.forEach(coord => {
      if (unvisited.has(coord.name) && distances[coord.name] < minDist) {
        minDist = distances[coord.name];
        minNode = coord.name;
      }
    });

    const node = coordinates.find(coord => coord.name === minNode);
    if (!node) {
      continue;
    }

    const neighbors = node.edges;
    neighbors.forEach(neighbor => {
      const alt = distances[minNode] + neighbor.distance;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = minNode;
      }
    });

    visited.add(minNode);
    unvisited.delete(minNode);
  }

  const path = [];
  let node = to;
  while (node !== from) {
    path.push(node);
    node = previous[node];
  }
  path.push(from);
  path.reverse();

  const shortestDistance = distances[to];

  return { path, distance: shortestDistance };
}

  


router.get('/', async (req,res) => {
    try {
        const maps = await Map.find();
        res.json(maps);
    } catch  (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:_id/distance', async (req, res) => {
    const { from, to } = req.query;
    const map = await Map.findById(req.params._id);
  
    const shortestPath = findShortestPath(map, from, to);
    const distance = shortestPath ? shortestPath.distance : null;
  
    res.json({ distance });
  });
  

router.get('/:_id', async (req,res) => {
    const map = await Map.findById(req.params._id);
    res.json(map);
})

router.post('/', async (req, res) => {
    const { name, image, coordinates } = req.body;
    const map = new Map({ name, image, coordinates });

    try {
        const saveMap = await map.save();
        res.status(201).json(saveMap);
    }  catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('./:_id', async (req,res) => {
  const { name, image, coordinates } = req.body;

  try {
    const updatedMap = await Map.findByIdAndUpdate(req.params._id, { name, image, coordinates }, { new: true });
        if (!updatedMap) {
          return res.status(404).json({ message: 'Map not found' });
        }
        res.json(updatedMap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:_id', (req, res) =>{
  Map.findById((req.params._id), (err, data) => {
      if(err) throw err;
      if(!data) {
          return res.status(404).send("The user doesn't exist");
      }
      Map.findByIdAndDelete((req.params._id), (err, data) => {
          // if(err) throw err;
          res.send(data);
      })
  });
});

module.exports = router;
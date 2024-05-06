import map from "../model/map.js";

const getMap = (req, res) => {
    map.find({}, (error, maps) => {
        error ? 
            res.status(500).json(error) :
            res.status(200).json(maps);
        })
}

const createMap = (req, res) => {
    const newMap = map(req.body);
    newMap.save((error) => {
        error ? 
            res.status(400).json(error) :
            res.status(201).json(newMap);
    });
}

const updateMap = (req, res) => {
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      };
    const query = {hotelName: req.body.hotelName}

    map.findOneAndUpdate(query, req.body, options, (error, updatedMap) => {
        !updatedMap ? 
            res.status(404).json('map not found') :
            error ? 
                res.status(400).json(error) :
                res.status(200).json(updatedMap);
    });       
}

export { updateMap, createMap, getMap };
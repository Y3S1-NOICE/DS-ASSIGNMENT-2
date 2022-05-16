import map from "../model/map.js";

const getMap = (req, res) => {
    map.findOne((error, maps) => {
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
    const getUpdatedData = { new: true };
    console.log(req.body)

    map.updateOne({}, req.body, getUpdatedData, (error, updatedMap) => {
        !updatedMap ? 
            res.status(404).json('user not found') :
            error ? 
                res.status(400).json(error) :
                res.status(200).json(updatedMap);
    });       
}

export { updateMap, createMap, getMap };
'use strict';

let gameRooms = [[], [], [], [], [], [], [], [], [], [], []];

exports.findSeq = (req,res,next) => {
    let seq = req.params.seq;
    return res.status(200).json(gameRooms[seq]);
};

exports.deleteRoom = (req,res,next) => {
    let idx = req.body.gameNumber;
    gameRooms[idx] = gameRooms[idx].filter(function(ele){
        return ele.adminUser != req.body.adminUser
    });
    return res.status(200).json(gameRooms[idx]);
};

exports.execgame = (req, res, next) =>{
    // const ls = spawn('cmd', ['/c', 'dir', fileName]);
    console.log('execgame');
    return res.status(200);
}

exports.createRoom = (req, res, next) =>{
    let idx = req.body.gameNumber;
    gameRooms[idx].push({
        'seq' : idx,
        "adminUser": req.body.adminUser,
        "name": req.body.name,
        "cnt": req.body.cnt
    });
    return res.status(200).json(gameRooms[idx]);
}
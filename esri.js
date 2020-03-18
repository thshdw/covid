/*exports.payload = {
    type:"FeatureCollection",
    features:[points]
}
exports.points = {
    type:"Feature",
    geometry:{
        type:"Point",
        coordinates:[-116.51433,33.10683,9.01]
    },
    properties:{
        mag:0.85,
        place:"9km ENE of Julian, CA",
        time:1560962164830,
        title:"M 0.9 - 9km ENE of Julian, CA",
        depth:9.01
    }
}
*/
"use strict";

module.exports = class payload {
    type = 'FeatureCollection';
    features = [];

    constructor(data){
        this.features = [];
        console.log(data.length);
        data.forEach(rec => {
            let time = Date.parse(rec.Date);
            if(time){
                this.features.push(new feature(rec));
            }
            else{
                console.error(rec);
            }
        });
    }
}

class feature {
    type = "Feature";
    geometry;
    properties;
    constructor(rec){
        this.geometry = new geometry(rec.Lat, rec.Long);
        this.properties = new properties(rec);
    }
}

class geometry {
    type = "Point";
    coordinates = [];
    constructor(lat, long){
        this.coordinates.push(long, lat);
    }
}

class properties {
    ct;
    place;
    time;
    title;
    dateString;
    coords;
    constructor(rec){
        this.ct = parseInt(rec.Confirmed);
        this.place = rec.Label.trim();
        this.time = Date.parse(rec.Date);
        this.dateString = new Date(this.time).toLocaleDateString();
        this.title = this.place.trim();
        this.coords = rec.Location;
    }
}
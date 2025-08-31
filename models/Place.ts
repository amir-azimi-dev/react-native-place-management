import { Place as PlaceInterface } from "../types";

class Place implements PlaceInterface {
    public id: string;

    constructor(
        public title: string,
        public address: string,
        public imageURI: string,
        public location: { longitude: number, latitude: number }
    ) {
        this.id = String(Date.now() + "-" + Math.random() * 1000_000);
    };
};


export default Place;
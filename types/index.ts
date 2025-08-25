interface Place {
    id: string;
    title: string;
    imageURI: string;
    address: string;
    location: {
        longitude: number;
        latitude: number;
    };
};

export {
    Place
};
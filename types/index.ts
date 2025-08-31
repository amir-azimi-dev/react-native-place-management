interface Place {
    id: string;
    title: string;
    address: string;
    imageURI: string;
    location: {
        longitude: number;
        latitude: number;
    };
};

export {
    Place
};
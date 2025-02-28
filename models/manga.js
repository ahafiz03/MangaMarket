const {v4: uuidv4} = require('uuid');
const mangas = [
    {
        id: uuidv4(),
        title: 'Attack on Titan Vol. 5',
        seller: 'Anum',
        condition: 'Like New',
        price: '$7.99',
        details: 'Attack on Titan Volume 5 in like new condition (soft cover). Buy now!',
        image: './public/images/aotvol5.jpg',
        offers: 3,
        active: true
    },
    {
        id: uuidv4(),
        title: 'Death Note Vol. 4',
        seller: 'Gavin',
        condition: 'Good',
        price: '$12.99',
        details: 'Death Note Volume 4 in good condition (hard cover). Buy now!',
        image: './public/images/deathnotevol4.jpg',
        offers: 1,
        active: true
    },
    {
        id: uuidv4(),
        title: 'Fruits Basket Vol. 1',
        seller: 'Anum',
        condition: 'New',
        price: '$7.99',
        details: 'Fruits Basket Volume 1 in new condition (soft cover). Buy now!',
        image: './public/images/fruitsbasketvol1.jpg',
        offers: 7,
        active: true
    },
    {
        id: uuidv4(),
        title: 'Jojos Bizarre Adventure Vol. 10',
        seller: 'Gavin',
        condition: 'Acceptable',
        price: '$10.99',
        details: 'Jojos Bizarre Adventure Volume 10 in acceptable condition (hard cover). Buy now!',
        image: './public/images/jjbavol10.jpg',
        offers: 2,
        active: true
    },
    {
    id: uuidv4(),
        title: 'Naruto Vol. 17',
        seller: 'Anum',
        condition: 'Very Good',
        price: '$9.99',
        details: 'Naruto Volume 17 in very good condition (soft cover). Buy now!',
        image: './public/images/narutovol17.jpg',
        offers: 2,
        active: true
    },
    {
        id: uuidv4(),
        title: 'One Piece Vol. 1',
        seller: 'Gavin',
        condition: 'New',
        price: '$7.99',
        details: 'One Piece Volume 1 in new condition (soft cover). Buy now!',
        image: './public/images/onepiecevol1.jpg',
        offers: 1,
        active: true
    }
];

exports.find = () => mangas;

exports.findById = id => mangas.find(manga=>manga.id === id);

exports.save = function (manga) {
    manga.id = uuidv4();
    mangas.push(manga);
};

exports.updateById = function(id, newManga) {
    let manga = mangas.find(manga=>manga.id === id);
    if(manga) {
        manga.title = newManga.title;
        manga.details = newManga.details;
        manga.condition = newManga.condition;
        manga.price = newManga.price;
        manga.image = newManga.image;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = mangas.findIndex(manga =>manga.id === id);
    if (index !== -1) {
        mangas.splice(index, 1);
        return true;
    } else {
        return false;
    }
}
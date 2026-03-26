const AppDataSource = require("../data-source");

const Movie = require("../models/Movie");

const movies = [
  {
    title: "Thaai Kizhavi",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/thaai-kizhavi-et00488859-1771931113.jpg",
    description:
      "Greedy sons, initially awaiting their paralysed mother's death, frantically try to keep her alive after discovering she holds a valuable treasure.",
    runtime: 164,
    genre: "Comedy/Drama",
    rating: 9.3,
    cast: [
      {
        name: "Raadhika Sarathkumar",
        alias: "as Pavunuthayi",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/raadhika-sarathkumar-1051035-05-04-2018-01-04-41.jpg",
      },
      {
        name: "Aruldoss",
        alias: "as Vijayan",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/arul-dass-1062134-08-12-2016-06-47-05.jpg",
      },
      {
        name: "Bala Saravanan",
        alias: "as Selvam",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/bala-saravanan-1048097-1713950119.jpg",
      },
    ],
  },
  {
    title: "Vadam",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vadam-et00489396-1772186592.jpg",
    description:
      "Vadam explores the heros extraordinary bond with his bull and is based on Vada Manju Virattu. The film emotionally highlights family relationships.",
    runtime: 136,
    genre: "Action/Comedy/Drama",
    rating: 8.5,
    cast: [
      {
        name: "Vemal",
        alias: "",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/vemal-18164-1761048644.jpg",
      },
      {
        name: "Munishkanth",
        alias: "",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/munishkanth-1058078-1766738759.jpg",
      },
      {
        name: "Aadukalam Naren",
        alias: "",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/aadukalam-naren-37428-1746180004.jpg",
      },
    ],
  },
  {
    title: "Aazhi",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/aazhi-et00486118-1770638775.jpg",
    description:
      "Set in Nagercoil, a devoted father's world is shaken when he discovers his daughter's relationship with a young man. A solitary journey into the open sea becomes a moment of reckoning, where love, responsibility, and choice quietly reshape their lives.",
    runtime: 116,
    cast: [
      {
        name: "R. Sarathkumar",
        alias: "as Moorthy",
        profilePicture:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/r.-sarathkumar-33822-24-03-2017-16-03-13.jpg",
      },
    ],
  },
];

async function main() {
  // to Connect DB
  await AppDataSource.connect();
  // to clear existing movies
  await Movie.deleteMany({});
  // to Insert Seed movies
  await Movie.insertMany(movies);
  console.log('Movies Seeded Successfully');
  await AppDataSource.disconnect();
}

main();

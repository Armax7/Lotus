const artworks_mock = [
  {
    id: "ff7ddfbd-b80d-4850-b3ea-d6a67490a853",
    created_at: "2023-03-31T01:18:48.695912+00:00",
    name: "Monalisa",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_810632-MLA31216580338_062019-W.jpg",
    size: "70x90",
    rating: 5,
    price: 50000,
    available: true,
    stock: 1,
    technique_id: 1,
    category_id: 0,
    support_id: null,
    author_id: null,
  },
  {
    id: "42af946b-934c-4337-be11-f4a440d9517e",
    created_at: "2023-03-31T01:22:28.949575+00:00",
    name: "Universo Infinito",
    image:
      "https://scontent.fepa10-2.fna.fbcdn.net/v/t39.30808-6/338185454_652980616557748_7099824289551770991_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGQVi3Dhc1AqD_pV7IzNgd5pUn-hHNgUuilSf6Ec2BS6Psg6xq_w70GT7GIC9sJu04gGsX6cQDSChF2aVwDZ7g2&_nc_ohc=I67XxVt2n5UAX-3azPt&_nc_ht=scontent.fepa10-2.fna&oh=00_AfA1dvI8bAxcsRcsF7nIAFx0YLteSJXKzBd7FpvOvdzGRw&oe=642C0BC3",
    size: "70x50",
    rating: 5,
    price: 3000,
    available: true,
    stock: 1,
    technique_id: 4,
    category_id: 1,
    support_id: null,
    author_id: null,
  },
];

const techniques_mock = [
  {
    id: 0,
    created_at: "2023-03-28T18:00:02.373106+00:00",
    name: "Otro",
    description: null,
  },
  {
    id: 1,
    created_at: "2023-03-28T17:52:13.845057+00:00",
    name: "Óleo",
    description: null,
  },
  {
    id: 2,
    created_at: "2023-03-28T17:53:36.924946+00:00",
    name: "Acuarela",
    description: null,
  },
  {
    id: 3,
    created_at: "2023-03-28T17:54:13.380699+00:00",
    name: "Gouache",
    description: null,
  },
  {
    id: 4,
    created_at: "2023-03-28T17:56:44.652586+00:00",
    name: "Acrílica",
    description: null,
  },
  {
    id: 5,
    created_at: "2023-03-28T17:57:00.010641+00:00",
    name: "Pastel",
    description: null,
  },
  {
    id: 6,
    created_at: "2023-03-28T17:57:35.367124+00:00",
    name: "Tinta China",
    description: null,
  },
  {
    id: 7,
    created_at: "2023-03-28T17:57:47.357743+00:00",
    name: "Collage",
    description: null,
  },
  {
    id: 8,
    created_at: "2023-03-28T17:58:22.778701+00:00",
    name: "Aerografía",
    description: null,
  },
  {
    id: 9,
    created_at: "2023-03-28T18:02:07.203092+00:00",
    name: "Témpera",
    description: null,
  },
  {
    id: 10,
    created_at: "2023-03-28T18:02:57.771841+00:00",
    name: "Pouring",
    description: null,
  },
  {
    id: 11,
    created_at: "2023-03-28T18:04:33.966005+00:00",
    name: "Mixto",
    description: null,
  },
  {
    id: 12,
    created_at: "2023-03-29T00:50:04.379163+00:00",
    name: "Pintura Sintética y Latex",
    description: null,
  },
];

const categories_mock = [
  {
    id: 0,
    created_at: "2023-03-28T19:18:35.301862+00:00",
    name: "Otros",
    description: null,
  },
  {
    id: 1,
    created_at: "2023-03-28T19:18:52.389892+00:00",
    name: "Abstracto",
    description: null,
  },
  {
    id: 2,
    created_at: "2023-03-31T01:47:54.807806+00:00",
    name: "Realismo",
    description: null,
  },
];

export { artworks_mock, techniques_mock, categories_mock };

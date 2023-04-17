const artworks_mock = [
  {
    id: "f5bdc152-c51a-42ac-bc7e-a38a067bdd83",
    created_at: "2023-03-31T03:27:48+00:00",
    name: "Laberinto ",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Laberinto.jpg?t=2023-04-05T07%3A02%3A07.494Z",
    size: "70x50",
    rating: 2,
    price: 2000,
    available: true,
    stock: 0,
    technique_id: "62f33f27-c61c-4a5e-8cc3-76e029db0cf6",
    category_id: "a0371f53-9b92-45fd-96b0-fdd58305fd09",
    support_id: "b7895c4a-ac7b-4e69-a0dd-34cc5470ceda",
    author_id: "d696957e-e7ba-4651-9a2b-10dabdbd34c1",
    description: null,
    stripe_price_id: "price_1MvUUPCeGCoNoRtxJixBNCc0",
  },
  {
    id: "50ebc6a4-c85c-48bc-a196-5b96eb8842bd",
    created_at: "2023-03-31T03:30:05+00:00",
    name: "Somos Seres de un ala",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Somos%20Seres%20de%20un%20ala.jpg?t=2023-04-05T06%3A55%3A40.249Z",
    size: "50x70",
    rating: 4,
    price: 2500,
    available: true,
    stock: 0,
    technique_id: "49da9ef1-4012-4681-a4c7-336b5ef2882a",
    category_id: "b821af97-225e-42cb-a008-08ebc67a7b69",
    support_id: "b7895c4a-ac7b-4e69-a0dd-34cc5470ceda",
    author_id: "d696957e-e7ba-4651-9a2b-10dabdbd34c1",
    description:
      "Fue una de las 3 obras expuestas por el artista en la exposición impresionista en París en 2020, la obra se trabajo con un resaltado relieve.",
    stripe_price_id: "price_1MvU9gCeGCoNoRtxBo4bDUcR",
  },
  {
    id: "d5358403-1927-4fce-b319-96a63b50f3e4",
    created_at: "2023-03-31T03:54:59+00:00",
    name: "Abrazando a través del Sol",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Abrazando%20a%20traves%20del%20sol.jpg?t=2023-04-05T07%3A28%3A53.110Z",
    size: "18x14",
    rating: 4,
    price: 1500,
    available: true,
    stock: 6,
    technique_id: "62eda45f-6ea6-4641-b41f-31fd22c6c0fd",
    category_id: "05025a4b-74dc-4520-bdb4-dee0bb8ea357",
    support_id: "0ca35842-4205-4960-ad99-1462876125fc",
    author_id: "180a4956-8135-4eff-a547-b624d6a8e0f3",
    description:
      "La Obra tiene un formato horizonal,los contrastes entre el blanco y el negro más la fuerza del color rojo carmin, hacen muy llamativa su exposición en cualquier ambiente que lo requiera.",
    stripe_price_id: "price_1MvUOWCeGCoNoRtxdLDlhAV3",
  },
  {
    id: "d3b17adb-044e-4894-8590-69e3fb7fee4a",
    created_at: "2023-03-31T04:00:17+00:00",
    name: "Lava en las venas",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Lava%20en%20las%20venas.jpg?t=2023-04-05T07%3A31%3A31.224Z",
    size: "120x100",
    rating: 5,
    price: 3000,
    available: true,
    stock: 6,
    technique_id: "806d4a7b-813c-4b4a-8419-a5e856c4c7ac",
    category_id: "a0371f53-9b92-45fd-96b0-fdd58305fd09",
    support_id: "7cfd161f-9b7b-4761-9800-6066096bbae9",
    author_id: "2a671e1d-fc9b-4990-99e5-72530e42ac0b",
    description: null,
    stripe_price_id: "price_1MvUI6CeGCoNoRtx5zgqnpqP",
  },
  {
    id: "aef151a4-e853-4884-884f-b3bf2f995172",
    created_at: "2023-03-31T03:32:40+00:00",
    name: "Mis Moustros",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Mis%20Moustros.jpg?t=2023-04-05T07%3A23%3A49.561Z",
    size: "21x28",
    rating: 4,
    price: 1500,
    available: true,
    stock: 0,
    technique_id: "afc4beb6-de28-4ed1-b0bb-c12b83a2093a",
    category_id: "35c6beae-8bee-43d7-9902-649bdd67be3c",
    support_id: "0ca35842-4205-4960-ad99-1462876125fc",
    author_id: "180a4956-8135-4eff-a547-b624d6a8e0f3",
    description: null,
    stripe_price_id: "price_1MvUMOCeGCoNoRtx6X7bAUNh",
  },
  {
    id: "825617a5-2b2e-4583-b6e2-424463fd132d",
    created_at: "2023-03-31T04:19:16+00:00",
    name: "Tiempo de Brillar",
    image:
      "https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/imagebuck/img/Tiempo%20de%20Brillar.jpg",
    size: "35x50",
    rating: 4,
    price: 2000,
    available: true,
    stock: 3,
    technique_id: "928af501-156d-4e76-a165-1e855e79f142",
    category_id: "35c6beae-8bee-43d7-9902-649bdd67be3c",
    support_id: "0ca35842-4205-4960-ad99-1462876125fc",
    author_id: "e91a2cc7-5431-460f-a1e1-bafce24ccc7d",
    description:
      "Obra de vibrantes colores, donde la artista vuelca su conexión de juegos mandálicos, se adapta a cualquier ambiente.",
    stripe_price_id: "price_1MvUGdCeGCoNoRtxkYBAp2p2",
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

const supports_mock = [
  {
    id: "1",
    created_at: "2023-03-31T02:00:47.150745+00:00",
    name: "Lamina",
    description: null,
  },
  {
    id: "2",
    created_at: "2023-03-31T02:01:01.23857+00:00",
    name: "Tela",
    description: null,
  },
  {
    id: "3",
    created_at: "2023-03-31T02:01:16.899023+00:00",
    name: "Rigido",
    description: null,
  },
  {
    id: "4",
    created_at: "2023-03-31T02:01:39.081948+00:00",
    name: "Enmarcado con vidrio",
    description: null,
  },
];

export { artworks_mock, techniques_mock, categories_mock, supports_mock };

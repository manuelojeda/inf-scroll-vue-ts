interface Character {
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
  image: string;
  url: string;
  created: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  }
}

export default Character

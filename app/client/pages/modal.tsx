import { Box, Image } from '@chakra-ui/react';

const Index = () => {
  const url = `https://res.cloudinary.com/dnkb5aetl/image/upload/v1652176759/teapost/inobpaq8odctm5h38hk2_g4ywbl.jpg`;
  const url2 = `https://res.cloudinary.com/dnkb5aetl/image/upload/v1652355086/carrrrr_PPPjm.jpg`;
  // url.split('').forEach((v, i) => console.log({ v, i }));

  const src = url.split('/upload/').join(`/upload/w_100,h_100/`);
  // .map((src) => (src == 'upload' ? src + `/w_100,h_100` : src))
  // .join('/');

  return (
    <>
      <Box boxSize="sm" border="4px">
        <Image
          src="https://source.unsplash.com/random/1000x100"
          alt="Dan Abramov"
        />
      </Box>
    </>
  );
};

export default Index;

import { Container, Heading, Image, Text } from '@chakra-ui/react';

const Index = () => {
  return (
    <Container
      mx="auto"
      border="2px"
      maxW="container.sm"
      py="4"
      color="gray.600"
    >
      <Heading as="h1" size="lg">
        How the Far-Right Reinvented Its Meme Strategy Post-Insurrection
      </Heading>
      <Text fontSize="md" my="4">
        From “Let’s Go Brandon” to Kyle Rittenhouse theme songs, right-wing
        memes are mobilizing pro-Trump activists in the real world like never
        before
      </Text>
      <Image
        src="https://miro.medium.com/max/700/1*ZdKtCQrl0fTSGuiBguT_FQ.jpeg"
        alt="hello"
        mb="4"
      />
      <Para>
        January 6 felt like a punctuation mark. The entire event was a shock to
        the system of our consciousness, a spectacle made for many media. The
        capitol rioters were armed with livestream devices, many cosplaying in
        internet-formed-militia prepper-wear or donning cultish outfits or
        actualizing meme references.
      </Para>
      <Heading mt="8">Why is Most Learning Hard?</Heading>
      <Para>
        To help us look back, the Atlantic Council’s Jared Holt published “After
        the insurrection: How domestic extremists adapted and evolved after the
        January 6 US Capitol attack,” an eye-opening report about how the
        far-right has evolved since the insurrection. The report is filled with
        timelines of what the far-right has been up to after the insurrection
        and during the first year of the Biden presidency. In sum, immediately
        after the absence of Trump and post riot, supporters seemed to have
        disappeared from view on mainstream media and social media feeds due to
        paranoia and exposure, but over the course of the year, have reemerged
        in more extreme ways.
      </Para>
      <Para>
        Two days before the capitol riot, I posted a piece about the abundance
        of “copium” memes that the far-right had deployed to encourage Trump
        loyalists to take action on the 6th. These memes were, by design, both
        creative and dangerous. An expression of grief and loss and a call to
        action — one that played out on live television and all of our feeds.
      </Para>
      <Image
        src="https://miro.medium.com/max/700/1*VkxyX3o8A2PML-oBo5DygQ.jpeg"
        alt="donal"
        mb="4"
      />
      <Para>
        It’s no longer an era of copium and loss and grief for the far-right.
        According to the report, the group is now in a period of
        “rehabilitation, rebranding and revisionism.” The far-right have found
        new ways of offline activity, decentralizing and embracing local civic
        action like running for school boards. Online, the far-right has
        rebooted some of their alternative platforms, leaning into a stance
        against “culture wars” and outrage bait.
      </Para>
      <Para>
        For a few moments after the attack, it seemed as though we’d reached the
        end of something, not the beginning. A moment of clarity where we’d see
        how this all happened, recognize the danger, and find strategies to
        contain the movements moving further to fringes.
      </Para>
      <Para>
        But virtually overnight, that thought was upended — bad actors, some of
        which happen to be elected representatives of the United States, spread
        conspiracy theories and invented completely bogus motivations, hoping to
        rebrand and revise a terrible moment in American history.
      </Para>
    </Container>
  );
};
const Para = ({ children }: { children: String }) => (
  <Text fontSize="md" mb="4">
    {children}
  </Text>
);
export default Index;

type Link = {
  id: string;
  image?: string | null;
  title?: string;
  url?: string;
  color?: string;
};

type Node = {
  id: string;
  image?: string;
};

type ForcedNode = d3.SimulationNodeDatum & {
  id: string;
  img: string | null;
  size: number;
  url?: string;
  color?: string | null;
};
type ForcedLink = d3.SimulationLinkDatum<ForcedNode>;

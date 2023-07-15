type Link = {
  id: string;
  image?: string;
  title?: string;
  url?: string;
};

type Node = {
  id: string;
  image?: string;
};

type ForcedNode = d3.SimulationNodeDatum & { id: string; img: string | null; size: number; url?: string };
type ForcedLink = d3.SimulationLinkDatum<ForcedNode>;

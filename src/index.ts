type CardSuit = {
  color: string;
  shape: string;
};

type Card = CardSuit & {
  number: string;
};

const CardSuits: CardSuit[] = [
  {
    color: "red",
    shape: "♥"
  },
  {
    color: "black",
    shape: "♠"
  },
  {
    color: "green",
    shape: "♦"
  },
  {
    color: "blue",
    shape: "♣"
  }
];

const CardRanks: string[] = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");

const generateRandomCards = (count: number): Card[] => {
  const cards = new Set<Card>();
  while (cards.size < count) {
    const randomCardRank =
      CardRanks[Math.floor(Math.random() * CardRanks.length)];
    const randomCardSuit =
      CardSuits[Math.floor(Math.random() * CardSuits.length)];
    const card: Card = {
      color: randomCardSuit.color,
      shape: randomCardSuit.shape,
      number: randomCardRank
    };
    cards.add(card);
  }

  return Array.from(cards);
};

const createElement = (
  tag: string,
  attrs?: any,
  children?: (HTMLElement | string)[]
): HTMLElement => {
  const node = document.createElement(tag);

  if (attrs) {
    for (const attrName in attrs) {
      node.setAttribute(attrName, attrs[attrName]);
    }
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(child);
      }
    });
  }

  return node;
};

const div = (attrs: any, children: (HTMLElement | string)[]) =>
  createElement("div", attrs, children);

const generateCard = (card: Card): HTMLElement => {
  //
  let subNode = null;
  if (["A", "J", "Q", "K"].indexOf(card.number) != -1) {
    subNode = div({ class: "shapes single_shape" }, [card.shape]);
  } else {
    const cardNumbers = parseInt(card.number);
    const subElement = Array(cardNumbers)
      .fill(0)
      .map((_) => div({}, [card.shape]));
    subNode = div({ class: "shapes multiple_shapes" }, subElement);
  }

  return div({ class: "card " + card.color }, [
    div({ class: "rank top-left" }, [card.number]),
    subNode,
    div({ class: "rank bottom-right" }, [card.number])
  ]);
};

const App = (appRoot: HTMLElement | null) => {
  const cards = generateRandomCards(5);
  const cardElements = cards.map(generateCard);
  const app = div({ class: "cards" }, cardElements);
  if (appRoot) {
    appRoot.appendChild(app);
  }
};

App(document.getElementById("app"));

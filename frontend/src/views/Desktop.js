import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../utils/SectionProps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import CardWalker from "../components/elements/CardWalker"

const propTypes = {
  ...SectionTilesProps.types,
};

const walkersData = [
  {
    id: 1,
    name: "John",
    price: "$25/hour",
    picture:
      "https://www.mundoecologia.com.br/wp-content/uploads/2019/10/Dog-Walker-e1571683007586.jpg",
    description:
      "Energetic person, who loves animals, I try to connect to each of pet I walk with.",
  },
  {
    id: 2,
    name: "Anne",
    price: "$27/hour",
    picture:
      "https://veterinariadavinci.com.br/blog/wp-content/uploads/2017/10/dicas-para-escolher-um-dog-walker.jpg",
    description:
      "Energetic person, who loves animals, I try to connect to each of pet I walk with.",
  },
  {
    id: 3,
    name: "Laura",
    price: "$21/hour",
    picture:
      "https://www.giftideasunwrapped.com/wp-content/uploads/2020/02/Feature-91-1.jpg",
    description:
      "Energetic person, who loves animals, I try to connect to each of pet I walk with.",
  },
  
];

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const Walkers = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );



  const sectionHeader = {
    title: "Find the Perfect Pet Walker",
    paragraph:
      "Finding the perfect pet walker is essential for ensuring your furry friend receives the best care. With the right pet walker, you can have peace of mind knowing that your pet is in good hands and receiving the attention and exercise they need.",
  };
  const gridClasses = classNames(
    "walkers-grid",
    "tiles-wrap",
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "gap-4"
  );
  return (
    <section  className={outerClasses}>
    <div className="container">
      <div className={innerClasses}>
        <SectionHeader
          style={{ marginTop: "80px" }}
          data={sectionHeader}
          className="center-content"
        />
        <div className={gridClasses}>
          {walkersData.map((walker) => (
            <CardWalker
              key={walker.id}
              name={walker.name}
              price={walker.price}
              picture={walker.picture}
              description={walker.description}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

Walkers.propTypes = propTypes;
Walkers.defaultProps = defaultProps;

export default Walkers;

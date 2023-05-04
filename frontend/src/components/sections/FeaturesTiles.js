import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

import { FaDog, FaMapMarkerAlt, FaWalking } from "react-icons/fa";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeaturesTiles = ({
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

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionHeader = {
    title: "Why your pet will love to walk with us",
    paragraph: "Our unique benefits",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="mb-16">
                    <FaMapMarkerAlt
                      className="text-color-primary"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Watch live</h4>
                  <p className="m-0 text-sm">
                    As a pet owner, you can keep a close eye on your furry
                    friend during their walk, as we provide you with a live map
                    tracking their every move.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="mb-16">
                    <FaWalking
                      className="text-color-primary"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Reliable pet walker</h4>
                  <p className="m-0 text-sm">
                    We prioritize your pet's safety and well-being at DoggoWalk.
                    All our walkers go through a rigorous screening process
                    before they can join our team.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="400"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="mb-16">
                    <FaDog
                      className="text-color-primary"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Dog's success</h4>
                  <p className="m-0 text-sm">
                    We want your pet to have the best walking
                    experience. We take your pet to
                    a many spots, such as parks and nature
                    trails, to ensure they have an enjoyable and stimulating
                    walk. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;

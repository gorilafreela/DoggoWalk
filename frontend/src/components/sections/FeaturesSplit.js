import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "About Us",
    paragraph:
      "At DoggoWalk, we are more than just a pet walking service. We are a team of dedicated dog lovers who are passionate about promoting a healthy and fulfilling lifestyle for pets. We believe that regular exercise, outdoor activities, and socialization are essential for pet's physical and emotional well-being.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Security
                </div>
                <h3 className="mt-0 mb-12">Track your pet live</h3>
                <p className="m-0">
                  At DoggoWalk, we understand the importance of providing peace
                  of mind to pet owners when their furry friends are out for a
                  walk. That's why we offer a live tracking feature that allows
                  you to watch your pet's walk in real-time through a map on
                  your mobile device. You can see exactly where your pet is
                  walking.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img
                  src={require("./../../assets/images/livetracking.png")}
                  alt="Example"
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Unique experience
                </div>
                <h3 className="mt-0 mb-12">
                  What make our adventure memorable
                </h3>
                <p className="m-0">
                  At DoggoWalk, we believe that every walk with your pet should
                  be an adventure. That's why we don't just focus on exercise,
                  but also on creating opportunities for your pet to interact
                  with other animals and experience new things. Our walkers are
                  trained to seek out new and exciting routes, taking your pet
                  on a journey through different parks and neighborhoods.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/dogwalker.jpg")}
                  alt="Features split 02"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;

import classNames from "classnames";
import React from "react";
import SectionHeader from "../components/sections/partials/SectionHeader";
import { SectionSplitProps } from "../utils/SectionProps";

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
    title: "Thanks to join our team",
    paragraph:
      "We value your hard work and dedication in pet care. To improve the experience for both pet owners and walkers, we have implemented a new policy that requires sharing the location of every walk with the owners.",
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
                  Important
                </div>
                <h3 className="mt-0 mb-12">Always use mobile from now</h3>
                <p className="m-0">
                  To comply with this policy, you must use our mobile
                  application for all future walks. The app allows you to easily
                  share your location in real-time with the pet owner, ensuring
                  transparency and trust between both parties.
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
                  src={require("../assets/images/livetracking.png")}
                  alt="Example"
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
          <img
            src={"https://www.steamyconcepts.com/wp-content/uploads/Steamy-Concepts-Mobile-App-Store-Apple-iOS.png"}
            alt="Example"
            style={{
              maxWidth: "32%",
              height: "auto",
              marginRight:"16px"
            }} />

            <img

            src={"https://www.duelit.com/wp-content/uploads/2020/03/download-for-android.png"}
            alt="Example"
            style={{
              maxWidth: "32%",
              height: "auto",
              marginLeft:"16px"
              
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;

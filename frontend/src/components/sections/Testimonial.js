import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
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
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Customer testimonials",
    paragraph:
      "We strive to provide the best possible experience for every customer and their furry companion. We take pride in delivering exceptional service and building long-lasting relationships with our clients.  .",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    I've been using DoggoWalk for a few weeks now and my dog has
                    never been happier! The walkers are all so friendly and
                    attentive to my dog's needs. He comes back from his walks
                    tired and happy, and I can tell he's getting plenty of
                    exercise and fresh air. I highly recommend DoggoWalk to any
                    pet owner looking for a reliable and caring pet walking
                    service.
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">
                    @johnjones_photography
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    Before I started using DoggoWalk, my dog was always so
                    anxious and restless. But since he's been going on walks
                    with their team, he's become so much more calm and relaxed.
                    I think it's because he's getting the exercise and
                    stimulation he needs to be happy and healthy. I can't thank
                    DoggoWalk enough for the difference they've made in my dog's
                    life.
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">
                    @emilyLinger
                  </span>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-left"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    I was worried that my dog was becoming anti-social, but
                    after using DoggoWalk for a few weeks, I can see that he's
                    becoming more sociable and friendly with other dogs. The
                    walkers do a great job of introducing him to other dogs and
                    encouraging him to interact. It's been so great to see my
                    dog come out of his shell and start making new doggy
                    friends. Thank you, DoggoWalk!
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">
                    @sarahsmith
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;

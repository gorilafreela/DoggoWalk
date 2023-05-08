import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Image from "../elements/Image";
import { Link } from 'react-scroll';
const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  onSignUpButtonClick,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Your <span className="text-color-primary">DoggoWalk</span>{" "}
              Adventure
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Our platform not only allows you to book a dog walk at your
                convenience, but you can also track your dog's walk in
                real-time. You can see where your walker is going and what your
                furry friend is up to, giving you peace of mind and assurance
                that your dog is being well taken care of.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Link
                    style={{width: 250,borderRadius:32}}
                    className="button button-white button-wide-mobile button-sm"
                    to="login"
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Login
                  </Link>
                  
                </ButtonGroup>
                
              </div>
            </div>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <Image
              className="has-shadow"
              style={{ borderRadius: "10px" }}
              src={require("./../../assets/images/walk-dog-1.jpg")}
              alt="Hero"
              width={627}
              height={352}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;

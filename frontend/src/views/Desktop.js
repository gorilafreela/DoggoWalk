import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { SectionTilesProps } from "../utils/SectionProps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import CardWalker from "../components/elements/CardWalker";
import LocalStorageService from "../services/LocalStorageService";
import UserService from "../services/UserService";
import SolicitationService from "../services/SolicitationService";
const propTypes = {
  ...SectionTilesProps.types,
};

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
  const [walkers, setWalkers] = useState([]);
  const [solicitations, setSolicitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const initialWalkersRef = useRef([]);
  useEffect(() => {
    const session = LocalStorageService.getSessionData();
    if (!session.role) {
      return;
    }
    if (session.hasOwnProperty("completed")) {
      history.push("/mobile");
      return;
    }
    history.push("/complete-profile");
  });


  useEffect(() => {
    UserService.getAll()
      .then((res) => {
        setWalkers(res.data);

        SolicitationService.getAllProgress().then(
          (res) => {
            setSolicitations(res.data);
            setLoading(false);
          },
          (err) => {
            alert(err.response.data.message);
          }
        );
      })
      .catch((err) => {
      console.log(err)
      });
  }, []);

  useEffect(() => {
    if (solicitations.length > 0) {
      const initialWalkers = initialWalkersRef.current;
      const updatedWalkers = walkers.map((walker) => {
        const matchingSolicitation = solicitations.find(
          (solicitation) =>
            solicitation.to === walker._id
        );
          console.log(matchingSolicitation)
        if (matchingSolicitation) {
          return {
            ...walker,
            pending: 1,
            solicitationId: matchingSolicitation._id,
          };
        } else {
          return {
            ...walker,
            pending: 0,
            solicitationId: null,
          };
        }
      });
      if (JSON.stringify(initialWalkers) !== JSON.stringify(updatedWalkers)) {
        setWalkers(updatedWalkers);
        initialWalkersRef.current = updatedWalkers;
        setLoading(false)
      }
    }
  }, [solicitations, walkers]);

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
    <section className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader
            style={{ marginTop: "80px" }}
            data={sectionHeader}
            className="center-content"
          />
          {!loading && (
            <div className={gridClasses}>
              {walkers.map((walker) => (
                <CardWalker
                  key={walker._id}
                  name={walker.fullname}
                  price={"$ " + walker.price}
                  picture={walker.picture}
                  description={walker.description}
                  id={walker._id}
                  pending={walker.pending}
                  solicitationId={walker.solicitationId}
                 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Walkers.propTypes = propTypes;
Walkers.defaultProps = defaultProps;

export default Walkers;

import { FC, useEffect } from "react";
import { request, gql } from "graphql-request";

const warships = gql`
  {
    vehicles {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`;

export const WarshipsList: FC = () => {
  useEffect(() => {
    request("https://vortex.korabli.su/api/graphql/glossary/", warships);
  }, []);

  return <div />;
};

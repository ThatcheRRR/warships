// было бы хорошо для автоматической типизации использовать Apollo Client

export type Warship = {
  title?: string;
  description?: string;
  icons: {
    large: string;
    medium: string;
  };
  level: number;
  type: {
    name: string;
    title?: string;
    icons: {
      default: string;
    };
  };
  nation: {
    name: string;
    title?: string;
    color: string;
    icons: {
      small?: string;
      medium?: string;
      large: string;
    };
  };
};

export type WarshipsResponse = {
  vehicles: Warship[];
};

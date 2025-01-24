export type TSkills = {
  name?: string;
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
};

export type TTechnologies = {
  name?: string;
  title?: string;
  experience?: string;
  icon?: string;
};

export type TPortfolio = {
  id?: number;
  tags: {
    name?: string;
    title?: string;
    color?: string;
    icon?: string;
  };
  title?: string;
  description?: string;
  about?: string;
  url?: string;
  image?: string;
};

export type TApplicationBody = {
  id?: number;
  name?: string;
  email?: string;
  message?: string;
  createdAt?: string;
}

export type TInformation = {
  id?: number;
  name?: string;
  slogan?: string;
  image?: string;
  aboutMe?: string;
  aboutJob?: string;
  telegram?: string;
  behance?: string;
  instagram?: string;
}

export type TJob = {
  id?: number;
  post?: string;
  responsibilities?: string;
  startYear?: number;
  endYear?: number;
  place?: string;
}

export type TEducation = {
  id?: number;
  title?: string;
  description?: string;
  direction?: string;
  startYear?: number;
  endYear?: number;
  place?: string;
}

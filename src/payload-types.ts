/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Horario".
 */
export type Horario =
  | {
      open: string;
      close: string;
      days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
      id?: string | null;
    }[]
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Horario de Vacaciones".
 */
export type HorarioDeVacaciones =
  | {
      holydayRepeat?: boolean | null;
      holydayName: string;
      holydaySince: string;
      holydayUntill: string;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    pages: Page;
    media: Media;
    news: News;
    facilities: Facility;
    sports: Sport;
    cat: Cat;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    settings: Setting;
    header: Header;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  header: {
    style: 'inicio' | 'pagina';
    titleIndex?: string | null;
    pretitleIndex?: string | null;
    description?: string | null;
    newsFour?: (string | News)[] | null;
    displaydate?: boolean | null;
    title: string;
    pretitle: string;
  };
  body?: {
    layout?:
      | (
          | {
              tabs?:
                | {
                    tabTitle: string;
                    label: string;
                    tabSubtitle: string;
                    content: (
                      | Autobus
                      | {
                          events?:
                            | {
                                title: string;
                                location: string;
                                description: string;
                                start: string;
                                end: string;
                                img: string | Media;
                                id?: string | null;
                              }[]
                            | null;
                          id?: string | null;
                          blockName?: string | null;
                          blockType: 'calendarblock';
                        }
                      | {
                          newsFour?: (string | News)[] | null;
                          id?: string | null;
                          blockName?: string | null;
                          blockType: 'newsfeatured';
                        }
                    )[];
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'tabsblock';
            }
          | {
              title: string;
              style: 'left' | 'center';
              text: string;
              link?:
                | {
                    linkType: 'internal' | 'external' | 'mail' | 'location' | 'tel';
                    linkText?: string | null;
                    linkIcon?: string | null;
                    mail?: string | null;
                    location?: string | null;
                    tel?: string | null;
                    internal?: (string | null) | Page;
                    external?: string | null;
                    id?: string | null;
                  }[]
                | null;
              speed?: number | null;
              decoration?: boolean | null;
              image?: string | Media | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'calltoaction';
            }
          | {
              title: string;
              description: string;
              tarjeta?:
                | {
                    title: string;
                    description: string;
                    link: string | Page;
                    image: string | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'bentoblock';
            }
          | {
              isReversed?: boolean | null;
              title: string;
              body: string;
              icon?: string | null;
              list?:
                | {
                    isblold?: boolean | null;
                    text: string;
                    listImage?: string | Media | null;
                    id?: string | null;
                  }[]
                | null;
              linkText?: string | null;
              link?: (string | null) | Page;
              image: string | Media;
              id?: string | null;
              blockName?: string | null;
              blockType: 'textimagesblock';
            }
          | {
              title: string;
              description: string;
              filter?: boolean | null;
              cards?:
                | {
                    cardAtributes?: ('image' | 'links' | 'cat')[] | null;
                    title: string;
                    description: string;
                    cardImage?: string | Media | null;
                    categories?: (string | Cat)[] | null;
                    links?: {
                      link?:
                        | {
                            linkType: 'internal' | 'external' | 'mail' | 'location' | 'tel';
                            linkText?: string | null;
                            linkIcon?: string | null;
                            mail?: string | null;
                            location?: string | null;
                            tel?: string | null;
                            internal?: (string | null) | Page;
                            external?: string | null;
                            id?: string | null;
                          }[]
                        | null;
                    };
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'cardsblock';
            }
          | {
              title?: string | null;
              subtitle?: string | null;
              filter?: boolean | null;
              allNews?: (string | News)[] | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'newsblock';
            }
          | {
              title: string;
              subtitle: string;
              newspinged?: (string | News)[] | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'newspinged';
            }
          | {
              texs?: string | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'bookingsblock';
            }
        )[]
      | null;
  };
  publishedDate: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
  id: string;
  title: string;
  categories: (string | Cat)[];
  summary: string;
  image: string | Media;
  layout?:
    | {
        richtxtcontent?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richtext';
      }[]
    | null;
  attachments?:
    | {
        file: string | Media;
        id?: string | null;
      }[]
    | null;
  fixed?: boolean | null;
  publishedDate: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cat".
 */
export interface Cat {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Autobus".
 */
export interface Autobus {
  buses?:
    | {
        from: string;
        fromRoad: string;
        fromHour: string;
        to: string;
        toRoad: string;
        toHour: string;
        companyImg: string | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'buslist';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "facilities".
 */
export interface Facility {
  id: string;
  title: string;
  summary: string;
  images?:
    | {
        image?: string | Media | null;
        id?: string | null;
      }[]
    | null;
  bookingOptions?:
    | {
        periodType: 'fixed' | 'hours' | 'days' | 'months';
        name: string;
        periodLength?: number | null;
        price: number;
        daysAmount?: number | null;
        id?: string | null;
      }[]
    | null;
  regularSchedule?: {
    scheduleID?: string | null;
    holidayGroupID?: string | null;
    schedule?: Horario;
  };
  holidayschedule?: {
    schedule?: HorarioDeVacaciones;
  };
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sports".
 */
export interface Sport {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Setting {
  id: string;
  homePage: string | Page;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  navMenu?:
    | {
        item: {
          label: string;
          child?:
            | {
                linkType?: ('reference' | 'custom') | null;
                title: string;
                text: string;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                highlighted?: boolean | null;
                id?: string | null;
              }[]
            | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
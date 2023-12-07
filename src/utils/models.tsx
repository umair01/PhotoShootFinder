import dayjs from "dayjs";

// Home Page

export interface Fields {
  region: string;
  sessionType: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
}

export interface SessionFormProps {
  onSubmit: (data: Fields) => void;
  defaultValues?: Fields;
  regions: Region[];
  sessions: string[];
}

export interface FormProps extends Omit<SessionFormProps, "defaultValues"> {
  control: any;
  setValue: any;
  getValues: any;
  watch: any;
  reset: any;
}

export interface SessionDetails {
  Address: string | null;
  HowToBook: string | null;
  Location: string | null;
  LocationLatitude: string | null;
  LocationLongitude: string | null;
  PhotographersID: string | null;
  Region: string | null;
  SessionName: string | null;
  SessionRowID: number | null;
  photographer: Photographer;
  sessionImages: {ImageUrl: string}[]
  sessionDates: SessionDate[];
  sessionType: { SessionType: string | null };

}
interface SessionDate{
  SessionDate:string
}
export interface Photographer {
  CompanyNotes: string | null;
  Facebook: string | null;
  Instagram: string | null;
  PhotographerCompanyName: string | null;
  PhotographerEmail: string | null;
  PhotographerFirstName: string | null;
  PhotographerLastName: string | null;
  PhotographerPhone: string | null;
  PreferredContactMethod: string | null;
  Website: string | null;
}

export interface CardsProps {
  onClick?: (markerIndex: number | null) => void;
  region: string;
  results: number;
  photoGrapherSession: SessionDetails[];
}

export interface LabelValueProps {
  label: string;
  value: string | null | any;
  direction?: "row" | "column";
}

export interface IMarkerPosition {
  sessionName: string | null;
  companyName: string | null;
  sessionDate: string | null;
  sessionType: string | null;
  lat: number;
  lng: number;
}
interface Center {
  Longitude: number;
  Latitude: number;
}
export interface MapsProps {
  onClick?: (markerIndex: number | null) => void;
  markerIndex?: number | null;
  markerPositions: IMarkerPosition[];
  center: Center | undefined;
}

export interface IActiveMarker {
  sessionName: string | null;
  address: string | null;
  img: string;
}

export interface Region {
  Longitude: number;
  Latitude: number;
  Region?: string;
}

export interface IImageCarousel {
  images: {ImageUrl: string}[];
}

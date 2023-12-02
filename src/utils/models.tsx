import dayjs from "dayjs";

// Home Page

export interface Fields {
  region: string;
  //   subRegion: string;
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
  SessionName: string | null;
  SessionDate: string | null;
  SessionType: string | null;
  Address: string | null;
  LocationLongitude: string | null;
  LocationLatitude: string | null;
  Region: string | null;
}

export interface PhotographerSessionDetails extends SessionDetails {
  PhotographersID: number;
  PhotographerCompanyName?: string | null;
  Instragram?: string | null;
  Website?: string | null;
  Facebook?: string | null;
  PreferredContactMethod?: string | null;
  CompanyNotes?: string | null;
  PhotographerFirstName?: string | null;
  PhotographerLastName?: string | null;
  PhotographerPhone?: string | null;
  PhotographerEmail?: string | null;
  Location: string | null;
}

export interface CardsProps {
  onClick?: (markerIndex: number | null) => void;
  region: string;
  results: number;
  photoGrapherSession: PhotographerSessionDetails[];
}

export interface LabelValueProps {
  label: string;
  value: string | null;
  direction?: "row" | "column";
}

export interface IMarkerPosition {
  sessionName: string | null;
  address: string | null;
  img: string;
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

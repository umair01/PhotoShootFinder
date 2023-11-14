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
}

export interface FormProps extends Omit<SessionFormProps, "defaultValues"> {
  handleSubmit: any;
  control: any;
  setValue: any;
  getValues: any;
}

export interface SessionDetails {
  SessionName: string | null;
  SessionDate: string | null;
  SessionType: string | null;
  Address: string | null;
  LocationLongitude: number | null;
  LocationLatitude: number | null;
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
}

export interface CardsProps {
  region: string;
  results: number;
  photoGrapherSession: PhotographerSessionDetails[];
}

export interface LabelValueProps {
  label: string;
  value: string | null;
  direction?: "row" | "column";
}

interface IMarkerPosition {
  lat: number;
  lng: number;
}

export interface MapsProps {
  markerPositions: IMarkerPosition[];
}

declare interface ResumeProps extends UserProfile {
  documentId?: string;
  title: string;
  resumeId: string;
  userEmail: string;
  userName: string;
}

declare interface ResumeCartItemProps {
  resume: ResumeProps;
  refreshData: () => void;
}

declare interface ResumeFormProps {
  resumeInfo: UserProfile;
  onFormSubmit: (data: ResumeProps) => void;
}

declare interface PreviewProps {
  resumeInfo: UserProfile;
}

declare interface ResumeInfoContextType {
  resumeInfo: UserProfile | null;
  setResumeInfo: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

declare interface PersonalDetailProps {
  enabledNext: (v: boolean) => void;
}

export interface Experience {
  id?: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking?: boolean;
  workSummery: string;
  [key: string]: string;
}

export interface Education {
  id?: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
  [key: string | number]: string | number;
}

export interface Skill {
  id?: number;
  name: string;
  rating: number; // Rating could be a percentage (0-100)
  [key: string | number]: string | number;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  themeColor?: string | "#ff6666"; // Should be a hex code string like "#ff6666"
  summery?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
}

declare interface PutResumeInfo {
  data: UserProfile;
  id: string | string[];
}

declare interface GetResume {
  id: string;
}

declare interface ExperienceLevel {
  summary: string;
}

declare interface AiResponse {
  experience_levels: {
    Fresher: ExperienceLevel;
    "Mid-level": ExperienceLevel;
    Experienced: ExperienceLevel;
  };
}

declare interface FormFieldProps {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  workSummery: string;
  [key: string]: any;
}

declare interface RichTextEditorProps {
  onRichTextEditorChange: (value: ContentEditableEvent) => void;
  index: number;
  defaultValue: string;
}

declare interface EducationEntry {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
  [key: string]: string;
}

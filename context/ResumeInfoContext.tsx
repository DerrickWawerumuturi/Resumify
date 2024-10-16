import { createContext } from "react";
import { ResumeInfoContextType } from "..";

export const ResumeInfoContext = createContext<ResumeInfoContextType>({ resumeInfo: {}, setResumeInfo: () => { } })
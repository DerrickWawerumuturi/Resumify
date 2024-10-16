import { createContext } from "react";
import { ResumeInfoContextType } from "..";
import dummy from "@/data/dummy";

export const ResumeInfoContext = createContext<ResumeInfoContextType>({ resumeInfo: {}, setResumeInfo: () => { } })
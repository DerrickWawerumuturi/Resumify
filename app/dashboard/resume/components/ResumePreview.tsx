import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillPreview from './preview/SkillPreview'

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor || "#ff6666"
            }}
        >
            {/* personal detail */}
            <PersonalDetailPreview resumeInfo={resumeInfo!} />

            <SummaryPreview resumeInfo={resumeInfo!} />

            {/* professional experience */}
            <ProfessionalExperiencePreview resumeInfo={resumeInfo!} />

            {/* Educational */}
            <EducationPreview resumeInfo={resumeInfo!} />

            {/* skills */}
            <SkillPreview resumeInfo={resumeInfo!} />
        </div>
    )
}

export default ResumePreview
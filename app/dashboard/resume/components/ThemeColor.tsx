'use client'
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { UpdateResumeDetails } from "@/service/GlobalApi";
import { LayoutGrid } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";


const ThemeColor = () => {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    const { resumeId } = useParams()

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] = useState<string>("")
    const onColorSelect = async (color: string) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })

        const data = {
            themeColor: color
        }

        try {
            const result = await UpdateResumeDetails({ id: resumeId, data })
            console.log(result.data)
            toast("Theme Color updated")
        } catch (error) {
            console.log("Could not update theme color")
        }
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className='flex gap-2' size={"sm"}>
                    <LayoutGrid />
                    Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
                <div className="grid grid-cols-5 gap-3">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(color)}
                            className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${selectedColor == color && 'border'}`}
                            style={{ background: color }}>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

    )
}

export default ThemeColor;
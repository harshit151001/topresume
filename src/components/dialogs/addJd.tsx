import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AddJdProps {
  isOpen: boolean;
  resumes: any[]; // Replace any with the actual type of the resumes
}

export function AddJd({ isOpen, resumes }: AddJdProps) {
  const [position, setPosition] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((dots) => (dots.length < 3 ? dots + "." : "."));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();

  const handleCompareCandidates = async (e) => {
    const url = "http://localhost:8000" + "/candidates/";
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position,
          job_description: jobDescription,
          resumes: resumes,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();

      navigate("/shortlisted-candidates", { state: { data } });
    } catch (error) {
      alert("An error occurred: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-indigo-500">
            Add Job Description
          </DialogTitle>
          <DialogDescription>
            Add position and job description you want to shortlist candidates
            according
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Position
            </Label>
            <Input
              id="position"
              value={position}
              placeholder="Software Developer"
              onChange={(e) => setPosition(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Job Description
            </Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="col-span-3"
              rows={6}
              placeholder="We're seeking a motivated entry-level Software Developer to design, develop, and test web/mobile applications using [Core technologies, e.g., Python, React]. If you're a recent graduate with a passion for coding, we want you!"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-indigo-500 text-gray-100 hover:bg-indigo-700 hover:text-white"
            disabled={isLoading}
            type="submit"
            onClick={handleCompareCandidates}>
            {isLoading ? (
              <span>
                Comparing candidates
                <span
                  style={{
                    width: "1ch",
                    display: "inline-block",
                    textAlign: "left",
                  }}>
                  {dots}
                </span>
              </span>
            ) : (
              "Compare candidate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigate, useLocation } from "react-router-dom";
import logo from "@/assets/img/logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShortlistedCandidates = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { suitable_candidates } = location.state.data;

  if (!suitable_candidates) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="bg-white border-b-2 shadow-sm border-gray-200 px-[10%] flex justify-between items-center py-3">
        <div>
          <img className="w-1/2" src={logo} alt="logo" />
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="px-[10%] mt-10">
        <h1 className="text-2xl text-indigo-500 mb-2">Suitable Candidates</h1>
        <div className="grid grid-cols-12 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
          <div className="col-span-1 grid place-items-center"></div>
          <div className="col-span-3 flex items-center">Name</div>
          <div className="col-span-1 grid place-items-center">Score</div>
          <div className="col-span-3 grid place-items-center">Degree</div>
          <div className="col-span-2 grid place-items-center">Resume</div>
          <div className="col-span-2 grid place-items-center">Details</div>
        </div>

        {suitable_candidates.map((candidate) => (
          <div
            className="grid grid-cols-12 py-2 border-b-2 border-gray-200 text-gray-500"
            key={candidate.name}>
            <div className="col-span-1 grid place-items-center">
              <Avatar>
                <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="col-span-3 flex items-center">
              {candidate?.name || ""}
            </div>
            <div className="col-span-1 grid place-items-center">
              {candidate?.match_score || ""}
            </div>
            <div className="col-span-3 grid place-items-center">
              {candidate?.college?.degree || ""}
            </div>
            <div className="col-span-2 grid place-items-center">
              <a
                className="text-indigo-500 underline underline-offset-1 cursor-pointer"
                href={candidate.resume.link}>
                View File
              </a>
            </div>
            <div className="col-span-2 grid place-items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-indigo-500 text-gray-100 hover:bg-indigo-700 hover:text-white"
                    variant="default">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle className="text-indigo-500">
                      Candidate Details
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="experiences">Experiences</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    <TabsContent
                      className="max-h-[500px] overflow-y-scroll"
                      value="personal">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="name" className="text-left">
                            Name
                          </label>
                          <div className="col-span-3">{candidate.name}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="username" className="text-left">
                            Email
                          </label>
                          <div className="col-span-3">{candidate.email}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="username" className="text-left">
                            Degree
                          </label>
                          <div className="col-span-3">
                            {candidate.college.degree}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="username" className="text-left">
                            College
                          </label>
                          <div className="col-span-3">
                            {candidate.college.name}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="username" className="text-left">
                            Match Score
                          </label>
                          <div className="col-span-3">
                            {candidate.match_score}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      className="max-h-[500px] overflow-y-scroll"
                      value="experiences">
                      {candidate.professional_experience.map((experience) => (
                        <div className="grid gap-4 py-4 border-b-2 border-gray-200 last:border-b-0">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-left">
                              Company
                            </label>
                            <div className="col-span-3">
                              {experience.organization}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="role" className="text-left">
                              Role
                            </label>
                            <div className="col-span-3">{experience.role}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="" className="text-left">
                              Short Description
                            </label>
                            <div className="col-span-3">
                              {experience.short_description}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="" className="text-left">
                              Tech Stack
                            </label>
                            <div className="col-span-3">
                              {experience.tech_stack.map((tech) => (
                                <span key={tech} className="mr-2">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              Start Date
                            </label>
                            <div className="col-span-3">
                              {experience.time_duration.start}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              End Date
                            </label>
                            <div className="col-span-3">
                              {experience.time_duration.end}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              Relevancy
                            </label>
                            <div className="col-span-3">
                              {experience.relevancy}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent
                      className="max-h-[500px] overflow-y-scroll"
                      value="projects">
                      {candidate.projects.map((project) => (
                        <div className="grid gap-4 py-4 border-b-2 border-gray-200 last:border-b-0">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-left">
                              Project Name
                            </label>
                            <div className="col-span-3">
                              {project.project_title}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="" className="text-left">
                              Short Description
                            </label>
                            <div className="col-span-3">
                              {project.short_description}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="" className="text-left">
                              Tech Stack
                            </label>
                            <div className="col-span-3">
                              {project.tech_stack.map((tech) => (
                                <span key={tech} className="mr-2">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              Start Date
                            </label>
                            <div className="col-span-3">
                              {project.time_duration.start}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              End Date
                            </label>
                            <div className="col-span-3">
                              {project.time_duration.end}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-left">
                              Relevancy
                            </label>
                            <div className="col-span-3">
                              {project.relevancy}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortlistedCandidates;

function getInitials(name: string) {
  const parts = name.split(" ");
  let initials = "";
  if (parts.length > 0) {
    initials += parts[0][0];
  }
  if (parts.length > 1) {
    initials += parts[1][0];
  }
  return initials.toUpperCase();
}

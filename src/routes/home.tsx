import { useState, ChangeEvent, DragEvent, Fragment } from "react";
import logo from "@/assets/img/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { AddJd } from "@/components/dialogs/addJd";

type FileStatus = "uploading" | "success" | "failed";

interface FileWithStatus extends File {
  status?: FileStatus;
}

const uploadFile = async (file: FileWithStatus) => {
  const url = "http://localhost:8000" + "/files/";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return {
      status: "success",
      response: await response.json(),
    };
  } catch (e) {
    return {
      status: "failed",
      error: "error",
    };
  }
};

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithStatus[]>([]);

  const [resumes, setResumes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).filter(
      (file) => file.type === "application/pdf"
    );

    setSelectedFiles(files);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    setSelectedFiles(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    const copyOfFiles = [];
    const resumes = [];

    for (const file of selectedFiles) {
      const { status, response } = await uploadFile(file);

      copyOfFiles.push({
        name: file.name,
        status: status as FileStatus,
      });
      resumes.push({
        text: response.text,
        link: response.file,
      });
    }

    setSelectedFiles(copyOfFiles);
    setResumes(resumes);
    setIsOpen(true);
  };

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
      <div
        className="max-w-3xl mx-auto mt-20 border-2 border-indigo-500 ring-2 ring-offset-2 ring-gray-200 rounded-lg text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <label
          htmlFor="file-input"
          className="w-full block h-full py-10 px-20 bg-transparent cursor-pointer border-none">
          <span className="text-indigo-500 font-semibold">Click to add</span> or
          Drag and drop your files here
        </label>
        <input
          id="file-input"
          className="hidden"
          type="file"
          multiple
          onChange={handleFileSelect}
        />
      </div>

      {selectedFiles.length > 0 && (
        <Card className="max-w-3xl mx-auto p-4 mt-5">
          <ul>
            {selectedFiles.map((file, index) => (
              <Fragment key={index}>
                <li className="mb-2 last:mb-0">
                  <div className="flex justify-between">
                    <div className="flex items-center flex-1">
                      <Avatar>
                        <AvatarFallback>
                          <File className="text-gray-500" size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">{file.name}</div>
                    </div>
                    <div className="grid place-content-center">
                      <Checkbox checked={file?.status === "success"} />
                    </div>
                  </div>
                </li>
                <Separator className="mb-2 last:hidden" />
              </Fragment>
            ))}
          </ul>
        </Card>
      )}
      <div className="max-w-3xl flex items-center justify-center mt-5 gap-5 mx-auto">
        <Button
          onClick={() => setSelectedFiles([])}
          variant="outline"
          className="border-indigo-500 text-indigo-500 hover:bg-indigo-200 hover:border-indigo-700 hover:text-indigo-500">
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={handleUpload}
          className="bg-indigo-500 text-gray-100 hover:bg-indigo-700 hover:text-white">
          Upload
        </Button>
      </div>
      <AddJd isOpen={isOpen} resumes={resumes} />
    </div>
  );
};

export default Home;

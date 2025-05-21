import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CameraIcon, FileIcon, X, RefreshCw } from "lucide-react";

interface DocumentUploadProps {
  onFileSelect: (file: File | null | any) => void;
  progress?: any;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFileSelect, progress }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const supportedFormats = ["application/pdf", "image/png", "image/jpeg"];
  const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setIsCameraOpen(true);
        setStream(mediaStream);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Start countdown timer for photo capture
  const startCountdown = () => {
    setCountdown(5);
  };

  // Effect for countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      capturePhoto();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg");

        // Convert data URL to File
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "camera-capture.jpeg", {
              type: "image/jpeg",
            });
            handleFile(file);
            // Don't stop camera to allow retakes
            setCountdown(null);
          });
      }
    }
  };

  // Retake photo
  const retakePhoto = () => {
    removeFile();
    setIsCameraOpen(true);
  };

  // Stop the camera
  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOpen(false);
    setCountdown(null);
  };

  // Handle file selection from device
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Validate and process the file
  const handleFile = (file: File) => {
    if (!supportedFormats.includes(file.type)) {
      alert("Unsupported file format. Please upload a PDF, PNG, or JPEG file.");
      return;
    }
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds 25 MB. Please upload a smaller file.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      stopCamera();
    }
    setIsDialogOpen(open);
  };

  return (
    <div className="w-full">
      <p className="mb-2">Upload your Document</p>
      {!selectedFile ? (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <div className="border-2 bg-white border-dashed border-blue-400 rounded-lg p-8 py-24 text-center cursor-pointer hover:bg-blue-50">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <img src="/img/upload-icon.svg" alt="" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Use camera or{" "}
                <span className="text-green-500 underline">Choose file</span>
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <h2 className="text-lg font-semibold">Select an option</h2>
            <div className="flex justify-between gap-4">
              {/* Use Camera Option */}
              <div className="flex-1 group">
                {isCameraOpen ? (
                  <div className="relative">
                    <video ref={videoRef} className="w-full rounded-lg" />

                    {/* Countdown display */}
                    {countdown !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <span className="text-6xl font-bold text-white">{countdown}</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {countdown === null && (
                        <button
                          onClick={startCountdown}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                          Take Photo
                        </button>
                      )}
                      <button
                        onClick={stopCamera}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={startCamera}
                    className="w-full border-2 group-hover:transition group-hover:duration-300 group-hover:border-2 group-hover:border-primary-500 bg-primary-100 rounded-xl p-6 text-center"
                  >
                    <img
                      src="/img/camera.svg"
                      alt=""
                      className="w-14 h-14 mx-auto mb-2 
                      text-blue-500 
                      group-hover:translate-y-0.5
                      group-hover:w-16 group-hover:h-16
                      group-hover:transition group-hover:duration-300"
                    />
                    <p
                      className="text-xl font-medium text-primary-500
                      group-hover:translate-y-0.5
                      group-hover:transition group-hover:duration-300"
                    >
                      Use Camera
                    </p>
                  </button>
                )}
              </div>

              {/* From Device Option */}
              <div className="flex-1 group">
                <label className="w-full border-2 group-hover:transition group-hover:duration-300 group-hover:border-2 group-hover:border-primary-500 bg-primary-100 rounded-xl p-6 text-center cursor-pointer block">
                  <img
                    src="/img/document.svg"
                    alt=""
                    className="w-14 h-14 mx-auto mb-2 
                    text-blue-500 
                    group-hover:translate-y-0.5
                    group-hover:w-16 group-hover:h-16
                    group-hover:transition group-hover:duration-300"
                  />
                  <p
                    className="text-xl font-medium text-primary-500
                    group-hover:translate-y-0.5
                    group-hover:transition group-hover:duration-300"
                  >
                    From Device
                  </p>
                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    className="hidden"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
          <div className="flex items-center gap-2">
            <div className="border-2 p-4 rounded-xl">
              {selectedFile?.type === "application/pdf" ? (
                <img src="/img/pdf.svg" alt="" />
              ) : previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-12 h-12 object-cover" />
              ) : (
                <FileIcon className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {selectedFile.name === "camera-capture.jpeg" && (
              <button
                onClick={retakePhoto}
                className="flex items-center gap-1 text-blue-500"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake</span>
              </button>
            )}
            <button onClick={removeFile} className="text-red-500">
              <img src="/img/cancel.svg" alt="" />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <p>Supported formats: PDF, PNG or JPEG</p>
        <p>Maximum size: 25 MB</p>
      </div>

      {selectedFile && progress < 100 && (
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
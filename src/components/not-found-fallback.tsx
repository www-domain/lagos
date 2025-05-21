import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {};

const NotFoundFallback = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <section
        id="error-fallback"
        className="fixed inset-0 flex flex-row justify-center items-center text-slate-500"
      >
        <div className="w-[90%] md:w-[40%] flex flex-col items-center">
          <div className="w-full font-mono text-sm space-y-2">
            <ul className="px-5">
              <li className="list-disc">PAGE NOT FOUND</li>
            </ul>

            <div className="flex justify-end gap-3">
              <Button
                className="text-xs"
                variant="secondary"
                size="sm"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeft />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundFallback;

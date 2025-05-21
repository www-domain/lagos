import { lagosLogo } from "@/helpers/constants/image.constant";
import { Spinner } from "./ui/spinner";

function RouterSpinner() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="flex justify-center">
            <img src={lagosLogo} alt="NPC Logo" className="w-16" />
          </div>
          <div className="text-center text-slate-500">
            {/* <p className='text-sm mb-3 font-semibold'>Application Name</p> */}
            <div className="flex justify-center">
              <Spinner size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RouterSpinner;

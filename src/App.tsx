import RouterSpinner from "./components/route-spinner";
import AppRoutes from "./router";
import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toast";
import { useIdleTimer } from "react-idle-timer";
import { ROUTES } from "./helpers/constants/routes.constant";
import { useAuth } from "./helpers/hooks/useAuth.hook";
import { useDispatch } from "react-redux";
import { resetInstructorForm, resetPaymentReferenceForm, resetSupportingDocumentsForm, resetValidateFacilityForm } from "./redux-store/slices/setup.slice";

const Root: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return <AppRoutes isAuthenticated={isAuthenticated} />;
};

function App() {
  const initiate_logout = async () => {
    sessionStorage.clear();
    location.replace(ROUTES.LOGIN);
  };

  // Idle timer configuration
  useIdleTimer({
    timeout: 1000 * 60 * 15, // 15 minutes in milliseconds
    onIdle: initiate_logout,
    debounce: 500,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      dispatch(resetValidateFacilityForm());
      dispatch(resetInstructorForm());
      dispatch(resetSupportingDocumentsForm());
      dispatch(resetPaymentReferenceForm());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return (
    <>
      <Toaster richColors expand toastOptions={{}} />
      <Suspense fallback={<RouterSpinner />}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;

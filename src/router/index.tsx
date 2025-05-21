import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/helpers/constants/routes.constant";
import NotFoundFallback from "@/components/not-found-fallback";
import PrivateRoute from "@/components/private-route";
import Login from "@/pages/auth/login";
import { StudentProfile } from "@/components/student-profile";
import Students from "@/pages/students";
import StudentValidation from "@/pages/students/student-validation";
import StudentInformation from "@/pages/students/student-information";
import Permits from "@/pages/permits";
import { PermitProfile } from "@/components/permit-profile";
import SearchStudent from "@/pages/permits/search-student";
import IssuePermit from "@/pages/permits/issue-permit";
import PermitConfirmation from "@/pages/permits/permit-confirmation";
import Inspection from "@/pages/inspection";
import Profile from "@/pages/profile";
import ChangePassword from "@/pages/profile/change-password";
import Applications from "@/pages/applications";
import { ApplicationProfile } from "@/components/application-profile";
import ForgotPassword from "@/pages/auth/forgot-password";
import NewPassword from "@/pages/auth/new-password";
import CompleteRegistration from "@/components/submit-application/continue-registration";
import UpdateRegistration from "@/components/submit-application/update-application";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />
    <Route path={ROUTES.STUDENTS} element={<Students />} />
    <Route
      path={`${ROUTES.STUDENTS}/:studentID`}
      element={<StudentProfile />}
    />
    <Route
      path={`${ROUTES.STUDENTS}/complete-registration`}
      element={<CompleteRegistration />}
    />
    <Route
      path={`${ROUTES.STUDENTS}/update-registration`}
      element={<UpdateRegistration />}
    />
    <Route
      path={`${ROUTES.STUDENTS}${ROUTES.STUDENT_VALIDATION}`}
      element={<StudentValidation />}
    />
    <Route
      path={`${ROUTES.STUDENTS}${ROUTES.STUDENT_INFORMATION}`}
      element={<StudentInformation />}
    />
    <Route path={ROUTES.PERMITS} element={<Permits />} />
    <Route
      path={`${ROUTES.PERMITS}${ROUTES.SEARCH_STUDENT}`}
      element={<SearchStudent />}
    />
    <Route path={ROUTES.APPLICATIONS} element={<Applications />} />
    <Route
      path={`${ROUTES.APPLICATIONS}/:applicationID`}
      element={<ApplicationProfile />}
    />
    <Route
      path={`${ROUTES.PERMITS}${ROUTES.ISSUE_PERMIT}`}
      element={<IssuePermit />}
    />
    <Route path={`${ROUTES.PERMITS}/:studentID`} element={<PermitProfile />} />
    <Route
      path={`${ROUTES.PERMITS}${ROUTES.ISSUED_PERMIT_CONFIRMATION}/:permitID`}
      element={<PermitConfirmation />}
    />
    <Route path={ROUTES.INSPECTION} element={<Inspection />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} />
    <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
    <Route path="*" element={<NotFoundFallback />} />
  </Routes>
);

export default AppRoutes;

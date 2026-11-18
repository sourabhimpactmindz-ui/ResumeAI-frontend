import Classic from "../components/classic";
import ExecutiveTemplate from "../components/Executive";
import ModernTemplate from "../components/modren";
import ProfessionalTemplate from "../components/Professional";
import StudentTemplate from "../components/student";

export const templates = [
  { id: "classic", name: "Classic", component: Classic, preview: "/previews/classic.png" },
  { id: "professional", name: "professional", component: ProfessionalTemplate },
  { id: "modern",  name: "Modern",  component: ModernTemplate, preview: "/previews/modern.png", supportsPhoto: true },
  {  id: "student", name: "Student", component: StudentTemplate , supportsPhoto: true },
  {  id: "executive", name: "Executive", component: ExecutiveTemplate , supportsPhoto: true }
];
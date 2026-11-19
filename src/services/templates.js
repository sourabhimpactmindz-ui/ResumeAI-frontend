import AzureTemplate from "../components/Azure";
import Classic from "../components/classic";
import CorporateTemplate from "../components/Corporate";
import CreativeTemplate from "../components/Creative";
// import ElegantTemplate from "../components/Elegant";
import ExecutiveTemplate from "../components/Executive";
import ModernTemplate from "../components/modren";
import ProfessionalTemplate from "../components/Professional";
import StudentTemplate from "../components/student";
import WarmTemplate from "../components/Warm";

export const templates = [
  { id: "classic", name: "Classic", component: Classic, preview: "/previews/classic.png" },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  { id: "corporate", name: "Corporate", component: CorporateTemplate },
  { id: "modern",  name: "Modern",  component: ModernTemplate, preview: "/previews/modern.png", supportsPhoto: true },
  {  id: "student", name: "Student", component: StudentTemplate , supportsPhoto: true },
  {  id: "executive", name: "Executive", component: ExecutiveTemplate , supportsPhoto: true },
  // {  id: "elegant", name: "Elegant", component: ElegantTemplate , supportsPhoto: true },
  {  id: "creative", name: "Creative", component: CreativeTemplate},
  {  id: "warm", name: "Warm", component: WarmTemplate , supportsPhoto: true },
  {  id: "azure", name: "Azure", component: AzureTemplate , supportsPhoto: true }
];
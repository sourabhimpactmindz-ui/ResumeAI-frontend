import Classic from "../components/classic";
import ModernTemplate from "../components/modren";
import StudentTemplate from "../components/student";

export const templates = [
  { id: "classic", name: "Classic", component: Classic, preview: "/previews/classic.png" },
  { id: "modern",  name: "Modern",  component: ModernTemplate, preview: "/previews/modern.png", supportsPhoto: true },
  {  id: "student", name: "Student", component: StudentTemplate , supportsPhoto: true }
];
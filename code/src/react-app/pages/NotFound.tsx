import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import Seo from "@/react-app/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Seo title="Page not found" />
      <div className="text-center">
        <p className="text-sm font-medium text-primary mb-2">404</p>
        <h1 className="text-3xl font-semibold mb-3" style={{ fontFamily: '"Source Serif 4", serif' }}>
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

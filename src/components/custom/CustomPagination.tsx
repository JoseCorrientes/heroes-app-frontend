import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";

  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (page: number) => {
    console.log(page);

    if (page < 1 || page > totalPages) return;
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => handlePageChange(Number(page) - 1)}
        disabled={Number(page) < 2}
        variant="outline"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          onClick={() => handlePageChange(index + 1)}
          key={index}
          variant={index + 1 === Number(page) ? "default" : "outline"}
          size="sm"
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={Number(page) === totalPages}
        onClick={() => handlePageChange(Number(page) + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

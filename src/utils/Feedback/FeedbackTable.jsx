import { useFetchResponses } from "@/api/ResponseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "../Spinner/Spinner";

function FeedbackTable() {
  const { data: responses, isLoading } = useFetchResponses();

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // FILTER FEEDBACK
  const feedbacks =
    responses
      ?.filter((response) => response.formType === "feedback")
      .sort(
        (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
      ) || [];

  // DATE FORMAT
  const formatDateWithOrdinal = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // DAY SUFFIX
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };

  return (
    <section className="overflow-x-auto px-5 sm:ml-0 lg:ml-56">
      <div className="overflow-x-auto rounded-lg">
        <div className="shadow border-b border-gray-200 overflow-x-auto sm:overflow-x-visible">
          <Table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => {
                const feedbackMessages = feedback.data
                  .filter((d) => d.type === "textarea")
                  .map((d) => d.value)
                  .join(", ");
                const feedbackText = feedbackMessages || "No feedback provided";

                return (
                  <TableRow key={feedback.id}>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feedback.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                      {feedbackText}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                      {formatDateWithOrdinal(feedback.submissionDate)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                      {feedback.status}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

export default FeedbackTable;

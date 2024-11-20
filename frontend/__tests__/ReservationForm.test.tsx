import { render, screen, waitFor } from "@testing-library/react";
import ReservationForm from "@/components/create_edit_reservation/ReservationForm";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      back: () => null,
    };
  },
}));

const json = {
  "co-working-space-label": "Co-Working Space",
  "no-of-rooms-label": "No. of Rooms",
  "reserved-date-label": "Reservation Date",
  submit: "Confirm",
};
const mockMessages = new Map(Object.entries(json));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => mockMessages.get(key),
}));

jest.mock("@/libs/getCoWorkingSpaces");

const mockSubmit = jest.fn();

describe("ReservationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with correct", async () => {
    // Mocking getCoWorkingSpaces return value
    (getCoWorkingSpaces as jest.Mock).mockResolvedValue([
      { id: 1, name: "Space 1" },
      { id: 2, name: "Space 2" },
    ]);

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ReservationForm onSubmit={mockSubmit} />
      </LocalizationProvider>
    );

    // Ensure loading state is visible
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    // Wait for form elements to appear after loading
    await waitFor(() => {
      // Check if the form elements are rendered
      expect(screen.getByLabelText("Co-Working Space")).toBeInTheDocument();
      expect(screen.getByLabelText("No. of Rooms")).toBeInTheDocument();
      expect(screen.getByLabelText("Reservation Date")).toBeInTheDocument();
    });

    // Verify loading state is gone
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should show red border when submit invalid data", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ReservationForm onSubmit={mockSubmit} />
      </LocalizationProvider>
    );

    // Submit the form without any data
    await waitFor(() => {
      screen.getByRole("button", { name: "Confirm" }).click();
    });

    // Wait for input red border to appear
    await waitFor(() => {
      // TODO: Check if the input fields have red border
    });
  });
});

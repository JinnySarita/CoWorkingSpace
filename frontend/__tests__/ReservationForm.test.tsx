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
  "create-title": "Create Reservation",
  "create-description": "Enter the details of your reservation",
  "edit-title": "Edit Reservation",
  "edit-description": "Edit the details of your reservation",
  "co-working-space-label": "Co-working Space",
  "co-working-space-required-error": "Co-working space is required",
  "no-of-rooms-label": "No. of Rooms",
  "no-of-rooms-required-error": "No. of rooms is required",
  "no-of-rooms-range-error": "No. of rooms must be between 1 and 3",
  "reserved-date-label": "Reservation Date",
  "reserved-date-required-error": "Reservation date is required",
  "reserved-date-range-error": "Reservation date must be later day",
  submit: "Confirm",
  "error-creating-reservation": "Unable to create reservation",
  "error-updating-reservation": "Unable to update reservation",
  delete: "Delete",
  "error-deleting-reservation": "Unable to delete reservation",
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
      expect(screen.getByLabelText("Co-working Space")).toBeInTheDocument();
      expect(screen.getByLabelText("No. of Rooms")).toBeInTheDocument();
      expect(screen.getByLabelText("Reservation Date")).toBeInTheDocument();
    });

    // Verify loading state is gone
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should show error text when submit empty data", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ReservationForm onSubmit={mockSubmit} />
      </LocalizationProvider>
    );

    // Submit the form without any data
    await waitFor(() => {
      screen.getByRole("button", { name: "Confirm" }).click();
    });

    // Wait for input error to appear
    await waitFor(() => {
      expect(
        screen.getByText("Co-working space is required")
      ).toBeInTheDocument();
      expect(screen.getByText("No. of rooms is required")).toBeInTheDocument();
      expect(
        screen.getByText("Reservation date is required")
      ).toBeInTheDocument();
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import SpaceDetailPage from "@/app/(non-auth)/spaces/[sid]/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";

// Mock session and router hooks
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/libs/getCoWorkingSpace", () => jest.fn());

describe("SpaceDetailPage", () => {
  const mockRouter = {
    push: jest.fn(),
    prefetch: jest.fn(),
  };

  const mockSession = {
    data: { user: { role: "admin", token: "mockToken" } },
    status: "authenticated",
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (getCoWorkingSpace as jest.Mock).mockResolvedValue({
      data: {
        name: "Samyan Co-op",
        operatingHours: "00:00 - 20:59",
        address: "12/345 Phaya Thai Phatumwan Bangkok Thailand",
        tel: "012223336",
        picture: "https://example.com/image.jpg",
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithIntl = (ui: React.ReactElement, locale = "en") => {
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={{
          spaces: {
            get: {
              edit: "Edit",
              delete: "Delete",
              "make-reservation": "Make Reservation",
              "confirm-delete-title":
                "Are you sure you want to delete this co-working space?",
              cancel: "Cancel",
            },
          },
        }}
      >
        {ui}
      </NextIntlClientProvider>
    );
  };

  it("should display a loading indicator while fetching data", async () => {
    renderWithIntl(<SpaceDetailPage params={{ sid: "test-id" }} />);

    // Check loading indicator appears
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("should display space details correctly after fetching data", async () => {
    renderWithIntl(<SpaceDetailPage params={{ sid: "test-id" }} />);

    await waitFor(() => {
      expect(screen.getByText(/Samyan Co-op/i)).toBeInTheDocument();
      expect(screen.getByText(/00:00 - 20:59/i)).toBeInTheDocument();
      expect(
        screen.getByText(/12\/345 Phaya Thai Phatumwan Bangkok Thailand/i)
      ).toBeInTheDocument();
    });
  });

  it("should display edit and delete buttons when the user is an admin", async () => {
    renderWithIntl(<SpaceDetailPage params={{ sid: "test-id" }} />);

    await waitFor(() => {
      const editButton = screen.getByRole("button", { name: /edit/i });
      const deleteButton = screen.getByRole("button", { name: /delete/i });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });
});

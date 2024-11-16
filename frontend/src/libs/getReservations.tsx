export default async function getReservations(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    const reservations = data.data.map((data: any) => ({
      id: data._id,
      coWorkingSpaceName: data.coworkingspace.name,
      userName: data.user.name,
      noOfRooms: data.numOfRooms,
      reservedDate: data.bookingDate,
      reservedAt: data.createdAt,
    }));

    return reservations;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

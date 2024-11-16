export default async function postReservation(
  token: string,
  spaceID: string,
  bookingDate: string,
  numOfRooms: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coworkingspaces/${spaceID}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingDate,
          numOfRooms,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error posting data");
  }
}

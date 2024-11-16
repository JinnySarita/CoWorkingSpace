export default async function putReservation(
  token: string,
  bookingID: string,
  coworkingspace: string,
  bookingDate: string,
  numOfRooms: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coworkingspace,
          bookingDate,
          numOfRooms,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error updating data");
  }
}
